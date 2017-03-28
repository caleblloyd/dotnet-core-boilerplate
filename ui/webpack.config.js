const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WriteFilePlugin = require('write-file-webpack-plugin')
const path = require('path');
const webpack = require("webpack");

let commonConfig = {
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.ts', '.js']
  }
}

let browserRules = [
  {
    test: /\.ts$/,
    loader: 'awesome-typescript-loader'
  },
  {
    test: /\.html$/,
    loader: 'html-loader'
  },
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader'
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
  }
]

let devConfig = {
  module: {
    rules: [
      ...browserRules,
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 
            { loader: 'css-loader' } 
          ]
        })
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
    new ExtractTextPlugin("styles.css"),
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
      ...browserRules,
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 
            { loader: 'css-loader', options: { minimize: true } } 
          ]
        })
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
    new ExtractTextPlugin("styles.css"),
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
      },
      {
        test: /\.css$/,
        loader: 'null-loader'
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
