const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


function resolve(dir) {
    return path.join(__dirname, dir)
}

function assetsPath(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        'static' :
        'static'
    return path.posix.join(assetsSubDirectory, _path)
}
//公共配置
let baseWebpackConfig = {
    entry: './src/main.js',
    output: {
        //path表示输出到那个文件夹下而已，对路径没有影响
        path: path.resolve(__dirname, 'dist'),
        publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
        filename: '[name].js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader",
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                //处理图片文件
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // 生成的文件的保存路径和后缀名称
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                //处理字体文件
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /vux.src.*?js$/,
                loader: 'babel'
            },
            //引入zepto
            {
                test: require.resolve('zepto'),
                loader: 'exports-loader?window.$!script-loader'
            },

        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json', '.less']
    },
    plugins: [
        //全局使用zepto,不需要手动import
        new webpack.ProvidePlugin({
            $: 'zepto'
        }),
    ],
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
const devWebpackConfig = merge(baseWebpackConfig, {
    devServer: {
        clientLogLevel: 'warning',
        // historyApiFallback: {
        //     rewrites: [{
        //         from: /.*/,
        //         to: path.posix.join('/', 'index.html')
        //     }, ],
        // },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        // host: localhost,
        port: 9527,
        open: true,
        overlay: true ?
            {
                warnings: false,
                errors: true
            } :
            false,
        publicPath: '/',
        proxy: {},
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: false,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': merge({
                NODE_ENV: '"production"'
            }, {
                NODE_ENV: '"development"'
            })
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
             // 将所有的静态文件都插入到body文件的末尾
            inject: true
        }),
        new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, 'src/assets'),
              to: 'static',
              ignore: ['.*']
            }
        ]),
        new HtmlWebpackPlugin({
            // 生成的文件的名称
            template: './src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
    ]
})
const proWebpackConfig = merge(baseWebpackConfig, {
    // module: {
    //     rules: [
    //         {
    //             test: /\.css$/,
    //             use: ExtractTextPlugin.extract({
    //                 use: [
    //                     'vue-style-loader','css-loader','style-loader'
    //                 ],
    //                 fallback: 'vue-style-loader'
    //             })
                
    //         }, {
    //             test: /\.scss$/,
    //             use: ExtractTextPlugin.extract({
    //                 use: ["css-loader","sass-loader",'style-loader'
    //                 ],
    //                 fallback: "sass-loader"
    //             })
    //         }
    //     ]
    // },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"production"' }
        }),
        //压缩js的插件
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            // 使用 source map 将错误信息的位置映射到模块（这会减慢编译的速度）
            // 而且这里不能使用cheap-source-map
            sourceMap: true,
            // 使用多进程并行运行和文件缓存来提高构建速度
            parallel: true
        }),
        // extract css into its own file
        // 提取css文件到一个独立的文件中去
        new ExtractTextPlugin({
            filename: assetsPath('css/[name].[contenthash].css'),
            allChunks: true,
        }),
        // 使用这个插件压缩css，主要是因为，对于不同组件中相同的css可以剔除一部分
        // new OptimizeCSSPlugin({
        //     cssProcessorOptions: true
        //         ? { safe: true, map: { inline: false } }
        //         : { safe: true }
        // }),
        new HtmlWebpackPlugin({
            // 生成的文件的名称
            // filename: path.resolve(__dirname, '/dist/index.html'),
            template: './src/index.html',
            // 把script和link标签放在body底部
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        // 根据模块的相对路径生成一个四位数的hash作为模块id
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        // 通过减少闭包函数数量从而加快JS的执行速度。
        new webpack.optimize.ModuleConcatenationPlugin(),
        // split vendor js into its own file
        // 这个插件用于提取多入口chunk的公共模块
        // 通过将公共模块提取出来之后，最终合成的文件能够在最开始的时候加载一次
        // 然后缓存起来供后续使用，这会带来速度上的提升。
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            // 把所有从mnode_modules中引入的文件提取到vendor中
            minChunks(module) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, 'node_modules')
                    ) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }),
        //因为这里没有static文件夹所以不用
        // new CopyWebpackPlugin([
        //     { 
        //        // 定义要拷贝的资源的源目录
        //       from: path.resolve(__dirname, 'static'),
        //       // 定义要拷贝的资源的目标目录
        //       to: 'static',
        //        // 忽略拷贝指定的文件，可以使用模糊匹配
        //       ignore: ['.*']
        //     }
        //   ])
         ]

})
if (process.env.NODE_ENV === 'production') {
    module.exports = proWebpackConfig;
} else { 
    module.exports = devWebpackConfig;
}
