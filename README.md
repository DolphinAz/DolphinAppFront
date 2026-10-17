# Dolphin bookstore

A responsive Azerbaijani React storefront for books and toys.

```sh
npm install
npm run dev
npm run build
npm run lint
npm test
```

## Styling

The app uses Tailwind CSS 3.4.17 with utility classes in React components. `src/assets/tailwind.css` contains only Tailwind's three layer directives. Shared fonts, colors, base styles, animation, and responsive breakpoints are configured in `tailwind.config.js`; the previous custom stylesheet has been removed. Restart Vite after changing the PostCSS configuration.

## Catalog

The previous backend connection and all admin pages have been removed. Books use the public, keyless [Open Library Books API](https://openlibrary.org/dev/docs/api/books) for metadata, the [Search API](https://openlibrary.org/dev/docs/api/search) for catalog browsing and live searches, and Open Library cover images. `/books` browses the full API catalog in pages of 24, including searches, subject filters, title sorting, and publication-year sorting. Query, category, sort, and page are stored in the URL; changing a filter returns to page one. Only the requested page is fetched. The latest 12 API pages and selected-book metadata are cached for 24 hours; the latest 240 discovered books are retained so details survive a refresh and remain available in the offline catalog. A curated 16-book collection supplies the home page and offline fallback. API requests are cancellable, with a 20-second timeout for catalog pages and eight seconds for metadata.

The hero uses three fixed, bundled original covers (The Great Gatsby, Atomic Habits, and Ikigai). These decorative images do not depend on API results and have no links or hover interactions.

Toys are an eight-product local catalog with bundled SVG illustrations. Prices, discounts, availability, and bestseller selections are demonstration store data, rather than values provided by Open Library.

Routes: `/books`, `/toys`, `/best-seller`, `/discounts`, `/favorites`, `/detail/:id`, `/cart`, `/login`, `/register`, `/profile`, `/orders`, `/payment`, `/about`, and `/contact`. Bestseller and discounted route aliases also work. Removed admin routes return the regular 404 page.

## Browser accounts and persistence

Registration and login work locally without an authentication backend. Passwords are salted and hashed with PBKDF2-SHA-256 (210,000 iterations); plaintext passwords are never saved. A public profile and a 30-day session are stored in `localStorage`. Cart, favorites, and demo orders are isolated per account. Guest cart items and favorites merge into an account after login. Logout preserves that account's saved data and clears the active session. Profile and password changes persist, and storage changes synchronize across tabs.

All keys use a `dolphin.*.v1` namespace. Storage failures show an error instead of claiming success. These browser accounts are a local demonstration, not server-enforced authentication: local data can be edited or deleted by the device owner, is not shared across devices, and disappears when site storage is cleared. Web Crypto requires HTTPS or localhost.

Checkout saves a demo order locally and performs no payment, external order submission, or delivery. The contact form saves a local draft and does not send a message. Email verification and email password recovery are unavailable without a backend; the password help page explains this, and signed-in users can change their password with their current password.

## Validation

`npm test` exercises password hashing, account validation, session expiration, profile/password persistence, storage failures, cart merging and totals, invalid saved data, API caching, offline fallback, and search/detail consistency. The production build and ESLint checks are separate commands above.
