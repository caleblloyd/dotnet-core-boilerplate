var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: {
    app: [
      "webpack-dev-server/client?http://dockerhost:48000/",
      'webpack/hot/only-dev-server',
      'whatwg-fetch',
      './src/components/app/app.ts',
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  plugins: [
    new CopyWebpackPlugin([
        { from: './src/public' }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    inline: false,
    hot: true,
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.ts', '.js']
  }
}
