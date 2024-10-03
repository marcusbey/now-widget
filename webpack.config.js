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
  },
  devServer: {
    static: './public',
    port: 8080,
  },
};