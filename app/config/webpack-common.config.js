/* eslint-disable no-undef */
const paths = require("./paths");
const { resolve } = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.export = {
    // entry: {
    //     main: paths.appEntry
    // },
    context: resolve(__dirname, "../src"),
    resolve: {
        extentions: [".ts", ".tsx", ".js"]
    },
    output: {
        path: paths.appOutput,
        filename: "[name].[hash].js",
        publicPath: "/"
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    configFile: "../tsconfig.json"
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpe?g|png|gif|svg)?$/,
                loader: "url-loader?limit=100000"
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: paths.template
        })
    ]
}