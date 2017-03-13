var CopyWebpackPlugin = require('copy-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin')
var path = require('path');
var webpack = require("webpack");

let commonConfig = {
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.ts', '.js']
  }
}

let devConfig = {
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
  entry: {
    app: [
      'webpack-dev-server/client?/',
      'webpack/hot/only-dev-server',
      'es6-shim',
      'whatwg-fetch',
      './src/index',
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'BUILD_DEVENV': JSON.stringify(process.env.DEVENV || 'local'),
      'RUNTIME_ENV': JSON.stringify('browser'),
    })
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    inline: false,
    hot: true,
    contentBase: './src/public',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
  }
}

let prodConfig = {
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
  entry: {
    app: [
      'es6-shim',
      'whatwg-fetch',
      './src/index',
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src', 'public'),
      to: path.resolve(__dirname, 'dist')
    }]),
    new webpack.DefinePlugin({
      'BUILD_DEVENV': JSON.stringify(process.env.DEVENV || 'local'),
      'RUNTIME_ENV': JSON.stringify('browser'),
    })
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/assets/',
    path: path.resolve(__dirname, 'dist', 'assets')
  }
}

let ssrConfig = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: "tsconfig.ssr.json"
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ],
  },
  entry: {
    app: [
      './server'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'BUILD_DEVENV': JSON.stringify(process.env.DEVENV || 'local'),
      'RUNTIME_ENV': JSON.stringify('server'),
    }),
    new WriteFilePlugin()
  ],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist-ssr')
  },
  devServer: {
    outputPath: path.resolve(__dirname, 'dist-ssr')
  },
  target: 'node'
}

if (process.env.NODE_ENV === 'production') {
  module.exports = [
    Object.assign({}, commonConfig, prodConfig),
    Object.assign({}, commonConfig, ssrConfig)
  ]
} else {
  module.exports = [
    Object.assign({}, commonConfig, devConfig),
    Object.assign({}, commonConfig, ssrConfig)
  ]
}
