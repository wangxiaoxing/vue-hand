# vue-hand
用webpack手动搭建vue2项目
安装了vue、vuex、vue-router、axios、mockjs、zepto、mint-ui、babel等依赖。

一、使用方法：

clone到本地后进入目录，

cnpm install

cnpm run server

打包命令为：

cnpm run build

二、一些注意事项及命令：

1.cnpm init 生成package.json

2.cnpm install --save-dev webpack

3.新建文件夹，index.html等文件目录

4.安装vue cnpm install --save vue

5.写webpack.config.js文件

6.cnpm install webpack-dev-server --save-dev

cnpm install style-loader --save-dev

cnpm install --save-dev css-loader

cnpm install --save-dev babel-core babel-loader babel-preset-env
             
cnpm install --save-dev babel-plugin-transform-runtime
             
cnpm install vue-template-compiler --save-dev

cnpm install --save-dev html-webpack-plugin

cnpm install vue-loader --save-dev

cnpm install vue-router --save

cnpm install vuex --save
   
cnpm install axios --save
   
cnpm install mint-ui --save

cnpm install autoprefixer-loader --save-dev

7.注意webpack\\\ webpack-dev-servr\\\vue-loader的版本号要修改      

8.main.js中new Vue({
    el: '#app',s
    render: (c) => { 
        return c(App);
    }
})

9.全局引入zepto方法：
  1.cnpm install zepto --save
  
  2.cnpm install exports-loader script-loader --save-dev
  
  3.webpack.config.js配置 
    {
                test: require.resolve('zepto'),
                loader: 'exports-loader?window.$!script-loader'
     }
     new webpack.ProvidePlugin({
            $:'zepto'
        })

10.安装mock.js

cnpm install mockjs --save-dev

配置main.js 新建mock目录
