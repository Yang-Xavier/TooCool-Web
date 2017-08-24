// /**
//  * Created by yangbingxun on 2017/7/30.
//  */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src/');
const outputPath = path.resolve(__dirname, 'static/');
const chunkCssFilename = 'css/build.css';
const urlLoaderFilename = '[name].[ext]';

module.exports = {
    //页面入口文件配置
    entry: {
        index: [
            srcPath + '/index.js'
        ]
    },
    //入口文件输出配置
    output: {
        path: path.resolve(outputPath),
        filename: 'js/build.js',
        publicPath: "/static/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: [
                    'react-hot-loader',
                    'babel-loader'
                ],
                include: [ srcPath ]
            },
            {
                test: /\.(png|PNG|jpg|JPG)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'images/' + urlLoaderFilename,
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: '/static/'
                })
            }
        ]
    },
    //插件项
    plugins: [
        new ExtractTextPlugin({
            'filename': chunkCssFilename
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/view/index.html',
            inject: true,
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    devServer: {
        inline: true,
        port: 8081,
        publicPath: '/static/',
        // host:'192.168.2.189',
        // host:'172.20.10.5',
        // host:'192.168.31.207',
        host:'www.static_xavier.com'
    }
};
