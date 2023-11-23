import { build } from "eslint-config-teppeis";

export default await build(
  { base: "node18" },
  {
    ignores: [
      ".closure-gun-cache",
      "legacy",
      "alter-tests",
      "compat-table",
      "es6",
      "es2016plus",
      "esnext",
    ],
  },
  {
    rules: {
      "n/shebang": "off",
    },
  },
);
