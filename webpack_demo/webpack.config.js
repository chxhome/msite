const path=require("path");
const UglifyPlugin=require("uglifyjs-webpack-plugin");
const HtmlPlugin=require("Html-webpack-plugin");
module.exports={
  entry:{
    entry:"./src/entry.js"
    //entry2:"./src/entry2.js"
  },
  output:{
    path:path.resolve(__dirname,"dist"),
    filename:"[name].js"
  },
  module:{
    rules:[
      {
        test:/\.css?$/,
        //use:["style-loader","css-loader"],
        //loader:["style-loader","css-loader"]
        use:[
          {
            loader:"style-loader"
          }, {
            loader:"css-loader"
          }
        ]
        //include:[],
        //exclude:[],
        //query:
      }
    ]
  },
  plugins:[
    new UglifyPlugin(),
    new HtmlPlugin({
      minify:{removeAttributeQuotes:true},//去掉HTML里的引号
      hash:true,//引入JS路径后加HASH避免缓存
      template:"./src/index.html"
    })
  ],
  devServer:{
    contentBase:path.resolve(__dirname,"dist"),
    host:'127.0.0.1',
    compress:true,
    port:8181
  }
};
//开发环境js不能压缩，不能运行webpack-dev-server,可以webpack打包