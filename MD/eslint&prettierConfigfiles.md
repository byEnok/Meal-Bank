 <!-- .prettierrc.json -->
 <!-- 31 Oktober -->
 {
  "arrowparens": "always",
  "bracketSpacing": true,
  "endOfLine": "lf",
  "singleAttributePerLine": false,
  "bracketSameLine": false,
  "jsxBracketSameLine": false,
  "jsxSingleQuote": true,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "printWidth": 270,
  "requirePragma": false,
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "embeddedLanguageFormatting": "auto",
  "vueIndentScriptAndStyIe": false,
  "filepath": "@/.prettierrc"
}
 <!-- .prettierrc.json -->








 <!-- prettier.config.mjs -->
 <!-- 30 Oktober -->
export default {
  printWidth: 230,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  proseWrap: 'preserve',
  singleAttributePerLine: false,
  plugins: ['prettier-plugin-tailwindcss'],
}
<!-- prettier.config.mjs -->

<!-- .eslintrc.json -->
{
  "extends": ["next/core-web-vitals", "prettier"],
  "rules": {
    "max-len": ["warn", { "code": 230 }],
    "array-bracket-spacing": ["error", "always"],
    "space-in-parens": ["error", "always"],
    "prefer-template": ["error"],
    "prefer-object-has-own": ["warn"],
    "prefer-destructuring": [
      "warn",
      {
        "array": true,
        "object": true
      }
    ],
    "sort-vars": ["warn"],
    "require-await": ["warn"]
  }
}
<!-- .eslintrc.json -->



<!-- .eslintrc.json with prettier config included and prettier extension DISABLED -->
{
  "extends": ["next/core-web-vitals", "prettier"],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "printWidth": 230,
        "useTabs": false,
        "semi": false,
        "singleQuote": true,
        "trailingComma": "es5",
        "bracketSpacing": true,
        "bracketSameLine": false,
        "arrowParens": "always",
        "endOfLine": "lf",
        "proseWrap": "preserve",
        "singleAttributePerLine": false,
        "plugins": ["prettier-plugin-tailwindcss"]
      }
    ],
    "max-len": ["warn", { "code": 230 }],
    "array-bracket-spacing": ["error", "always"],
    "space-in-parens": ["error", "always"],
    "prefer-template": ["error"],
    "prefer-object-has-own": ["warn"],
    "prefer-destructuring": [
      "warn",
      {
        "array": true,
        "object": true
      }
    ],
    "sort-vars": ["warn"],
    "require-await": ["warn"]
  }
}
<!-- .eslintrc.json with prettier config included  -->