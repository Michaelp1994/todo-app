import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const data = useContext(AuthContext);
  if (!data) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return data;
}
