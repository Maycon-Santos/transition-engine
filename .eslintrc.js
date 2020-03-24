module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "standard",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/member-delimiter-style": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "comma-dangle": "off"
    },
    "ignorePatterns": ["*.js", "lib/**/*"]
};