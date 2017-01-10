'use strict'

const Path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = options => {

  const webpackConfig = {
    devtool: options.devtool,
    entry: [
      `webpack-dev-server/client?http://localhost:${options.port}`,
      'webpack/hot/dev-server',
      './src/main.js'
    ],
    output: {
      path: Path.join(__dirname, 'dist'),
      filename: 'd3-playbooks.maps.min.js'
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development')
        }
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    module: {
      loaders: [{
        test: /\.scss$/i,
        loaders: ['style', 'css', 'sass']
      }, {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }]
    }
  }

  if (options.isProduction) {
    webpackConfig.entry = ['./src/main.js']

    // external dependencies
    webpackConfig.externals = {
      d3: 'd3',
      Papa: 'papaparse'
    }

    webpackConfig.plugins.push(
      new Webpack.optimize.OccurenceOrderPlugin(),
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      })
    )

  } else {
    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin(),
      new Webpack.ProvidePlugin({d3: 'd3'})
    )

    webpackConfig.module.loaders.push({
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/
    })

    webpackConfig.devServer = {
      contentBase: './dist',
      hot: true,
      port: options.port,
      inline: true,
      progress: true
    }
  }

  return webpackConfig

}
