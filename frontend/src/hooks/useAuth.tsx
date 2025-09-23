import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface AuthUser {
  id?: string;
  email?: string;
  name?: string;
  roles?: string[];
  permissions?: string[];
  [key: string]: unknown;
}

interface LoginPayload {
  token: string;
  user?: AuthUser | null;
}

interface AuthContextValue {
  token: string | null;
  user: AuthUser | null;
  claims: Record<string, unknown> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

const TOKEN_STORAGE_KEY = "qss.auth.token";
const USER_STORAGE_KEY = "qss.auth.user";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch (error) {
    console.warn("Não foi possível acessar o localStorage", error);
    return null;
  }
};

const toStringArray = (value: unknown): string[] | undefined => {
  if (!value) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }

  if (typeof value === "string") {
    return value
      .split(/[\s,]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return undefined;
};

type NodeBuffer = {
  from: (value: string, encoding: string) => { toString: (encoding: string) => string };
};

const decodeBase64 = (value: string) => {
  if (typeof window !== "undefined" && typeof window.atob === "function") {
    return window.atob(value);
  }

  const globalAtob = typeof globalThis !== "undefined" ? (globalThis as { atob?: typeof atob }).atob : undefined;
  if (typeof globalAtob === "function") {
    return globalAtob(value);
  }

  const globalBuffer =
    typeof globalThis !== "undefined" ? (globalThis as { Buffer?: NodeBuffer }).Buffer : undefined;
  if (globalBuffer) {
    return globalBuffer.from(value, "base64").toString("binary");
  }

  throw new Error("Ambiente não suporta decodificação base64.");
};

const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  const parts = token.split(".");
  if (parts.length < 2) {
    return null;
  }

  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const jsonPayload = decodeBase64(padded)
      .split("")
      .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("");

    return JSON.parse(decodeURIComponent(jsonPayload));
  } catch (error) {
    console.warn("Não foi possível decodificar o token JWT", error);
    return null;
  }
};

const claimsToUser = (claims: Record<string, unknown> | null | undefined): AuthUser | null => {
  if (!claims) {
    return null;
  }

  const roles =
    toStringArray((claims as { roles?: unknown; role?: unknown }).roles) ??
    toStringArray((claims as { role?: unknown }).role);

  const permissions =
    toStringArray((claims as { permissions?: unknown; perms?: unknown }).permissions) ??
    toStringArray((claims as { perms?: unknown }).perms) ??
    toStringArray((claims as { scopes?: unknown; scope?: unknown }).scopes) ??
    toStringArray((claims as { scope?: unknown }).scope);

  const user: AuthUser = {
    ...claims,
    id: typeof claims.sub === "string" ? claims.sub : undefined,
    email: typeof claims.email === "string" ? claims.email : undefined,
    name: typeof claims.name === "string" ? claims.name : undefined,
  };

  if (roles?.length) {
    user.roles = roles;
  }

  if (permissions?.length) {
    user.permissions = permissions;
  }

  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [claims, setClaims] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storage = getStorage();
    if (!storage) {
      setIsLoading(false);
      return;
    }

    const storedToken = storage.getItem(TOKEN_STORAGE_KEY);
    const storedUser = storage.getItem(USER_STORAGE_KEY);

    if (storedToken) {
      setToken(storedToken);
      const decodedClaims = decodeJwtPayload(storedToken);
      setClaims(decodedClaims);

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.warn("Não foi possível recuperar o usuário armazenado", error);
          storage.removeItem(USER_STORAGE_KEY);
          setUser(claimsToUser(decodedClaims));
        }
      } else {
        setUser(claimsToUser(decodedClaims));
      }
    }

    setIsLoading(false);
  }, []);

  const login = useCallback(({ token: newToken, user: nextUser }: LoginPayload) => {
    setToken(newToken);
    const decodedClaims = decodeJwtPayload(newToken);
    setClaims(decodedClaims);

    const normalizedUser = nextUser ?? claimsToUser(decodedClaims);
    setUser(normalizedUser ?? null);

    const storage = getStorage();
    if (!storage) {
      return;
    }

    storage.setItem(TOKEN_STORAGE_KEY, newToken);

    if (normalizedUser) {
      storage.setItem(USER_STORAGE_KEY, JSON.stringify(normalizedUser));
    } else {
      storage.removeItem(USER_STORAGE_KEY);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setClaims(null);

    const storage = getStorage();
    if (!storage) {
      return;
    }

    storage.removeItem(TOKEN_STORAGE_KEY);
    storage.removeItem(USER_STORAGE_KEY);
  }, []);

  const hasPermission = useCallback(
    (permission: string) => {
      if (!permission) {
        return true;
      }

      const permissions = Array.isArray(user?.permissions) ? user?.permissions : [];
      return permissions.some((item) => item.toLowerCase() === permission.toLowerCase());
    },
    [user?.permissions],
  );

  const hasRole = useCallback(
    (role: string) => {
      if (!role) {
        return true;
      }

      const roles = Array.isArray(user?.roles) ? user?.roles : [];
      return roles.some((item) => item.toLowerCase() === role.toLowerCase());
    },
    [user?.roles],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      claims,
      isAuthenticated: Boolean(token),
      isLoading,
      login,
      logout,
      hasPermission,
      hasRole,
    }),
    [claims, hasPermission, hasRole, isLoading, login, logout, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de um AuthProvider");
  }

  return context;
};
