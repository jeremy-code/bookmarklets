import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["bookmarklets/"] },
  /**
   * Add `name` property to "recommended" ESLint config, which doesn't exist for compatibility
   *
   * @see {@link https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js#L11}
   */
  { name: "@eslint/js/recommended", ...eslint.configs.recommended },
  tseslint["configs"].recommendedTypeChecked,
  {
    linterOptions: {
      reportUnusedInlineConfigs: "error",
    },
    languageOptions: {
      parserOptions: {
        /**
         * Automatically load `tsconfig.json` files for typed linting rules
         *
         * @see {@link https://typescript-eslint.io/packages/parser/#projectservice}
         */
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.node, ...globals.browser },
    },
    rules: {
      // This rule doesn't really make sense since all files are wrapped in a
      // (synchronous) IIFE
      "@typescript-eslint/no-floating-promises": "off",
    },
  },
  {
    files: ["**/*.{js,cjs,jsx,mjs}"],
    ...tseslint["configs"].disableTypeChecked,
  },
);
