const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const destDir = path.resolve(__dirname, 'public');

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    output: {
        path: destDir,
        filename: 'index.js',
        // publicPath: '/dist_client',
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    module: {
        rules: [
            {
                test: /\.(tsx?)|(js)$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
        ],
    },

    plugins: [
        new HtmlWebPackPlugin(),
        new webpack.NamedModulesPlugin(),
    ],

    devServer: {
        static: {
            directory: destDir,
            watch: true,
        },
        open: true,
    }
};