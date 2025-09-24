import { persistAuthState, TOKEN_STORAGE_KEY, USER_STORAGE_KEY, type AuthUser } from "../src/hooks/useAuth.tsx";

interface StorageLike {
  length: number;
  clear(): void;
  getItem(key: string): string | null;
  key(index: number): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
}

class MemoryStorage implements StorageLike {
  private store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
}

const storage = new MemoryStorage();

const user: AuthUser = {
  id: "admin-1",
  email: "admin@example.com",
  name: "Admin User",
  permissions: ["admin:access"],
};

persistAuthState(storage as unknown as Storage, "test-token", user);

const storedToken = storage.getItem(TOKEN_STORAGE_KEY);
if (storedToken !== "test-token") {
  throw new Error(`Token not persisted correctly: ${storedToken ?? "<missing>"}`);
}

const storedUserRaw = storage.getItem(USER_STORAGE_KEY);
if (!storedUserRaw) {
  throw new Error("User payload was not persisted");
}

const storedUser = JSON.parse(storedUserRaw) as AuthUser;
if (!Array.isArray(storedUser.permissions) || !storedUser.permissions.includes("admin:access")) {
  throw new Error(`Stored user is missing required permissions: ${storedUserRaw}`);
}

const hasAdminAccess = (permission: string) =>
  Array.isArray(storedUser.permissions) &&
  storedUser.permissions.some((value) => value.toLowerCase() === permission.toLowerCase());

if (!hasAdminAccess("admin:access")) {
  throw new Error("Permission gate would block admin access after login");
}

console.log("Stored token:", storedToken);
console.log("Stored user payload:", storedUser);
console.log("Admin permission granted:", hasAdminAccess("admin:access"));
