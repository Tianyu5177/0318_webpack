//引入path模块，专门用于解决路径相关问题
const path = require('path');
//引入extract-text-webpack-plugin，用于提取css为单独文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//引入html-webpack-plugin自动生成html，自动引入外部资源
const HtmlWebpackPlugin = require('html-webpack-plugin');
//引入clean-webpack-plugin，清空输出的文件夹
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
//引入webpack
const webpack = require('webpack');

module.exports = {
  //入口（从哪里进入开始解析）
  entry:['./src/js/index.js','./src/index.html'],

  //输出（最终加工完的代码输出到哪里）
  output: {
    path: path.resolve(__dirname, '../build'),//输出文件路径配置
    filename: 'js/index.js',// 输出文件名
  },

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

      //使用file-loader处理图片资源（不能动态的转base64编码）
      /*{
        test: /\.(png|jpg|gif)$/,
        use:[
          {
            loader: 'file-loader',
            options: {
              outputPath:'img', //图片最终输出的位置,以输出文件夹为基准(build)
              publicPath:'../build/img',//css资源图片路径,以src文件夹为基准
              name:'[hash:5].[ext]'//修改图片名称
            }
          }
        ]
      },*/

      //使用url-loader处理图片资源（可以转换base64编码）
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',  //如果不做图片转base64，可以用file-loader
            options: {
              limit: 8192,  //图片大小的敏感点，大于8KB不转换，小于8KB转成base64
              outputPath:'img',   //图片最终输出的位置
              publicPath:'../img', //css资源图片路径
              name:'[hash:5].[ext]'  //修改图片名称
            }
          }
        ]
      },

      //使用jshint-loader做语法检查
      {
        test: /\.js$/, // 涵盖.js 文件
        enforce: "pre", // 预先加载好jshint loader
        exclude: /node_modules/, // 排除掉 node_modules 文件夹下的所有文件
        use: [
          {
            loader: "jshint-loader",
            options: {
              //jslint 的错误信息在默认情况下会显示为 warning（警告）类信息
              //将 emitErrors 参数设置为 true 可使警告显示为 error（错误）类信息
              emitErrors: false,

              //jshint 默认情况下不会打断webpack编译
              //如果你想在 jshint 出现错误时，立刻停止编译
              //请设置 failOnHint 参数为true
              failOnHint: false,
              esversion: 6
            }
          }
        ]
      },

      //使用babel-loader进行es6转es5
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
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
    //提取css为单独文件
    new ExtractTextPlugin("./css/index.css"), //此处的路径以输出位置为基准
    //自动生成html
    new HtmlWebpackPlugin({
      title:"0318",//生成的html文件的title标签
      filename:"index.html",//生成文件的名字
      template:"./src/index.html"//这里的路径以配置文件所在文件夹的路径为基准
    }),
    //清空输出的文件夹
    new CleanWebpackPlugin(),
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
}