module.exports = {
    parser:"@typescript-eslint/parser",
    extends:[
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint",
        "plugin:@prettier-recommended",
    ],
    parseOptions: {
        ecmaVersion:2018,
        sourceType:"module"
    },
    rules:{},
}