const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const merge = require('merge-stream');//用于合并多个控制流（任务流）Merges an arbitrary number of streams. Returns a merged stream.
const buffer = require('vinyl-buffer');//将vinyl对象内容中的stream转换为buffer；npm install --save-dev vinyl-buffer
const pngquant = require('imagemin-pngquant');//Returns a promise for a buffer

const gulp = require('gulp');
const debug = require('gulp-debug');//Debug Vinyl file streams to see what files are run through your Gulp pipeline
const mcss = require('gulp-mcs');
const iconfont = require('gulp-iconfont');//将多个SVG文件合并生成不同类型的字体文件
const iconfontCss = require('gulp-iconfont-css');//将多个SVG文件生成字体样式代码
const imagemin = require('gulp-imagemin');//npm install --save-dev gulp-imagemin
const spritesmith = require('gulp.spritesmith');//根据某目录下的多张图标生成一个雪碧图。npm install --save-dev gulp-spritesmith
const replace = require('gulp-replace');


gulp.task('del-react-js-hash', function() {
	
});

gulp.task('build-c', [], () => {
    const config = require('./webpack.config.js');
    const compiler = webpack(config,function(err,stats){
        gulp.src('./build/index.html')
		.pipe(replace(/react\.bundle\.js\?\w+/g, 'react.bundle.js'))
		.pipe(gulp.dest('./build'));
    });
});

gulp.task('build', ['build-c'], () => {
     gulp.watch(['./src/app/**/*.js','./src/js/**/*.js','./src/sass/**/*.scss'],['build-c']);
    
});

gulp.task('websvr', () => {
    const config = require('./webpack.config.js');
    const compiler = webpack(config,function(err,stats){
        if(err){return;}
        gulp.watch(['./src/app/**/*.js','./src/js/**/*.js'],['build-c']);
        const server = new WebpackDevServer(compiler, {
            //contentBase: './',
            //hot: true,
            //filename: 'bundle.js',
            //publicPath: '/'
        });
        server.listen(8080, 'localhost', function () { 
    
        });
    });
   
});


//把某个目录下的SVG图片生成一个字体图标文件，并生成CSS代码
//targetPath不能用相对路径，因为path里含src与targetPath也喊src会出现奇怪的路径定位错误，所以改为绝对路径
let fontName = 'iconfont';
gulp.task('iconfont', () => {
    return gulp.src('./fonts/' + fontName + '/*.svg')
        .pipe(iconfontCss({
            fontName: fontName,
            path: './fonts/_icontpl.mcss',//mcss模板文件
            targetPath: path.join(__dirname + '/mcss/' + fontName + '.mcss'),// '../../../src2/mcss/' + fontName + '.mcss',//The path where the (S)CSS file should be saved, relative to the path used in gulp.dest()//相对于formats文件所在目录
            //fontPath: '../fonts/',//未知用途
            cssClass: 'u-icon'
        }))
        .pipe(iconfont({
            fontName: fontName,
            prependUnicode: true,
            normalize: true,
            fontHeight: 1001,
            formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
            timestamp: Math.round(Date.now() / 1000)
        }))
        .pipe(gulp.dest('../res/fonts/' + fontName + "/"));
});

gulp.task('icondemo', function () {
    let html = `<!DOCTYPE html>
 <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>图标字体示例</title>
        <link rel="stylesheet" href="/src/css/iconfont.css">
        <style type="text/css">
        .f-cb:after,.f-cbli li:after{display:block;clear:both;visibility:hidden;height:0;overflow:hidden;content:".";}
        .f-cb,.f-cbli li{zoom:1;}
        .icons { width: 100%; margin: 0 auto; }
        .icon { float: left; width: 33%; text-align: center; font-size: 16px;margin-top: 26px; }
        .icon .u-icon {font-size: 32px;}
        .icon-w { margin-top: 10px; }
        .icon-i { margin-top: 10px; }
        </style>
    </head>
    <body>
        <div class="icons">`
    fs.readdirSync('./fonts/iconfont/').forEach(function (file) {
        file = path.basename(file, '.svg');
        let iconhtml = `\n            <div class="icon">
                <p class="icon-w"><span class="u-icon u-icon-${file}"></span></p>
                <p class="icon-i">&lt;span class="u-icon u-icon-${file}"&gt;&lt;/span&gt;</p>
            </div>`
        html += iconhtml;
    });
    html += '\n       </div>';
    html += '\n   </body>';
    html += '\n</html>';

    fs.writeFileSync('../res/fonts/iconfont/demo.html', html, 'utf8');
});

// sprites
let spriteBase = path.join(__dirname, '/sprite');//用于创建雪碧图的各个图片存放位置目录，每一个雪碧图对应一个存放多个图片的文件夹folder
let imgBase = path.join(__dirname.replace("/src",""), '/res/img');//创建的雪碧图存放位置，比如/res/sprite/sprite1创建一个/res/img/sprite1.png雪碧图
let cssBase = path.join(__dirname, '/mcss/sprite');//使用雪碧图的mcss代码存放位置

let imageminOpts = [
    imagemin.gifsicle(),
    imagemin.jpegtran(),
    pngquant(),
    // imagemin.optipng(),
    imagemin.svgo()
]
// 根据某个目录下的所有PNG图片文件，生成对应的雪碧图
gulp.task('sprite', function () {
    let pattern = path.join(spriteBase + '/**/*/'); console.log("pattern:---", pattern);
    let folders = glob.sync(pattern); console.log("folders:---", folders);

    let tasks = folders.map(function (folder) {
        let rel = path.relative(spriteBase, folder);
        let outputImg = path.join(imgBase, rel, '..'); console.log("outputImg:---", outputImg);
        let outputCss = path.join(cssBase, rel, '..'); console.log("outputCss:---", outputCss);
        let basename = path.basename(folder); console.log("basename:---", basename);
        let imgUrl = '/' + path.relative(__dirname, outputImg).replace(/\\/g, '/'); console.log("imgUrl:---", imgUrl);//绝对目录转化为CSS里需要的相对目录
        let imgName = basename + '.png'; console.log("imgName:---", imgName);

        let spriteData = gulp.src(path.join(folder, '*.png'))
            .pipe(spritesmith({
                imgName: imgName,
                cssName: 'spr-' + basename + '.mcss',
                imgPath: imgUrl + '/' + imgName,
                cssTemplate: './src/sprite/css.template',
                cssOpts: {
                    'group': basename,
                    'random': +new Date()
                }
            }));

        let imgStream = spriteData.img
            .pipe(buffer())
            .pipe(imagemin(imageminOpts))
            .pipe(gulp.dest(outputImg))
            .pipe(debug({
                title: 'sprite[image]:'
            }));

        let cssStream = spriteData.css
            .pipe(gulp.dest(outputCss))
            .pipe(debug({
                title: 'sprite[css]:'
            }));

        return merge(imgStream, cssStream);
    });

    return merge(tasks);
});

let mcssSrc = ['./src/mcss/**/*.mcss', '!./src/mcss/**/_*.mcss'];
gulp.task('mcss-c', () => {
    return gulp.src(mcssSrc)
        .pipe(mcss())
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('mcss', ['mcss-c'], () => {
    gulp.watch(mcssSrc[0], ['mcss-c']);
});