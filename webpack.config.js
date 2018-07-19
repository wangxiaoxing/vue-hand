const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    //指定入口
    entry: {
        entry: './src/main.js'
    },
    //指定出口
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
     //解决import组件文件时需要.vue后缀的问题
    resolve: {
        extensions:['.js','.vue']
    },
    module: {
        //对应文件加载器
        loaders: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                //排除路径
                exclude: /node_modules/,
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.(png|jpg|gif|svg|ico)$/,
                loader: 'file-loader',
                options: {
                    //图片导出路径
                    name: 'images/[name].[ext]'
                }
            },
            //引入zepto
            {
                test: require.resolve('zepto'),
                loader: 'exports-loader?window.$!script-loader'
            }
        ]
    },
    plugins: [
        //压缩js
        new uglify(),
        //发布html
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        }),
        //全局使用zepto,不需要手动import
        new webpack.ProvidePlugin({
            $: 'zepto'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        compress: true,
        port: 9527
    }
}
