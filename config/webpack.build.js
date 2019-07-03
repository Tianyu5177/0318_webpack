//引入path模块，专门用于解决路径相关问题
const path = require('path');
//引入extract-text-webpack-plugin，用于提取css为单独文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//引入clean-webpack-plugin，清空输出的文件夹
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
//引入webpack.common
const common = require('./webpack.common')
//引入合并的库
const merge = require('webpack-merge')


module.exports = merge(common,{

  //所有的loader都要配置在module里,所有的loader在使用的时候，都不用引入。
  module: {
    //rules中指明loader“干活”的顺序，以及处理哪些文件。
    rules: [
      //使用less-loader、css-loader、style-loader处理less文件
      {
        test: /\.less$/,//处理所有以.less结尾的文件
        //原写法（只用loader）
        /*use: [
          {
          loader: "style-loader" // 创建一个style标签，将js中的css放入其中
        },
          {
          loader: "css-loader" // 将css以CommonJs语法打包到js中
        },
          {
          loader: "less-loader" // 将less转换成css
        }
        ]*/
        //新写法（loader配合plugins）
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","less-loader"]
        })
      },
    ]
  },

  //插件配置在这里
  plugins:[
    //提取css为单独文件
    new ExtractTextPlugin("./css/index.css"), //此处的路径以输出位置为基准
    //清空输出的文件夹
    new CleanWebpackPlugin()
  ]
})
