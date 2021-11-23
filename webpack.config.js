const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin');

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
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, './node_modules/monaco-editor'),
                use: ["style-loader", "css-loader"],
            }
        ],
    },

    plugins: [
        new HtmlWebPackPlugin(),
        new MonacoEditorWebpackPlugin({
            languages: ['javascript'],
        }),
    ],

    devServer: {
        static: {
            directory: destDir,
            watch: true,
        },
        open: true,
    }
};