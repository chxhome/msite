var path = require('path');
module.exports = {
    entry: path.resolve(__dirname, './src/app/main.js'),
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    }
};