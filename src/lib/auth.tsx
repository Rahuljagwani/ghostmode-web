"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { apiFetch, ApiError } from "./api";

interface User {
  id: string;
  email: string;
  name: string;
  remaining_credits: number;
  total_credits: number;
  is_byok_enabled: boolean;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  googleLogin: (idToken: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const saveToken = (t: string) => {
    localStorage.setItem("ghostmode_token", t);
    setToken(t);
  };

  const clearToken = () => {
    localStorage.removeItem("ghostmode_token");
    setToken(null);
    setUser(null);
  };

  const fetchProfile = useCallback(async (t: string) => {
    try {
      const user = await apiFetch<User>("/auth/me", { token: t });
      setUser(user);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        clearToken();
      }
    }
  }, []);

  // Load token on mount
  useEffect(() => {
    const stored = localStorage.getItem("ghostmode_token");
    if (stored) {
      setToken(stored);
      fetchProfile(stored).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [fetchProfile]);

  const login = async (email: string, password: string) => {
    const data = await apiFetch<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    saveToken(data.token);
    setUser(data.user);
  };

  const register = async (email: string, password: string, name: string) => {
    const data = await apiFetch<{ token: string; user: User }>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
      }
    );
    saveToken(data.token);
    setUser(data.user);
  };

  const googleLogin = async (idToken: string) => {
    const data = await apiFetch<{ token: string; user: User }>(
      "/auth/google",
      {
        method: "POST",
        body: JSON.stringify({ token: idToken }),
      }
    );
    saveToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    // Fire-and-forget server logout
    if (token) {
      apiFetch("/auth/logout", { method: "POST", token }).catch(() => {});
    }
    clearToken();
  };

  const refreshProfile = async () => {
    if (token) await fetchProfile(token);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        googleLogin,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
