//https://babeljs.io/docs/en/next/babel-plugin-transform-runtime

// Regenerator ?
// fast-async ? or babel ?
// plugin-transform-async-to-generator
// plugin-transform-regenerator
//  ['babel-plugin-transform-runtime', { helpers: false, polyfill: false, regenerator: true }],
//  ['babel-plugin-transform-regenerator', { async: false }],
module.exports = (api, options, dirname) => {
    api.assertVersion(7);

    const mode = options.mode;
    if (!["development", "production", "test"].includes(mode)) {
        throw new Error("@thc/preset-react 'mode' option must be either 'development', 'production' or 'test'.");
    }
    const development = mode === "development";
    const test = mode === "test";
    const production = mode === "production";
    const hot = !!options.hot;

    return {
        presets: [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: "entry",
                    corejs: 3,
                    bugfixes: true,
                    modules: test ? "commonjs" : false
                }
            ],
            [
                "@babel/preset-react",
                {
                    useBuiltIns: true,
                    development: development || test
                }
            ] /*,
            !development && ["babel-preset-minify", {
                removeConsole: true,
                removeDebugger: true
            }]*/
        ].filter(Boolean),
        plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }], //https://babeljs.io/docs/en/next/babel-plugin-proposal-decorators
            ["@babel/plugin-proposal-class-properties", { loose: true }],
            ["@babel/plugin-proposal-function-bind"],
            ["@babel/plugin-proposal-object-rest-spread", { useBuiltIns: true }],
            ["@babel/plugin-proposal-optional-chaining"],
            ["@babel/plugin-proposal-nullish-coalescing-operator"],
            !test && [
                "@babel/plugin-transform-runtime",
                //https://babeljs.io/docs/en/next/babel-plugin-transform-runtime
                {
                    corejs: 3,
                    helpers: true,
                    regenerator: false,
                    useESModules: true
                }
            ],
            ["@babel/plugin-syntax-dynamic-import"],
            ["babel-plugin-lodash"],
            development && hot && ["react-hot-loader/babel"],
            production && ["@babel/plugin-transform-react-inline-elements"],
            production && ["@babel/plugin-transform-react-constant-elements"],
            production && [
                "babel-plugin-transform-react-remove-prop-types",
                {
                    mode: "remove"
                    //https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types#ignorefilenames
                    // Safe ?"ignoreFilenames": ["node_modules"]
                }
            ]
        ].filter(Boolean)
    };
};
