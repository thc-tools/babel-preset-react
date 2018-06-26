//https://babeljs.io/docs/en/next/babel-plugin-transform-runtime

// Regenerator ?
// fast-async ? or babel ?
// plugin-transform-async-to-generator
// plugin-transform-regenerator
//  ['babel-plugin-transform-runtime', { helpers: false, polyfill: false, regenerator: true }],
//  ['babel-plugin-transform-regenerator', { async: false }],
module.exports = (api, options, dirname) => {
    const development = !!options.development;
    const hot = !!options.hot;
    return {
        presets: [
            ["@babel/preset-env", {
                useBuiltIns: 'entry',
                modules: false
            }],
            ["@babel/preset-react", {
                useBuiltIns: true, development: env === 'development'
            }],
            !development && ["babel-preset-minify", {
                removeConsole: true,
                removeDebugger: true
            }]
        ].filter(Boolean),
        plugins: [
            ["@babel/plugin-proposal-decorators", { "legacy": true }], //https://babeljs.io/docs/en/next/babel-plugin-proposal-decorators
            ["@babel/plugin-proposal-class-properties", { "loose": true }],
            ["@babel/plugin-proposal-function-bind"],
            ["@babel/plugin-proposal-object-rest-spread", { useBuiltIns: true }],
            ["@babel/plugin-proposal-optional-chaining"],
            ["@babel/plugin-proposal-nullish-coalescing-operator"],
            ['@babel/plugin-transform-runtime', { helpers: true, polyfill: false, regenerator: false, useBuiltIns: true, useESModules: true }], //https://babeljs.io/docs/en/next/babel-plugin-transform-runtime
            ['@babel/plugin-syntax-dynamic-import'],
            ["babel-plugin-lodash"],
            development && hot && ['react-hot-loader/babel'],
            !development && ["@babel/plugin-transform-react-inline-elements"],
            !development && ["@babel/plugin-transform-react-constant-elements"],
            !development && ["babel-plugin-transform-react-remove-prop-types", {
                "mode": "remove",
                // Safe ?"ignoreFilenames": ["node_modules"] //https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types#ignorefilenames
            }]
        ]
    }
};