/* eslint-disable no-undef */
const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack-common.config");
const MiniCssExtractionPlugin = require("mini-css-extract-plugin");
const BundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = () => {
    return merge(common, {
        mode: "development",
        devtool: "inline-source-map",
        devServer: {
            port: 8080,
            historyApiFallback: true,
            overlay: true,
            open: true,
            stats: "errors-only",
            host: "0.0.0.0"
        },
        plugins: [
            new MiniCssExtractionPlugin({
                filename: "[name].css",
            }),
            new BundleAnalyzer(),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(process.env)
            })
        ]
    })
}