'use strict';
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const merge = require('merge-stream');//用于合并多个控制流（任务流）Merges an arbitrary number of streams. Returns a merged stream.
const buffer = require('vinyl-buffer');//将vinyl对象内容中的stream转换为buffer；npm install --save-dev vinyl-buffer
const gulp = require('gulp');

const nsvr=require('./websvr/nsvr/svr');

gulp.task('server-run', [], () => {
    	process.exec("npm run nsvr",function(){

    	});
});

gulp.task('server', [], () => {
     gulp.watch(['./websvr/**/*.js'],['server-run']);
    
});
