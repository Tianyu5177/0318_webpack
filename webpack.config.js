//引入path模块，专门用于解决路径相关问题
const path = require('path');
//引入extract-text-webpack-plugin，用于提取css为单独文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  //入口（从哪里进入开始解析）
  entry:'./src/js/index.js',

  //输出（最终加工完的代码输出到哪里）
  output: {
    path: path.resolve(__dirname, 'build'),//输出文件路径配置
    filename: 'index.js',// 输出文件名
  },

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

    ]
  },

  plugins:[
    //提取css为单独文件
    new ExtractTextPlugin("./css/index.css") //此处的路径以输出位置为基准
  ]
}