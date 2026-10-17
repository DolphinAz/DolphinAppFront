# Dolphin bookstore

A responsive Azerbaijani React storefront for books and toys.

```sh
npm install
npm run dev
npm run build
npm run lint
npm test
```

## Catalog

The previous backend connection and all admin pages have been removed. Books use the public, keyless [Open Library Books API](https://openlibrary.org/dev/docs/api/books) for metadata, the [Search API](https://openlibrary.org/dev/docs/api/search) for live searches, and Open Library cover images. A curated 16-book catalog is available immediately and remains available when the API fails. Successful metadata responses are cached for 24 hours; discovered search results are retained so product details survive a refresh. API requests are cancellable and have an eight-second timeout.

Toys are an eight-product local catalog with bundled SVG illustrations. Prices, discounts, availability, and bestseller selections are demonstration store data, rather than values provided by Open Library.

Routes: `/books`, `/toys`, `/best-seller`, `/discounts`, `/favorites`, `/detail/:id`, `/cart`, `/login`, `/register`, `/profile`, `/orders`, `/payment`, `/about`, and `/contact`. Bestseller and discounted route aliases also work. Removed admin routes return the regular 404 page.

## Browser accounts and persistence

Registration and login work locally without an authentication backend. Passwords are salted and hashed with PBKDF2-SHA-256 (210,000 iterations); plaintext passwords are never saved. A public profile and a 30-day session are stored in `localStorage`. Cart, favorites, and demo orders are isolated per account. Guest cart items and favorites merge into an account after login. Logout preserves that account's saved data and clears the active session. Profile and password changes persist, and storage changes synchronize across tabs.

All keys use a `dolphin.*.v1` namespace. Storage failures show an error instead of claiming success. These browser accounts are a local demonstration, not server-enforced authentication: local data can be edited or deleted by the device owner, is not shared across devices, and disappears when site storage is cleared. Web Crypto requires HTTPS or localhost.

Checkout saves a demo order locally and performs no payment, external order submission, or delivery. The contact form saves a local draft and does not send a message. Email verification and email password recovery are unavailable without a backend; the password help page explains this, and signed-in users can change their password with their current password.

## Validation

`npm test` exercises password hashing, account validation, session expiration, profile/password persistence, storage failures, cart merging and totals, invalid saved data, API caching, offline fallback, and search/detail consistency. The production build and ESLint checks are separate commands above.
