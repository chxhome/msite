const path = require('path');
const webpack = require('webpack');
const { resolve } = require('path');

const UglifyPlugin=require("uglifyjs-webpack-plugin");
const ExtractTextPlugin=require("extract-text-webpack-plugin");
const HtmlPlugin=require("html-webpack-plugin");
const CopyPlugin=require("copy-webpack-plugin");
module.exports = {
    //context: __dirname,
    devtool: "cheap-eval-source-map",
    entry: {
        //'webpack-dev-server/client?http://127.0.0.1:8080',//资源服务器地址
        //'react-hot-loader/patch',
        //'webpack/hot/only-dev-server.js',
        "bundle":path.join(__dirname, '/src/app/main.js'),
        "react":["react","react-dom"]
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: "[name].js",
        publicPath: '/build/'
    },
    // externals: {
    //     "react": 'react',
    //     'react-dom': 'ReactDOM'
    // },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/
            },{
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                      {loader:"css-loader",options:{importLoaders:1}},'postcss-loader'
                    ]//需要安装autoprefixer，需要配置文件postcss.config
                })
            },{
                test:/\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                      {loader:"css-loader"},{loader:"sass-loader"}
                    ]
                })
            },{
                test:/\.(png|gif|jpg|jpeg)/,
                use:[{
                    loader:"url-loader",//处理CSS里的图片,图片大小小于下面的limit打包成base64,否则会以hash值命名图片并复制到dist，已自带file-loader,用于处理CSS里的设置的图片路径与打包后图片路径不一致问题
                    options:{
                      limit:256,
                      name:"[name].[ext]",//不设置或设置为"[name].[hash].[ext]"用HASH命名，一般不希望
                      outputPath:"images/"
                    }
                  }]
              }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //new UglifyPlugin(),//开发环境下 运行wevpack-dev-server时，不能引入此插件
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin("css/index.css"),//页面上引入的打包后的CSS文件，入口JS文件里import的不同CSS或LESS文件都会打包在这里，打包后目录是：publicPath+这里的目录
        new HtmlPlugin({
            minify:{removeAttributeQuotes:true},//去掉HTML里的引号
            hash:true,//引入JS路径后加HASH避免缓存
            template:"./src/index.html"
          }),
        new CopyPlugin([{
            from:__dirname+"/src/res",
            to:"./res"//默认相对于dist
        }]),
        // new webpack.ProvidePlugin({
        //     $:"jquery"
        // }),//用于分离打包第三方库
        new webpack.optimize.CommonsChunkPlugin({
                name: 'react', 
                filename: 'react.bundle.js' ,
                hash:false
        }),//分离打包react和react-dom 需要和entry配置配合,有个问题是，尾部跟着hash，每次访问需要下载，这时个问题。可能需要借助gulp处理
        new webpack.BannerPlugin('chxsite')//打包后的版权声明
    ],
    
    devServer: {
        host:"127.0.0.1",
        port: 8080, //设置监听端口（默认的就是8080）
        contentBase: "./build",//resolve(__dirname, 'build'),//本地服务器所加载的页面所在的目录
        
        // progress:true,
        // colors: true,//终端中输出结果为彩色
        // historyApiFallback: true,//不跳转，用于开发单页面应用，依赖于HTML5 history API 设置为true点击链接还是指向index.html
        // devtool: "eval-source-map",
        // hot:true,
        // publicPath: '/',

        compress:true
     },

};
//cmd命令:webpack-dev-server --port 8080 --content-base ./build --progress --colors --history-api-fallback --devtool eval-source-map --hot
/*
--quiet 控制台中不输出打包的信息
--compress 开启gzip压缩
--progress 显示打包的进度
*/