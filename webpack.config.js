module.exports = {
  context: __dirname + '/src',

  entry: [
    "./js/index.js"
  ],
  output: {
    path: __dirname + "/dist/js",
    filename: 'bundle.js',
  },
  devtool: 'inline-cheap-module-source-map',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};
