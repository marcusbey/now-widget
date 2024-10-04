const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@api': path.resolve(__dirname, 'src/ts/api/'),
      '@components': path.resolve(__dirname, 'src/ts/components/'),
      '@utils': path.resolve(__dirname, 'src/ts/utils/'),
      '@types': path.resolve(__dirname, 'src/ts/types/'),
    },
  },
  output: {
    filename: 'now-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    headers: {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:8081',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    proxy: {
      '/api': 'http://localhost:3000',
    },
    open: false,
  },
  mode: 'development',
};