/**
 * Rollup configuration for packaging the plugin in a module that is consumable
 * as the `src` of a `script` tag or via AMD or similar client-side loading.
 *
 * This module DOES include its dependencies.
 */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';

export default {
  name: '<%= moduleName %>',
  input: 'src/plugin.js',
  output: {
    file: 'dist/<%= pluginName %>.js',
    format: 'umd'
  },
  external: [
    'video.js'
  ],
  globals: {
    'video.js': 'videojs'
  },
<% if (ie8) { -%>
  legacy: true,
<% } -%>
  plugins: [
    resolve({
      browser: true,
      main: true,
      jsnext: true
    }),
    json(),
    commonjs({
      sourceMap: false
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
<% if (ie8) { -%>
        'es3',
<% } -%>
        ['es2015', {
          loose: true,
          modules: false
        }]
      ],
      plugins: [
        'external-helpers',
        'transform-object-assign'
      ]
    })
  ]
};
