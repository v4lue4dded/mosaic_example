const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Path to your main JavaScript file
  output: {
    filename: 'bundle.js', // Output bundle file name
    path: path.resolve(__dirname, 'dist'), // Path to output folder
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Regex for JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'] // Preset used for compiling ES6 and above down to ES5
          }
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  }
};
