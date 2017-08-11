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
                test: /images\/favicons\/.*?\.png$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/favicons/' + urlLoaderFilename
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
            favicon: './src/image/icon/logo.ico'
        })
    ],
    devServer: {
        inline: true,
        port: 80,
        publicPath: '/static/',
        host:'192.168.2.189',
    }
};
