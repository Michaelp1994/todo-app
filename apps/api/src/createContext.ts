import { db } from "./db";

export default function createContext() {
  return {
    db,
  };
}

export type Context = ReturnType<typeof createContext>;
