import { createContext } from "react";
import type { RouterOutput } from "@todo/api";

type AuthContextType = {
  user: RouterOutput["auth"]["validate"];
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});
