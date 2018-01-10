var config = require("../config"),
path = require("path"),
util = require("util"),
myutil = require("./myutil");
	fs = require("fs"),
    Freemarker = require('freemarker.js');
var serverRespath = __dirname.replace("nsvr","");
var viewpathPrefix = serverRespath + "view/"
	//基本头信息
var commHeader = {"Server": "websvr1.0.1"};
var CACHE_TIME_YEAR = 60*60*24*365;
var CACHE_TIME_DAY = 60*60*24;
var CACHE_TIME_HOUE = 60*60;
var CACHE_TIME = 10;
var getController = function (router) {
    var controllerPath = serverRespath + "controller/" + router["controller"];
    controllerPath=controllerPath.replace(/\\/gi,"/");
    try{
        return require(controllerPath);
    }
    catch(e){
        console.log(">>>获取控制器失败：" + controllerPath+e.message);
    }
    return null;
};

var sendFileToClient=function(filePath, __response,_headers){
	fs.exists(filePath, function(exists){
		if(exists){
			var fileInfo = fs.statSync(filePath);
	        var lastModified = fileInfo.mtime.toUTCString();
			var stream = fs.createReadStream(filePath,{flags:"r",encoding:null});
		    stream.on("error", function() {
		        exports.responseErr(500, "服务器错误", __response);
		    });
		    var date = new Date();
			date.setTime(date.getTime() + CACHE_TIME * 1000);
		    var resHeader = myutil.extend({
		        "Expires":date.toUTCString(),
		        "Cache-Control":"max-age=" + CACHE_TIME,
		        "Last-Modified":lastModified

		    }, commHeader);
		    resHeader = myutil.extend(resHeader, _headers);
		    __response.writeHead(200, resHeader);
		    //返回文件内容
		    stream.pipe(__response);
	    }else{
 			exports.responseErr(400, "not find", __response);
	    }
	});
	
};

exports.process = function (router, request, response) {
    console.log(">>>handler.process router:");
    console.log(router);
    var pathname = router.pathname;
    var exdName = pathname.substring(pathname.lastIndexOf(".") + 1);
    //静态资源统一处理
    if (config.staticDir[router.controller] || config.staticSrcTypes[exdName]) {
        this.processStatic(router, request, response);
        return;
    }

    if (pathname.indexOf(".html") > 1) {
    	var realPath=config.docDir+pathname.substring(1);
	    sendFileToClient(realPath,response,{"Content-Type":"text/html;charset=utf-8"});
    }else{
    	//处理动态页面
    	this.processPage(router, request, response);
    }
    
};

//处理静态资源请求
exports.processStatic = function (router, __request, __response) {
	try{
		//console.log("processStatic");
		var pathname = router.pathname;
	    var filePath = config.docDir + pathname.substring(1);
	    console.log("静态文件路径：" + filePath);
	    var exdName = pathname.substring(pathname.lastIndexOf(".") + 1);
	    sendFileToClient(filePath,__response,{"Content-Type": config.mime[exdName]});
    
	}catch(e){
		this.responseErr(500, e.message, __response);
	}
    
};

exports.responseErr = function (code, msg, __response) {
    console.log(">>>" + msg);
    var resHeader = myutil.extend({
        "Content-Type": "text/html;charset=utf-8"
    }, commHeader);
    __response.writeHead(code, resHeader);
    __response.end(msg);
};
//处理动态页面请求
exports.processPage = function (router, __request, __response) {
	try{
		console.log("processPage"); console.log(router);
	    var controller = getController(router);
	    if (!controller) {
	        this.responseErr(500, "获取控制器失败", __response);
	        return;
	    }
	    var viewdata = myutil.extend({}, { params: router.params||{},query:router.query||{} });
	    var action = router["action"] || router["controller"];//如果没有ACTION，controller作为action名，这样可以实现根目录页面访问地址。
	
	    var actionFn = controller[action];
	    if (typeof actionFn !== "function") {
	        this.responseErr(404, "获取页面失败", __response);
	        return;
	    }
	    var _viewPath = actionFn(__request, __response, viewdata);//执行ACTION，没有返回视图文件，表示异步请求，在ACTION方法里输出json对象
	    if (!_viewPath) {
	       // __response.end();
	        return;//未指定视图文件，认为是异步请求
	    }
	    //当用户在action方法里直接返回带.html扩展名的文件时，不作为freemarker模板文件解析,直接输出静态文件
	    if (_viewPath.indexOf(".html") > 1) {
	        var viewRealPath = viewpathPrefix + router.controller + _viewPath;
	        console.log(">>>---"+viewRealPath);
	        sendFileToClient(viewRealPath,__response,{"Content-Type":"text/html;charset=utf-8"});
	    } else {
	        // 以下代码可以支持 freemarker视图文件，扩展名为config.viewExdName
	        var _viewRootPrefix = viewpathPrefix + router.controller;
	        var viewFilePath = _viewRootPrefix + _viewPath + "." + config.viewExdName;
	        console.log(">>>"+viewFilePath);
	        fs.exists(viewFilePath, function (exists) {
	            console.log("---"+exists);
	            if (exists) {
	                var fm = new Freemarker({
	                    viewRoot: _viewRootPrefix,
	                    options: {
	                        /** for fmpp */
	                    }
	                });
	                var fileInfo = fs.statSync(viewFilePath);
            		var lastModified = fileInfo.mtime.toUTCString();
	                //console.log(_viewPath + "." + config.viewExdName);
	                fm.render(_viewPath + "." + config.viewExdName, viewdata, function (err, html, output) {
	                    console.log(err);
	                    if (!err) {
	                    	var date = new Date();
                			date.setTime(date.getTime() + CACHE_TIME * 1000);
	                        var resHeader = myutil.extend({
	                            "Content-Type": "text/html;charset=utf-8",
	                            "Expires":date.toUTCString(),
	                            "Cache-Control":"max-age=" + CACHE_TIME,
	                            "Last-Modified":lastModified

	                        }, commHeader);
	                        __response.writeHead(200, resHeader);
	                        __response.end(html);
	                    }
	                });
	            } else {
	                exports.responseErr(400, "找不到视图文件", __response);
	                return;
	            }
	           
	        });
	       
	    }
    }catch(e){
    	this.responseErr(500, e.message, __response);
    }

};

//处理AJAX数据
exports.processAjax = function (__request,__response,data) {
	try{
	    var resHeader = myutil.extend({
	        "Content-Type": config.mime.ajax
	    }, commHeader);
	    __response.writeHead(200, resHeader);
	    __response.write(JSON.stringify(data));
	    __response.end();
    }catch(e){
    	this.responseErr(500, e.message, __response);
    }
};
