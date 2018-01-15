const path=require("path");
const glob=require("glob");
const webpack=require("webpack");
const UglifyPlugin=require("uglifyjs-webpack-plugin");
const HtmlPlugin=require("Html-webpack-plugin");
const ExtractTextPlugin=require("extract-text-webpack-plugin");
const PurifycssPlugin=require("purifycss-webpack");
const entryConfig=require("./webpack_config/entry.js");
const CopyPlugin=require("copy-webpack-plugin");

let website={
};
if(process.env.type=="build"){
  website.publicPath="http://127.0.0.1:8181/";
}else{
  website.publicPath="http://127.0.0.1:8181/";
}
module.exports={
  //devtool:'eval-source-map',//source-map独立map文件，包括行和列，打包慢；cheap-moudle-source-map独立map文件，不包括列；eval-source-map无独立文件，直接嵌入JS文件，打包快，执行有性能隐患，开发阶段用；cheap-module-eval-source-map
  entry:entryConfig,
  output:{
    path:path.resolve(__dirname,"dist"),
    filename:"[name].js",
    publicPath:website.publicPath//静态文件路径
  },
  module:{
    rules:[
      {
        test:/\.css?$/,
        //use:["style-loader","css-loader"],
        //loader:["style-loader","css-loader"]
        // use:[{
        //     loader:"style-loader"//处理CSS里的路径
        //   }, {
        //     loader:"css-loader"//处理CSS里的标签
        //   }]//CSS文件打包在入口JS文件里

        use:ExtractTextPlugin.extract({
          fallback:"style-loader",
          //use:"css-loader"
          use:[
            {loader:"css-loader",options:{importLoaders:1}},
            'postcss-loader'
          ]
        })//CSS文件分离，依赖plugins配置项里的new ExtractTextPlugin

        //include:[],
        //exclude:[],
        //query:
      },{
        test:/\.(png|gif|jpg|jpeg)/,
        use:[{
            loader:"url-loader",//处理CSS里的图片,图片大小小于下面的limit打包成base64,否则会以hash值命名图片并复制到dist，已自带file-loader,用于处理CSS里的设置的图片路径与打包后图片路径不一致问题
            options:{
              limit:50000,
              outputPath:"images/"
            }
          }]
      },{
        test:/\.(htm|html)/i,
        loader:"html-withimg-loader"
      },{
        test:/\.less/i,
        //use:[{loader:"style-loader"}, {loader:"css-loader"}, {loader:"less-loader"}]//LESS打包在js文件里
        use:ExtractTextPlugin.extract({
          fallback:"style-loader",
          use:[{loader:"css-loader"}, {loader:"less-loader"}]
        })//LESS内容打包在分离的CSS文件（index.css）里，依赖plugins配置项里的new ExtractTextPlugin，把css和less代码都打包“new ExtractTextPlugin”配置的CSS文件里
          //内部流程是这样的：less-loader把LESS文件编译为CSS代码，style-loader把它和其他CSS代码结合在一起，如果没有配置分离CSS文件，则直接在DOM里插入STYLE标签并插入量部分CSS代码；
          //如果配置了分离，则把量部分样式内容打包在“new ExtractTextPlugin”配置的CSS文件里
      },{
        test:/\.scss/i,
        //use:[{loader:"style-loader"}, {loader:"css-loader"}, {loader:"sass-loader"}]//LESS打包在js文件里
        use:ExtractTextPlugin.extract({
          fallback:"style-loader",
          use:[{loader:"css-loader"}, {loader:"sass-loader"}]
        })//
      },{
        test:/\.(jsx|js)$/i,
        use:[{
          loader:"babel-loader"
          //options:{presets:["es2015","react"]}//移到.babelrc
        }],
        exclude:"/node_modules/"
      }
    ]
  },
  plugins:[
    //new UglifyPlugin(),//开发环境下 运行wevpack-dev-server时，不能引入此插件
    new HtmlPlugin({
      minify:{removeAttributeQuotes:true},//去掉HTML里的引号
      hash:true,//引入JS路径后加HASH避免缓存
      template:"./src/index.html"
    }),
    new ExtractTextPlugin("css/index.css"),//页面上引入的打包后的CSS文件，入口JS文件里import的不同CSS或LESS文件都会打包在这里，打包后目录是：publicPath+这里的目录
    new PurifycssPlugin({
      paths:glob.sync(path.join(__dirname,'src/*.html'))
    }),
    new webpack.ProvidePlugin({
      $:"jquery"
    }),
    new CopyPlugin([{
      from:__dirname+"/src/public",
      to:"./public"//默认相对于dist
    }]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      //name对应入口文件中的名字，我们起的是jQuery
      name:'jquery',//抽离单个第三方库['jquery','vue']-抽离多个第三方库
      //把文件打包到哪里，是一个路径
      filename:"lib/jquery.min.js",//"lib/[name].js"
      //最小打包的文件模块数，这里直接写2就好
      minChunks:2
  }),
    new webpack.BannerPlugin('jspang-11111111111')//打包后的版权声明
   
  ],
  devServer:{
    contentBase:path.resolve(__dirname,"dist"),
    host:'127.0.0.1',
    compress:true,
    port:8181
  },
  watchOptions:{
    poll:1000,
    aggregateTimeout:500,//控制保存平率 ctrl+s
    ignored:/node_modules/,//不能加双引号，应该是个正则表达式
  }
};


//loader:配置的先后顺序和内部执行的先后顺序刚好相反
//css-loader:js文件里，通过require的方式来引入css，可以打包在js文件里，也可以分离出去
//style-loader:通过注入<style>标签将CSS添加到DOM中，查看源码看不到；隐藏功能：把多个样式文件内容文件组合到一起
//url-loader:将图片文件转换为base64编码并载入浏览器能够减少http请求数，但是增大了js或html文件的体积.url-loader封装了file-loader
//file-loader:url-loader处理时，如果文件大小大于limit设置的值，会调用file-loader进行处理，把图片重名并复制到DIST目录
//html-withimg-loader：把HTML代码里img标签里的src属性值修改为打包后的图片路径
//less-loader：将less代码编译为css代码
//sass-loader：将scss代码编译为css代码
//postcss-loader：自动给CSS代码的部分属性加前缀，处理浏览器兼容问题,需要在css-loader里配置引入其他loader:options:{importLoaders:1}

//plugins:
//UglifyPlugin:用于压缩打包后的JS代码，开发环境不能使用它压缩，既不能运行webpack-dev-server。
//HtmlPlugin：将HTML模板文件做处理后复制到DIST目录，比如压缩优化，重命名，配置源文件目录。
//ExtractTextPlugin：需要将CSS代码打包到单独的文件里时，必须用到。loader里用到ExtractTextPlugin.extract分离文件时，插件里必须用到它。
//purifycss-webpack:与静态HTML代码比较，删除CSS中无用的代码，对于用JS动态创建的DOM无法识别，所以意义不大。
//webpack.ProvidePlugin:引入第三方库
//webpack.BannerPlugin：打包后顶部版权说明


//需要同时安装的install命令：
//cnpm install --save-dev purifycss-webpack purify-css
//cnpm install --save-dev node-sass sass-loader
//cnpm install --save-dev postcss-loader autoprefixer
//cnpm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react

//cnpm install --save-dev babel-preset-es2015  //es7渲染器
//cnpm install --save-dev babel-preset-react  //react渲染器
//cnpm install --save-dev babel-preset-env  //es6 es7渲染器,可以替换掉babel-preset-es2015