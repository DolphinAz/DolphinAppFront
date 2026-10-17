import { beforeEach, afterEach, test } from "node:test";
import assert from "node:assert/strict";
import {
  ACCOUNTS_KEY,
  SESSION_KEY,
  currentUser,
  registerAccount,
  loginAccount,
  logoutAccount,
  updateAccount,
  changePassword,
} from "../src/services/accounts.js";
import { BOOKS_PAGE_SIZE, loadBookPage, loadBooks, loadWork } from "../src/services/books.js";
import { readStorage, writeStorage } from "../src/services/storage.js";
import {
  addItem,
  cartTotal,
  emptyStore,
  mergeStores,
  normalizeStore,
  storeKey,
} from "../src/state/store.js";
import { seedBooks } from "../src/data/catalog.js";

const originalFetch = globalThis.fetch;
beforeEach(() => {
  const memory = new Map();
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key) => memory.get(key) ?? null,
      setItem: (key, value) => memory.set(key, String(value)),
      removeItem: (key) => memory.delete(key),
    },
  });
});
afterEach(() => {
  globalThis.fetch = originalFetch;
});
const values = {
  name: "Test Reader",
  email: "reader@example.test",
  password: "ExamplePass123!",
};

test("registration persists a salted password hash and restores only public profile data", async () => {
  const user = await registerAccount(values);
  assert.equal(currentUser().id, user.id);
  assert.equal(user.email, values.email);
  assert.equal(user.passwordHash, undefined);
  assert.ok(!localStorage.getItem(ACCOUNTS_KEY).includes(values.password));
  const account = readStorage(ACCOUNTS_KEY, [])[0];
  assert.equal(account.passwordHash.length, 64);
  assert.ok(account.salt);
  assert.ok(!localStorage.getItem(SESSION_KEY).includes(account.passwordHash));
});

test("login validates passwords, normalizes email, rejects duplicates and supports logout", async () => {
  await registerAccount(values);
  logoutAccount();
  assert.equal(currentUser(), null);
  await assert.rejects(
    loginAccount({ email: values.email, password: "incorrect" }),
    /yanlışdır/,
  );
  const user = await loginAccount({
    email: " READER@EXAMPLE.TEST ",
    password: values.password,
  });
  assert.equal(currentUser().id, user.id);
  await assert.rejects(
    registerAccount({ ...values, email: "READER@example.test" }),
    /artıq/,
  );
  assert.equal(readStorage(ACCOUNTS_KEY, []).length, 1);
});

test("expired sessions cannot restore a user", async () => {
  await registerAccount(values);
  const session = readStorage(SESSION_KEY, null);
  writeStorage(SESSION_KEY, { ...session, expiresAt: Date.now() - 1 });
  assert.equal(currentUser(), null);
  assert.equal(localStorage.getItem(SESSION_KEY), null);
});

test("profile and password changes survive a fresh login", async () => {
  const user = await registerAccount(values);
  updateAccount(user.id, {
    name: "Updated Reader",
    phone: "12345",
    address: "Test address",
  });
  assert.equal(currentUser().name, "Updated Reader");
  await assert.rejects(
    changePassword(user.id, "wrong", "AnotherPass123!"),
    /yanlışdır/,
  );
  await changePassword(user.id, values.password, "AnotherPass123!");
  logoutAccount();
  await assert.rejects(loginAccount(values), /yanlışdır/);
  const updated = await loginAccount({
    email: values.email,
    password: "AnotherPass123!",
  });
  assert.equal(updated.address, "Test address");
});

test("malformed storage is recoverable and write failure is reported", async () => {
  localStorage.setItem(SESSION_KEY, "{invalid");
  localStorage.setItem(ACCOUNTS_KEY, "null");
  assert.equal(currentUser(), null);
  assert.deepEqual(readStorage("missing", []), []);
  localStorage.setItem(
    ACCOUNTS_KEY,
    JSON.stringify([{ id: "x", email: "x@y.z" }]),
  );
  assert.equal(currentUser(), null);
  localStorage.setItem = () => {
    throw new Error("Quota exceeded");
  };
  assert.equal(writeStorage("test", {}), false);
  await assert.rejects(registerAccount(values), /saxlamaq/);
});

test("guest basket merges by product and favorites deduplicate without mixing account orders", () => {
  const product = seedBooks[0];
  const account = {
    ...emptyStore(),
    cart: [{ product, quantity: 2 }],
    favorites: [product],
    orders: [{ id: "existing" }],
  };
  const guest = {
    ...emptyStore(),
    cart: [{ product, quantity: 3 }],
    favorites: [product],
  };
  const merged = mergeStores(account, guest);
  assert.equal(merged.cart[0].quantity, 5);
  assert.equal(merged.favorites.length, 1);
  assert.deepEqual(merged.orders, account.orders);
  assert.notEqual(storeKey({ id: "one" }), storeKey({ id: "two" }));
  assert.notEqual(storeKey(null), storeKey({ id: "one" }));
  assert.equal(addItem(merged.cart, product, 100)[0].quantity, 99);
});

test("basket totals round correctly and corrupted entries cannot crash restoration", () => {
  const cart = [{ product: { ...seedBooks[0], price: 0.1 }, quantity: 3 }];
  assert.equal(cartTotal(cart), 0.3);
  const restored = normalizeStore({
    cart: [
      null,
      {},
      { product: seedBooks[0], quantity: 100 },
      { product: seedBooks[1], quantity: -2 },
    ],
    favorites: [null, seedBooks[0]],
    orders: [{ id: "bad", total: 3, items: [null] }],
  });
  assert.equal(restored.cart.length, 1);
  assert.equal(restored.cart[0].quantity, 99);
  assert.equal(restored.favorites.length, 1);
  assert.equal(restored.orders.length, 0);
});

