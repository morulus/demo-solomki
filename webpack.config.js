var webpack = require('webpack');
var postcssnested = require('postcss-nested');
var autoprefixer = require('autoprefixer')({
  browsers: [
    '> 1%',
    'ie >= 9'
  ]
});
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var postcssFor = require('postcss-for');
module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    filename: 'bundle.js',
    publicPath: '',
    library: 'app',
    libraryTarget: 'this'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: /*ExtractTextPlugin.extract(*/"style!css?root=./..!postcss"
      },
      {
				test: /\.(png|jpg|jpeg|gif|woff)$/,
				loaders: [
					'url-loader?name=[path][name].[ext]'
				]
			},
      //{ test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/, loader: 'url?limit=999999' },
      // { test: /^(?!http:\/\/).*\.woff(\?\S*)?$/, loader: "url-loader?limit=999999&mimetype=application/font-woff" },
      { test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/, loader: 'file' },
    ]
  },
  postcss: function() {
    return [autoprefixer, postcssnested, postcssFor];
  },
  plugins: [
      new ExtractTextPlugin("[name].css"),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
  ]
}
