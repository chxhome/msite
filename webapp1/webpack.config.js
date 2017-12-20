const path = require('path');
const webpack = require('webpack');
const { resolve } = require('path');
module.exports = {
    //context: __dirname,
    entry: [
        //'webpack-dev-server/client?http://127.0.0.1:8080',//资源服务器地址
        //'react-hot-loader/patch',
        //'webpack/hot/only-dev-server.js',
        path.join(__dirname, '/src/app/main.js')
    ],
    output: {
        path: path.join(__dirname, '/build'),
        filename: "bundle.js",
        publicPath: '/'
    },
    devServer: {
        port: 8080, //设置监听端口（默认的就是8080）
        contentBase: "./build",//resolve(__dirname, 'build'),//本地服务器所加载的页面所在的目录
        progress:true,
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转，用于开发单页面应用，依赖于HTML5 history API 设置为true点击链接还是指向index.html
        devtool: "eval-source-map",
        hot:true,
        publicPath: '/'
     },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/
            }
            ,{
                test:/\.css$/,
                loader: 'style-loader!css-loader'
            }
        ],
    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.NamedModulesPlugin()
        //new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
    ],
    devtool: "cheap-eval-source-map"

};
//cmd命令:webpack-dev-server --port 8080 --content-base ./build --progress --colors --history-api-fallback --devtool eval-source-map --hot
/*
--quiet 控制台中不输出打包的信息
--compress 开启gzip压缩
--progress 显示打包的进度
*/