test("book catalog uses one batch API request, retains store prices and caches live metadata", async () => {
  let count = 0;
  globalThis.fetch = async (url) => {
    count++;
    assert.ok(url.startsWith("https://openlibrary.org/api/books?"));
    return {
      ok: true,
      json: async () => ({
        [`ISBN:${seedBooks[0].isbn}`]: {
          title: "Live title",
          authors: [{ name: "Live author" }],
          number_of_pages: 300,
        },
      }),
    };
  };
  const live = await loadBooks();
  assert.equal(live.status, "live");
  assert.equal(live.books[0].title, "Live title");
  assert.equal(live.books[0].price, seedBooks[0].price);
  const cached = await loadBooks();
  assert.equal(cached.status, "cached");
  assert.equal(count, 1);
});

test("API failure keeps a populated offline catalog and aborted calls do not replace state", async () => {
  globalThis.fetch = async () => {
    throw new Error("Offline");
  };
  const fallback = await loadBooks();
  assert.equal(fallback.status, "offline");
  assert.equal(fallback.books.length, seedBooks.length);
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(loadBooks(controller.signal), /Offline/);
});

test("API search validates records and direct product links keep the same price", async () => {
  globalThis.fetch = async (url) => ({
    ok: true,
    json: async () =>
      url.includes("/search.json")
        ? {
            docs: [
              {
                key: "/works/OL123W",
                title: "API book",
                author_name: ["Author"],
                cover_i: 100,
              },
              { key: "/invalid", title: "Invalid" },
            ],
          }
        : {
            title: "API book",
            description: { value: "A description" },
            covers: [100],
          },
  });
  const { products: books } = await loadBookPage({ query: "API book" });
  assert.equal(books.length, 1);
  assert.equal(books[0].author, "Author");
  const detail = await loadWork(books[0].id);
  assert.equal(detail.price, books[0].price);
  assert.equal(detail.description, "A description");
  assert.equal(await loadWork("invalid"), null);
});

test("full catalog requests one page at a time and caches pages independently", async () => {
  const requests = [];
  globalThis.fetch = async (url) => {
    const params = new URL(url).searchParams;
    requests.push(params);
    const page = Number(params.get("page"));
    return { ok: true, json: async () => ({
      numFound: 1000,
      docs: [{ key: `/works/OL${page}W`, title: `Page ${page}` }],
    }) };
  };
  const first = await loadBookPage();
  const second = await loadBookPage({ page: 2 });
  assert.equal(first.total, 1000);
  assert.equal(first.pageSize, BOOKS_PAGE_SIZE);
  assert.equal(second.page, 2);
  assert.notEqual(first.products[0].id, second.products[0].id);
  assert.equal(requests[0].get("q"), "*:*");
  assert.equal(requests[0].get("limit"), "24");
  assert.equal(requests[0].get("sort"), "editions");
  const cached = await loadBookPage({ page: 2 });
  assert.equal(cached.status, "cached");
  assert.equal(requests.length, 2);
});

test("search, subject filters and sorting apply to API pagination without a language restriction", async () => {
  let params;
  globalThis.fetch = async (url) => {
    params = new URL(url).searchParams;
    return { ok: true, json: async () => ({
      num_found: 73,
      docs: [
        { key: "OL123W", title: "Fantasy book" },
        { key: "/works/OL123W", title: "Duplicate work" },
        { key: "/invalid", title: "Invalid" },
        null,
      ],
    }) };
  };
  const result = await loadBookPage({ query: "Dune", category: "Fantastika", sort: "title", page: 3 });
  assert.equal(params.get("q"), '(Dune) AND subject:"fantasy"');
  assert.equal(params.get("page"), "3");
  assert.equal(params.get("sort"), "title");
  assert.ok(!params.get("q").includes("language:"));
  assert.equal(result.total, 73);
  assert.equal(result.products.length, 1);
  assert.equal(result.products[0].category, "Fantastika");
  assert.equal(result.products[0].id, "OL123W");
});

test("catalog normalizes Azerbaijani searches and invalid page numbers", async () => {
  let params;
  globalThis.fetch = async (url) => {
    params = new URL(url).searchParams;
    return { ok: true, json: async () => ({ numFound: 0, docs: [] }) };
  };
  const result = await loadBookPage({ query: "\u00c4li", page: -4 });
  assert.equal(params.get("q"), "(Əli)");
  assert.equal(result.page, 1);
  await loadBookPage({ query: "It", sort: "new", page: 1.5 });
  assert.equal(params.get("q"), "(It)");
  assert.equal(params.get("sort"), "new");
  assert.equal(params.get("page"), "1");
});

test("catalog retries failures, expires old pages and respects cancellation even with a cache hit", async () => {
  let requests = 0;
  globalThis.fetch = async () => {
    requests++;
    if (requests === 1) throw new Error("Offline");
    return { ok: true, json: async () => ({ numFound: 1, docs: [{ key: "OL1W", title: "Saved book" }] }) };
  };
  await assert.rejects(loadBookPage(), /Offline/);
  await loadBookPage();
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(loadBookPage({}, controller.signal), { name: "AbortError" });
  assert.equal(requests, 2);
  const cache = readStorage("dolphin.book-pages.v1", []);
  cache[0].updatedAt = 0;
  writeStorage("dolphin.book-pages.v1", cache);
  await loadBookPage();
  assert.equal(requests, 3);
});
