# babel-preset-react
This project's goal is to make a babel preset, to be used for React project built with webpack.
That way, the react applications only needs one dependency, and one preset for all the thing concerning babel.

## How to use
Install the dependency as dev dependencies, and use the preset.

Also, NODE_ENV environnement variable must be set to a value of development, production, or test.

## Presets used
This preset re-uses existing presets :
* @babel/preset-env => ES2017 compatibility, based on browerlist query
* @babel/preset-react => JSX handling + better debugging

For production :
* babel-preset-minify => minifying code for production use (may be replaced in the future by uglify-es instead)

## Plugins used
This preset re-uses existing plugins:
 * @babel/plugin-proposal-decorators => handling decorators, annotations
 * @babel/plugin-proposal-class-properties => handling setting class properties (static, easy syntax, ...)
 * @babel/plugin-proposal-function-bind => easy binding with :: notation (this.boundFunc = ::this.func, or that::this.func)
 * @babel/plugin-proposal-object-rest-spread => handling object spreading ({a,b,...c} syntax)
 * @babel/plugin-proposal-optional-chaining => handling optional chaining (a?.b?.c instead of a && a.b && a.b.c)
 * @babel/plugin-proposal-nullish-coalescing-operator => handling default value (a ?? "Default" instead of a ? a : "Default")
 * @babel/plugin-transform-runtime => optimizing babel transform, by reusing helpers in babel/runtime (ES6 mode)
 * @babel/plugin-syntax-dynamic-import => support for import('module') syntax
 * babel-plugin-lodash => optimizing lodash import (import {add} from 'lodash' => import add from 'lodash/fp/add')

For development :
 * react-hot-loader/babel => handling hot reload for React app (to use with some conf in webpack)

For prduction :
 * @babel/plugin-transform-react-inline-element => inlining call to React API, for smaller bundle.
 * @babel/plugin-transform-react-constant-elements => hoists static React tree, avoiding calls to React.createElement, and skipping reconciling phase for subtree
 * babel-plugin-transform-react-remove-prop-types => Remove proptype declaration from source, for a smaller bundle

## Rules :
* Commit must follow [Conventional Commit convention](https://conventionalcommits.org/)
* [Pre-commit package](https://www.npmjs.com/package/pre-commit) should be use to enforce linting, tests validations, ...
