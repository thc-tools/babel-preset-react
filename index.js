let env = process.env.NODE_ENV;
if (env !== 'development' && env !== 'test' && env !== 'production') {
    throw new Error(
        'Using `@thc/babel-preset-react` requires that you specify `NODE_ENV` ' +
        'environment variables. Valid values are "development" ' +
        '"test", and "production". Instead, received: ' +
        JSON.stringify(env) +
        '.'
    );
}

const plugins = [
    ["@babel/plugin-proposal-decorators", { "legacy": true }], //https://babeljs.io/docs/en/next/babel-plugin-proposal-decorators
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-proposal-function-bind"],
    ["@babel/plugin-proposal-object-rest-spread", { useBuiltIns: true }],
    ["@babel/plugin-proposal-optional-chaining"],
    ["@babel/plugin-proposal-nullish-coalescing-operator"],
    ['@babel/plugin-transform-runtime', { helpers: true, polyfill: false, regenerator: false, useBuiltIns: true, useESModules: true }], //https://babeljs.io/docs/en/next/babel-plugin-transform-runtime
    ['@babel/plugin-syntax-dynamic-import'],
    ["babel-plugin-lodash"]
];

//https://babeljs.io/docs/en/next/babel-plugin-transform-runtime

// Regenerator ?
// fast-async ? or babel ?
// plugin-transform-async-to-generator
// plugin-transform-regenerator
//  ['babel-plugin-transform-runtime', { helpers: false, polyfill: false, regenerator: true }],
//  ['babel-plugin-transform-regenerator', { async: false }],

module.exports = {
    presets: [
        "@babel/preset-env", {
            useBuiltIns: 'entry',
            modules: false
        },
        "@babel/preset-react", {
            useBuiltIns: true, development: env === 'development'
        }],
    plugins,
    env: {
        development: {
            plugins: [
                'react-hot-loader/babel'
            ]
        },
        production: {
            presets: [
                "babel-preset-minify", {
                    removeConsole: true,
                    removeDebugger: true
                }
            ],
            plugins: [
                "@babel/plugin-transform-react-inline-elements",
                "@babel/plugin-transform-react-constant-elements",
                "babel-plugin-transform-react-remove-prop-types", {
                    "mode": "remove",
                    // Safe ?"ignoreFilenames": ["node_modules"] //https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types#ignorefilenames
                }
            ]
        }
    }
};