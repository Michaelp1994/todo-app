import { createContext, useContext } from "react";
import { api } from "../utils/api";

const AuthContext = createContext<{ user: any; isLoading: boolean }>({
  user: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = api.auth.validate.useQuery();

  return (
    <AuthContext.Provider value={{ user: data, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const data = useContext(AuthContext);
  if (!data) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return data;
}
