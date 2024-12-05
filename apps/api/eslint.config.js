import js from "@eslint/js";
import globals from "globals";

import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.ts"],
  ignores: ["**/sst-env.d.ts"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.node,
  },
});
