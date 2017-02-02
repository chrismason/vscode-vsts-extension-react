var path = require("path");
var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    target: "web",
    entry: {
        app: "./src/app.tsx"
    },
    output: {
        filename: "src/[name].js",
        libraryTarget: "amd"
    },
    externals: [
        /^VSS\/.*/, /^TFS\/.*/, /^q$/
    ],
    devtool: "inline-source-map",
    resolve: {
        extensions: [
            "",
            ".webpack.js",
            ".web.js",
            ".ts",
            ".tsx",
            ".js"],
        root: [
            path.resolve("./src")
        ]
    },
    module: {
        preLoaders: [
            {
                test: /\.tsx?$/,
                loader: "tslint"
            }
        ],
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.s?css$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    },
    devServer: {
        https: true
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: "./src/*.html", to: "./" },
            { from: "./libs", to: "libs" },
            { from: "./marketplace", to: "marketplace" },
            { from: "./img", to: "img" },
            { from: "./vss-extension.json", to: "vss-extension.json" }
        ])
    ]
}