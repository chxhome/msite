﻿var url = require("url");
var util = require("util");
var config = require("./config");
var myutil = require("./myutil");
var handler = require("./handler");

//将路由配置转化为数组元素
var getRouterArr = function () {
    var _rArr = myutil.getArr(config.router.url, "/");
    if (_rArr[0] == "") {
        _rArr = _rArr.slice(1);
    }
    var _routerArr = [];
    for (var a = 0; a < _rArr.length; a++) {
        _routerArr.push(_rArr[a].substring(1, _rArr[a].length - 1));
    }

    return _routerArr;
};

var extendResponse = function (response) {
    response.$redirect = function (url) {
        this.writeHead(302, { 'Location': url });
        this.end();
    }
}

exports.route = function (request, response) {
    extendResponse(response);

    console.log(util.inspect(response));
    var _urlObj = url.parse(request.url);
    var _pathArr = [];
    var _router = { controller: "home", action: "index", "pathname": _urlObj.pathname };
    if (_urlObj.pathname.length > 1) {
        _pathArr = myutil.getArr(_urlObj.pathname,"/");
        if (_pathArr[0] == "") {
            _pathArr = _pathArr.slice(1);
        }
        _router.controller = _pathArr[0];
        if (_pathArr.length > 1) {
            _router.action = _pathArr[1];
        }
        if (_pathArr.length > 2) {
            //第三个元素开始是参数
            _router.params = {};
            var _routerArr = getRouterArr();
            for (var i = 2; i < _pathArr.length; i++) {
                if (_routerArr.length > i) {
                    _router.params[_routerArr[i]] = _pathArr[i];//根据路由配置，创建参数数据
                }
            }

        }
    }
    handler.process(_router, request, response);
};
