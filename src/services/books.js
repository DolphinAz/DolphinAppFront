import { seedBooks } from "../data/catalog.js";
import { readStorage, writeStorage } from "./storage.js";

const BOOKS_API = "https://openlibrary.org";
export const BOOKS_PAGE_SIZE = 24;
const CACHE_KEY = "dolphin.books.v1";
const CACHE_TTL = 24 * 60 * 60 * 1000;
const PAGE_CACHE_KEY = "dolphin.book-pages.v1";
const categorySubjects = {
  "Bədii ədəbiyyat": "fiction",
  "Klassiklər": "classics",
  "Şəxsi inkişaf": "self-help",
  "Uşaq kitabları": "juvenile fiction",
  "Fantastika": "fantasy",
  "Macəra": "adventure",
};
const searchPrice = (id) =>
  12.9 +
  ([...id.split("/").pop()].reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    15);

async function request(path, signal, timeoutMs = 8000) {
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener("abort", abort, { once: true });
  if (signal?.aborted) controller.abort();
  const timeout = setTimeout(abort, timeoutMs);
  try {
    const response = await fetch(`${BOOKS_API}${path}`, {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Book API: ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", abort);
  }
}

export async function loadBooks(signal) {
  const cache = readStorage(CACHE_KEY, null);
  if (
    cache?.updatedAt > Date.now() - CACHE_TTL &&
    Array.isArray(cache.books) &&
    cache.books.length === seedBooks.length &&
    cache.books.every((book) => seedBooks.some((seed) => seed.id === book.id))
  ) {
    return { books: cache.books, status: "cached" };
  }
  try {
    const keys = seedBooks.map((book) => `ISBN:${book.isbn}`).join(",");
    const data = await request(
      `/api/books?bibkeys=${encodeURIComponent(keys)}&format=json&jscmd=data`,
      signal,
    );
    if (!data || !seedBooks.some((book) => data[`ISBN:${book.isbn}`]?.title))
      throw new Error("No book metadata");
    const books = seedBooks.map((book) => {
      const remote = data[`ISBN:${book.isbn}`];
      return remote?.title
        ? {
            ...book,
            title: remote.title,
            author:
              remote.authors?.map((author) => author.name).join(", ") ||
              book.author,
            pages: remote.number_of_pages,
            publisher: remote.publishers?.[0]?.name,
            source: "Open Library",
          }
        : book;
    });
    writeStorage(CACHE_KEY, { books, updatedAt: Date.now() });
    return { books, status: "live" };
  } catch (error) {
    if (signal?.aborted) throw error;
    return { books: seedBooks, status: "offline" };
  }
}

function searchProduct(book, category) {
  const id = book.key.split("/").pop();
  const code = [...id].reduce((total, char) => total + char.charCodeAt(0), 0);
  const subjects = (Array.isArray(book.subject) ? book.subject : [])
    .join(" ").toLowerCase();
  const inferredCategory = Object.entries(categorySubjects)
    .filter(([name]) => name !== "Bədii ədəbiyyat")
    .find(([, subject]) => subjects.includes(subject))?.[0]
    || (subjects.includes("fiction") ? "Bədii ədəbiyyat" : "Digər kitablar");
  return {
    id,
    type: "book",
    title: book.title,
    author: Array.isArray(book.author_name) && book.author_name.length
      ? book.author_name.join(", ") : "Müəllif göstərilməyib",
    category: categorySubjects[category] ? category : inferredCategory,
    image:
      book.cover_i > 0
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg?default=false`
        : null,
    year: book.first_publish_year,
    price: searchPrice(id),
    originalPrice: null,
    bestseller: false,
    color: ["#446c76", "#8f6857", "#62724f"][code % 3],
    language: "Nəşrdən asılıdır",
    source: "Open Library",
    description:
      "Open Library kataloqundan əlavə edilmiş kitab. Nəşr və müəllif məlumatlarını aşağıda görə bilərsiniz.",
  };
}

export async function loadBookPage(
  { query = "", category = "Hamısı", sort = "featured", page = 1 } = {},
  signal,
) {
  const currentPage =
    Number.isSafeInteger(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const term = query.trim().replace(/\u00e4/g, "ə").replace(/\u00c4/g, "Ə");
  const subject = categorySubjects[category];
  const searchQuery = subject
    ? `${term ? `(${term}) AND ` : ""}subject:"${subject}"`
    : term ? `(${term})` : "*:*";
  const params = new URLSearchParams({
    q: searchQuery,
    page: String(currentPage),
    limit: String(BOOKS_PAGE_SIZE),
    fields: "key,title,author_name,cover_i,first_publish_year,subject",
    lang: "az",
  });
  if (["title", "new", "old"].includes(sort)) params.set("sort", sort);
  else if (!term) params.set("sort", "editions");
  const cacheId = params.toString();
  const saved = readStorage(PAGE_CACHE_KEY, []);
  const cache = Array.isArray(saved) ? saved : [];
  const cached = cache.find(
    (entry) => entry?.key === cacheId
      && entry.updatedAt > Date.now() - CACHE_TTL
      && Array.isArray(entry.result?.products)
      && Number.isFinite(entry.result?.total),
  );
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
  if (cached) return { ...cached.result, status: "cached" };
  const data = await request(`/search.json?${params}`, signal, 20000);
  if (!Array.isArray(data?.docs)) throw new Error("Invalid search response");
  const products = [...new Map(
    data.docs
      .filter((book) => book
        && /^(\/works\/)?OL\d+W$/.test(book.key)
        && typeof book.title === "string" && book.title.trim())
      .map((book) => {
        const product = searchProduct(book, category);
        return [product.id, product];
      }),
  ).values()];
  const count = Number(data.numFound ?? data.num_found);
  const total = Number.isFinite(count) && count >= 0 ? count : products.length;
  const result = { products, total, page: currentPage, pageSize: BOOKS_PAGE_SIZE };
  writeStorage(PAGE_CACHE_KEY, [
    ...cache.filter((entry) => entry?.key !== cacheId && entry?.updatedAt > Date.now() - CACHE_TTL),
    { key: cacheId, result, updatedAt: Date.now() },
  ].slice(-12));
  return { ...result, status: "live" };
}

export async function loadWork(id, signal) {
  if (!/^OL\d+W$/.test(id)) return null;
  const work = await request(`/works/${id}.json`, signal);
  if (!work.title) return null;
  return {
    id,
    type: "book",
    title: work.title,
    author: "Müəllif göstərilməyib",
    category: "Bədii ədəbiyyat",
    price: searchPrice(id),
    originalPrice: null,
    image:
      work.covers?.[0] > 0
        ? `https://covers.openlibrary.org/b/id/${work.covers[0]}-L.jpg?default=false`
        : null,
    color: "#446c76",
    source: "Open Library",
    language: "Nəşrdən asılıdır",
    description:
      typeof work.description === "string"
        ? work.description
        : work.description?.value ||
          "Kitab haqqında əlavə məlumat Open Library kataloqunda mövcuddur.",
  };
}
