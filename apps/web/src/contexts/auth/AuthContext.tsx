import { createContext } from "react";
import type { RouterOutput } from "@todo/api";

type AuthContextType = {
  user: RouterOutput["auth"]["validate"];
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
});
