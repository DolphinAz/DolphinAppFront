export const emptyStore = () => ({ cart: [], favorites: [], orders: [] });
export const storeKey = (user) => `dolphin.store.${user?.id || "guest"}.v1`;

export function validProduct(product) {
  return (
    product &&
    typeof product.id === "string" &&
    typeof product.title === "string" &&
    Number.isFinite(product.price) &&
    product.price >= 0 &&
    ["book", "toy"].includes(product.type)
  );
}

export function normalizeStore(value) {
  if (!value || typeof value !== "object") return emptyStore();
  return {
    cart: Array.isArray(value.cart)
      ? value.cart
          .filter(
            (item) =>
              item &&
              validProduct(item.product) &&
              Number.isInteger(item.quantity) &&
              item.quantity > 0,
          )
          .map((item) => ({ ...item, quantity: Math.min(item.quantity, 99) }))
      : [],
    favorites: Array.isArray(value.favorites)
      ? value.favorites.filter(validProduct)
      : [],
    orders: Array.isArray(value.orders)
      ? value.orders.filter(
          (order) =>
            order &&
            typeof order.id === "string" &&
            typeof order.createdAt === "string" &&
            Array.isArray(order.items) &&
            order.items.every(
              (item) =>
                item &&
                validProduct(item.product) &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0,
            ) &&
            Number.isFinite(order.total),
        )
      : [],
  };
}

export function addItem(cart, product, quantity = 1) {
  const current = cart.find((item) => item.product.id === product.id);
  return current
    ? cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
          : item,
      )
    : [...cart, { product, quantity: Math.min(99, quantity) }];
}

export function mergeStores(account, guest) {
  return {
    ...account,
    cart: guest.cart.reduce(
      (cart, item) => addItem(cart, item.product, item.quantity),
      account.cart,
    ),
    favorites: [
      ...new Map(
        [...account.favorites, ...guest.favorites].map((product) => [
          product.id,
          product,
        ]),
      ).values(),
    ],
  };
}

export const cartTotal = (cart) =>
  Math.round(
    cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    ) * 100,
  ) / 100;
export const money = (value) =>
  new Intl.NumberFormat("az-AZ", {
    style: "currency",
    currency: "AZN",
    currencyDisplay: "narrowSymbol",
  }).format(value);
