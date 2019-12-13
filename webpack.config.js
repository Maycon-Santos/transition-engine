const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const libraryName = 'animation-engine-js'
const isDevServer = process.env.WEBPACK_DEV_SERVER

module.exports = {
  entry: './src/index.ts',
  mode: isDevServer? 'development' : 'production',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      { test: /\.ts$/, loader: "ts-loader" },
    ],
  },
  plugins: isDevServer ? [
    new HtmlWebpackPlugin({
      template: 'tests/index.html',
    }),
  ] : [
    // new DtsBundlePlugin()
  ],
}

function DtsBundlePlugin(){}
DtsBundlePlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', function(){
    var dts = require('dts-bundle');

    dts.bundle({
      name: libraryName,
      main: 'src/index.d.ts',
      out: '../dist/index.d.ts',
      removeSource: true,
      outputAsModuleFolder: true,
    });
  });
};
