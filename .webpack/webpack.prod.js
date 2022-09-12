const path = require('path');
const { merge } = require('webpack-merge');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

const umdLibrary = {
  type: 'umd',
  name: 'SakanaWidget',
  export: 'default',
  umdNamedDefine: true,
};

// demo site
const site = merge(common, {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/main.ts'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.[contenthash:8].min.js',
    library: umdLibrary,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
        legalComments: 'eof',
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
});

// for cdn script
const cdn = merge(common, {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/main.ts'),
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'sakana.min.js',
    library: umdLibrary,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
        legalComments: 'eof',
      }),
    ],
  },
});

// for umd library script
const umd = merge(common, {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/main.ts'),
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'main.js',
    library: umdLibrary,
  },
  optimization: {
    minimize: false,
  },
});

// for esm library script
const esm = merge(common, {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/main.ts'),
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'main.esm.js',
    library: {
      type: 'module',
    },
  },
  optimization: {
    minimize: false,
  },
  experiments: {
    outputModule: true,
  },
});

module.exports = [site, cdn, umd, esm];
