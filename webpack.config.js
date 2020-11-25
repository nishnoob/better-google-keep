const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            },
        ],
    },
    resolve: {
        alias: {
            root: path.resolve(__dirname, "src/"),
            icons: path.resolve(__dirname, "src/Icons/"),
        },
    },
    output: {
        path: path.resolve(__dirname, "build/"),
        filename: "bundle.js",
    },
    devServer: {
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve("./public/index.html"),
        }),
    ],
};
