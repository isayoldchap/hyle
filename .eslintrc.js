module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "mocha": true
    },
    
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "prettier"
    ],
    "rules": {
        "no-use-before-define": ["error", { "functions": true, "classes": true }],
        "prettier/prettier": "error"
    }
};