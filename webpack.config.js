//引入path模块，专门用于解决路径相关问题
const path = require('path');

module.exports = {
  //入口（从哪里进入开始解析）
  entry:'./src/js/index.js',

  //输出（最终加工完的代码输出到哪里）
  output: {
    path: path.resolve(__dirname, 'build'),//输出文件路径配置
    filename: 'index.js',// 输出文件名
  },

  //所有的loader都要配置在这里
  module: {
    //loader“干活”顺序，以及处理哪些文件，都需要在rules指明。
    rules: [
      //如下规则是：
      {
        test: /\.less$/,//处理所有以.less结尾的文件
        use: [{
          loader: "style-loader" // 创建一个style标签，将js中的css放入其中
        }, {
          loader: "css-loader" // 将css以CommonJs语法打包到js中
        }, {
          loader: "less-loader" // 将less转换成css
        }]
      }
    ]
  }
}