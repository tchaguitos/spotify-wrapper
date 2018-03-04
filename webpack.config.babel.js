import { join } from 'path';

export default {
  devtool: 'source-map',
  entry: ['babel-polyfill', './src/index'],
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'spotifyWrapper',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['env', { modules: false }],
          ],
        },
      },
    ],
  },
};
