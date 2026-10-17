import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { seedBooks, toys } from "../data/catalog";
import { loadBooks } from "../services/books";
import {
  currentUser,
  loginAccount,
  logoutAccount,
  registerAccount,
  updateAccount,
} from "../services/accounts";
import { readStorage, removeStorage, writeStorage } from "../services/storage";
import {
  addItem,
  cartTotal,
  mergeStores,
  normalizeStore,
  storeKey,
  validProduct,
} from "./store";
import { ShopContext } from "./ShopContext";

export default function ShopProvider({ children }) {
  const [user, setUser] = useState(currentUser);
  const [store, setStore] = useState(() =>
    normalizeStore(readStorage(storeKey(currentUser()), null)),
  );
  const [books, setBooks] = useState(seedBooks);
  const [apiStatus, setApiStatus] = useState("loading");
  const [discovered] = useState(() => {
    const saved = readStorage("dolphin.discovered.v1", []);
    return new Map(
      (Array.isArray(saved) ? saved.filter(validProduct) : []).map(
        (product) => [product.id, product],
      ),
    );
  });
  const extraBooks = useRef(discovered);
  const storeRef = useRef(store);
  const userRef = useRef(user);

  useEffect(() => {
    const controller = new AbortController();
    loadBooks(controller.signal)
      .then((result) => {
        setBooks(result.books);
        setApiStatus(result.status);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const sync = (event) => {
      if (event.key === null || event.key?.startsWith("dolphin.")) {
        const nextUser = currentUser();
        const nextStore = normalizeStore(readStorage(storeKey(nextUser), null));
        userRef.current = nextUser;
        storeRef.current = nextStore;
        setUser(nextUser);
        setStore(nextStore);
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const commit = useCallback((update) => {
    const next = update(storeRef.current);
    if (!writeStorage(storeKey(userRef.current), next)) {
      toast.error("Məlumatlar saxlanmadı. Brauzer yaddaşını yoxlayın.");
      return false;
    }
    storeRef.current = next;
    setStore(next);
    return true;
  }, []);

  async function authenticate(values, register = false) {
    const nextUser = await (register
      ? registerAccount(values)
      : loginAccount(values));
    const guest = normalizeStore(readStorage(storeKey(null), null));
    const account = normalizeStore(readStorage(storeKey(nextUser), null));
    const nextStore = mergeStores(account, guest);
    if (writeStorage(storeKey(nextUser), nextStore))
      removeStorage(storeKey(null));
    else toast.error("Səbəti hesaba saxlamaq mümkün olmadı.");
    userRef.current = nextUser;
    storeRef.current = nextStore;
    setUser(nextUser);
    setStore(nextStore);
  }

  function logout() {
    logoutAccount();
    const guest = normalizeStore(readStorage(storeKey(null), null));
    userRef.current = null;
    storeRef.current = guest;
    setUser(null);
    setStore(guest);
  }

  function updateProfile(values) {
    const updated = updateAccount(userRef.current.id, values);
    userRef.current = updated;
    setUser(updated);
  }

  function addToCart(product, quantity = 1) {
    if (
      commit((current) => ({
        ...current,
        cart: addItem(current.cart, product, quantity),
      }))
    )
      toast.success("Səbətə əlavə edildi");
  }

  function toggleFavorite(product) {
    commit((current) => ({
      ...current,
      favorites: current.favorites.some((item) => item.id === product.id)
        ? current.favorites.filter((item) => item.id !== product.id)
        : [...current.favorites, product],
    }));
  }

  function placeOrder(customer) {
    const current = storeRef.current;
    if (!userRef.current || !current.cart.length)
      throw new Error(
        "Sifariş üçün hesabınıza daxil olun və səbətə məhsul əlavə edin.",
      );
    const subtotal = cartTotal(current.cart);
    const order = {
      id: `DL-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      items: current.cart,
      customer,
      total: Math.round((subtotal + (subtotal >= 50 ? 0 : 3.9)) * 100) / 100,
      status: "Demo sifariş",
    };
    if (
      !commit((value) => ({
        ...value,
        orders: [order, ...value.orders],
        cart: [],
      }))
    )
      throw new Error("Sifariş saxlanmadı. Yenidən cəhd edin.");
    return order;
  }

  const rememberBooks = useCallback((products) => {
    products.forEach((product) => extraBooks.current.set(product.id, product));
    const recent = [...extraBooks.current.values()].slice(-96);
    extraBooks.current = new Map(
      recent.map((product) => [product.id, product]),
    );
    writeStorage("dolphin.discovered.v1", recent);
  }, []);
  const findProduct = (id) =>
    [
      ...books,
      ...toys,
      ...store.cart.map((item) => item.product),
      ...store.favorites,
      ...store.orders.flatMap((order) =>
        order.items.map((item) => item.product),
      ),
    ].find((product) => product.id === id) || extraBooks.current.get(id);

  return (
    <ShopContext.Provider
      value={{
        user,
        books,
        toys,
        apiStatus,
        ...store,
        authenticate,
        logout,
        updateProfile,
        addToCart,
        toggleFavorite,
        placeOrder,
        findProduct,
        rememberBooks,
        cartCount: store.cart.reduce((sum, item) => sum + item.quantity, 0),
        updateQuantity: (id, quantity) =>
          commit((current) => ({
            ...current,
            cart: current.cart.map((item) =>
              item.product.id === id
                ? {
                    ...item,
                    quantity: Math.max(1, Math.min(99, Number(quantity) || 1)),
                  }
                : item,
            ),
          })),
        removeFromCart: (id) =>
          commit((current) => ({
            ...current,
            cart: current.cart.filter((item) => item.product.id !== id),
          })),
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

ShopProvider.propTypes = { children: PropTypes.node.isRequired };
