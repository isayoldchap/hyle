const path = require("path");

module.exports = {
    entry: {
        main: "./src/index.js"
    },
    mode: "development", // valid modes are development and production
    devtool: 'eval-source-map',
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    devServer: {
        contentBase: "dist",
        overlay: true
    }, 
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].html"
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                //   options: {
                //     presets: [
                //         '@babel/preset-env',
                //         '@babel/preset-react'
                //     ]
                //   }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                    }
                  }
                ]
              }
        ]
    }
};