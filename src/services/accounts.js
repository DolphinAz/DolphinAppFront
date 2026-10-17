import { readStorage, removeStorage, writeStorage } from "./storage.js";

export const ACCOUNTS_KEY = "dolphin.accounts.v1";
export const SESSION_KEY = "dolphin.session.v1";
const getAccounts = () => {
  const accounts = readStorage(ACCOUNTS_KEY, []);
  return Array.isArray(accounts)
    ? accounts.filter(
        (account) =>
          account &&
          typeof account.id === "string" &&
          typeof account.email === "string" &&
          typeof account.name === "string" &&
          account.name.trim(),
      )
    : [];
};
const publicUser = ({ id, name, email, phone = "", address = "" }) => ({
  id,
  name,
  email,
  phone,
  address,
});
const storageError =
  "Məlumatları saxlamaq mümkün olmadı. Brauzerdə yerli yaddaşı aktiv edin.";

async function hashPassword(password, salt) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: new TextEncoder().encode(salt),
      iterations: 210000,
      hash: "SHA-256",
    },
    key,
    256,
  );
  return Array.from(new Uint8Array(bits), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

function saveSession(account) {
  const user = publicUser(account);
  if (
    !writeStorage(SESSION_KEY, {
      user,
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    })
  )
    throw new Error(storageError);
  return user;
}

export function currentUser() {
  const session = readStorage(SESSION_KEY, null);
  if (
    !session?.user?.id ||
    !Number.isFinite(session.expiresAt) ||
    session.expiresAt <= Date.now()
  ) {
    removeStorage(SESSION_KEY);
    return null;
  }
  const account = getAccounts().find((item) => item.id === session.user.id);
  return account ? publicUser(account) : null;
}

export async function registerAccount({ name, email, password }) {
  name = name.trim();
  email = email.trim().toLowerCase();
  if (name.length < 2) throw new Error("Ad ən azı 2 simvol olmalıdır.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Düzgün e-poçt ünvanı daxil edin.");
  if (password.length < 8) throw new Error("Şifrə ən azı 8 simvol olmalıdır.");
  const accounts = getAccounts();
  if (accounts.some((account) => account.email === email))
    throw new Error(
      "Bu e-poçt artıq qeydiyyatdan keçib. Hesabınıza daxil olun.",
    );
  const salt = crypto.randomUUID();
  const account = {
    id: crypto.randomUUID(),
    name,
    email,
    salt,
    passwordHash: await hashPassword(password, salt),
  };
  // Read again after hashing, so a simultaneous registration cannot overwrite accounts.
  const latest = getAccounts();
  if (latest.some((item) => item.email === email))
    throw new Error("Bu e-poçt artıq qeydiyyatdan keçib.");
  if (!writeStorage(ACCOUNTS_KEY, [...latest, account]))
    throw new Error(storageError);
  return saveSession(account);
}

export async function loginAccount({ email, password }) {
  const account = getAccounts().find(
    (item) => item.email === email.trim().toLowerCase(),
  );
  if (
    !account?.salt ||
    (await hashPassword(password, account.salt)) !== account.passwordHash
  )
    throw new Error("E-poçt və ya şifrə yanlışdır.");
  return saveSession(account);
}

export function logoutAccount() {
  removeStorage(SESSION_KEY);
}

export function updateAccount(id, updates) {
  const accounts = getAccounts();
  const account = accounts.find((item) => item.id === id);
  if (!account) throw new Error("Hesab tapılmadı. Yenidən daxil olun.");
  const name = updates.name?.trim();
  if (!name || name.length < 2)
    throw new Error("Ad ən azı 2 simvol olmalıdır.");
  const next = {
    ...account,
    name,
    phone: updates.phone?.trim() || "",
    address: updates.address?.trim() || "",
  };
  if (
    !writeStorage(
      ACCOUNTS_KEY,
      accounts.map((item) => (item.id === id ? next : item)),
    )
  )
    throw new Error(storageError);
  return saveSession(next);
}

export async function changePassword(id, oldPassword, newPassword) {
  const accounts = getAccounts();
  const account = accounts.find((item) => item.id === id);
  if (
    !account ||
    (await hashPassword(oldPassword, account.salt)) !== account.passwordHash
  )
    throw new Error("Mövcud şifrə yanlışdır.");
  if (newPassword.length < 8)
    throw new Error("Yeni şifrə ən azı 8 simvol olmalıdır.");
  const salt = crypto.randomUUID();
  const next = {
    ...account,
    salt,
    passwordHash: await hashPassword(newPassword, salt),
  };
  if (
    !writeStorage(
      ACCOUNTS_KEY,
      accounts.map((item) => (item.id === id ? next : item)),
    )
  )
    throw new Error(storageError);
}
