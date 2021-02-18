/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const outputDir = path.join(__dirname, "./dist/");

module.exports = {
    entry: {
        app: './src/app.tsx',
    },
    mode: 'development',
    output: {
        path: outputDir,
        publicPath: outputDir,
        filename: '[name].js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        })
    ]
};