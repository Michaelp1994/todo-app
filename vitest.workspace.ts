import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    root: "apps/web",
    test: {
      environment: "jsdom",
      globals: true,
    },
  },
  {
    root: "apps/api",
  },
]);
