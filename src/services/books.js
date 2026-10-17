import { seedBooks } from "../data/catalog.js";
import { readStorage, writeStorage } from "./storage.js";

export const BOOKS_API = "https://openlibrary.org";
const CACHE_KEY = "dolphin.books.v1";
const CACHE_TTL = 24 * 60 * 60 * 1000;
const searchPrice = (id) =>
  12.9 +
  ([...id.split("/").pop()].reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    15);

async function request(path, signal) {
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener("abort", abort, { once: true });
  if (signal?.aborted) controller.abort();
  const timeout = setTimeout(abort, 8000);
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

export async function searchBooks(query, signal) {
  const params = new URLSearchParams({
    q: query,
    limit: "24",
    fields: "key,title,author_name,cover_i,first_publish_year,isbn",
    lang: "en",
  });
  const data = await request(`/search.json?${params}`, signal);
  if (!Array.isArray(data.docs)) throw new Error("Invalid search response");
  return data.docs
    .filter((book) => /^\/works\/OL\d+W$/.test(book.key) && book.title)
    .map((book) => {
      const code = [...book.key].reduce(
        (total, char) => total + char.charCodeAt(0),
        0,
      );
      return {
        id: book.key.split("/").pop(),
        workKey: book.key,
        type: "book",
        title: book.title,
        author: book.author_name?.join(", ") || "Müəllif göstərilməyib",
        category: "Bədii ədəbiyyat",
        image: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg?default=false`
          : null,
        isbn: book.isbn?.[0],
        year: book.first_publish_year,
        price: searchPrice(book.key),
        originalPrice: null,
        bestseller: false,
        color: ["#446c76", "#8f6857", "#62724f"][code % 3],
        language: "Nəşrdən asılıdır",
        source: "Open Library",
        description:
          "Open Library kataloqundan əlavə edilmiş kitab. Nəşr və müəllif məlumatlarını aşağıda görə bilərsiniz.",
      };
    });
}

export async function loadWork(id, signal) {
  if (!/^OL\d+W$/.test(id)) return null;
  const work = await request(`/works/${id}.json`, signal);
  if (!work.title) return null;
  return {
    id,
    workKey: `/works/${id}`,
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
