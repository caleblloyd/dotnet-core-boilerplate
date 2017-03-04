var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var webpack = require("webpack");

let config = {
  entry: {
    app: [
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
    ])
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.ts', '.js']
  }
}

if (process.env.NODE_ENV === 'production') {
  // production optomized defaults
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
} else {
  // development server settings
  config.entry.app.unshift('webpack/hot/only-dev-server')
  config.entry.app.unshift('webpack-dev-server/client?http://dockerhost:48000/')
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NamedModulesPlugin());

  config.devServer = {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    inline: false,
    hot: true,
  }
}

module.exports = config
