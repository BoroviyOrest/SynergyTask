const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, 'SynergyTask/static/src/app.js')],
  output: {
    path: path.join(__dirname, 'SynergyTask/static/public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  watch: true,
  resolve: {
    alias: {
      src: path.join(__dirname, 'SynergyTask/static/src')
    },
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: path.join(__dirname, 'SynergyTask/static/'),
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader', 'file-loader', 'img-loader'],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './SynergyTask/static/public',
    watchContentBase: true,
    compress: true,
    hot: true
  }
};
