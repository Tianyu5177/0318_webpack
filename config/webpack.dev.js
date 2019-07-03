//引入path模块，专门用于解决路径相关问题
const path = require('path');
//引入webpack
const webpack = require('webpack');
//引入webpack.common
const common = require('./webpack.common')
//引入合并的库
const merge = require('webpack-merge')

module.exports = merge(common,{
  //入口（从哪里进入开始解析）
  entry:['./src/js/index.js','./src/index.html'],

  //所有的loader都要配置在module里,所有的loader在使用的时候，都不用引入。
  module: {
    //rules中指明loader“干活”的顺序，以及处理哪些文件。
    rules: [

      //使用less-loader、css-loader、style-loader处理less文件
      {
        test: /\.less$/,//处理所有以.less结尾的文件
        //原写法（只用loader）
        use: [
          {
            loader: "style-loader" // 创建一个style标签，将js中的css放入其中
          },
          {
            loader: "css-loader" // 将css以CommonJs语法打包到js中
          },
          {
            loader: "less-loader" // 将less转换成css
          }
        ]
        //新写法（loader配合plugins）
        /*use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader","less-loader"]
          })*/
      },

      //使用html-loader，为了实现html文件的自动更新
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        }
      }


    ]
  },

  //插件配置在这里
  plugins:[
    //支持热模替换
    new webpack.HotModuleReplacementPlugin()
  ],

  //配置服务器核心信息
  devServer: {
    hot: true, //模块热更新（热模替换HMR）？？？？
    open:true, //自动打开浏览器
    port:3001,//服务器端口
    compress:true //启用gzip压缩
  }
})
