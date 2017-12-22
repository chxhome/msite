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
    	var _this=this;
			fs.readFile(config.docDir+pathname.substring(1), function(err, data) {
				if(err){
					//处理动态页面
				    _this.processPage(router, request, response);
				}else{
					var resHeader = myutil.extend({
	               		 "Content-Type": "text/html charset=UTF-8"
		            }, commHeader);
		            console.log(resHeader);
		            response.writeHead(200, resHeader);
		            response.end(data);
				}
	            
	        });

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
        fs.readFile(filePath, function (err, data) {
            if (err) {
                exports.responseErr(404, "not find", __request, __response);
                return;
            }
	        var exdName = pathname.substring(pathname.lastIndexOf(".") + 1);
	        console.log(exdName);
	        var resHeader = myutil.extend({
	            "Content-Type": config.mime[exdName]//根据扩展名，设置header的输出文件类型
	        }, commHeader);
	        __response.writeHead(200, resHeader);
	        __response.end(data);
	    });
	}catch(e){
		this.responseErr(500, e.message, __request, __response);
	}
    
};

exports.responseErr = function (code, msg, __request, __response) {
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
		console.log("processPage");
	    var controller = getController(router);
	    if (!controller) {
	        this.responseErr(500, "获取控制器失败", __request, __response);
	        return;
	    }
	    var viewdata = myutil.extend({}, { params: router.params });
	    var action = router["action"] || router["controller"];//如果没有ACTION，controller作为action名，这样可以实现根目录页面访问地址。
	
	    var actionFn = controller[action];
	    if (typeof actionFn !== "function") {
	        this.responseErr(404, "获取页面失败", __request, __response);
	        return;
	    }
	    var _viewPath = actionFn(__request, __response, viewdata);
	    if (!_viewPath) {
	       // __response.end();
	        return;//未指定视图文件，有可能是异步请求
	    }
	    //当用户在action方法里直接返回带.html扩展名的文件时，不作为freemarker模板文件解析
	    if (_viewPath.indexOf(".html") > 1) {
	        var viewRealPath = viewpathPrefix + router.controller + _viewPath;
	        console.log(">>>---"+viewRealPath);
	        fs.readFile(viewRealPath, function(err, data) {
	            var resHeader = myutil.extend({
	                "Content-Type": "text/html charset=UTF-8"
	            }, commHeader);
	            console.log(resHeader);
	            __response.writeHead(200, resHeader);
	            __response.end(data);
	        });
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
	                //console.log(_viewPath + "." + config.viewExdName);
	                fm.render(_viewPath + "." + config.viewExdName, viewdata, function (err, html, output) {
	                    console.log(err);
	                    if (!err) {
	                        var resHeader = myutil.extend({
	                            "Content-Type": "text/html;charset=utf-8"
	                        }, commHeader);
	                        __response.writeHead(200, resHeader);
	                        __response.end(html);
	                    }
	                });
	            } else {
	                exports.responseErr(500, "找不到视图文件", __request, __response);
	                return;
	            }
	           
	        })
	       
	    }
    }catch(e){
    	this.responseErr(500, e.message, __request, __response);
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
    	this.responseErr(500, e.message, __request, __response);
    }
};
