import { dirname } from "path";
import { fileURLToPath } from "url";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ),
  {
    files: ["**/*.{js,jsx,ts,tsx,mdx,mjs}"],
    plugins: {
      prettier,
    },
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { caughtErrors: "none" }],
      "prefer-const": ["error", { destructuring: "all" }],
      "prettier/prettier": "warn",
    },
  },
];

export default config;
