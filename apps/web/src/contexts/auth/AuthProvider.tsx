import { api } from "../../utils/api";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user] = api.auth.validate.useSuspenseQuery();

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
