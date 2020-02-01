const path = require("path");

module.exports = {
    entry: {
        main: "./src/index.js"
    },
    mode: "development", // valid modes are development and production
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    devServer: {
        contentBase: "dist"
    }
};