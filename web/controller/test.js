var formidable = require("formidable");
var handler = require("../nsvr/handler");
//var m_mycol = require('../model/mycol');
exports.index = function (request, response, viewdata) {
    viewdata.title = "这是测试首页";
    return "/index";
};
exports.about = function (request, response, viewdata) {
    viewdata.title = "这是测试关于页面";
    return "/about";
};

exports.vuetest = function (request, response, viewdata) {
    return "/vuetest.html";
};

var fileDir = "../site/upfiles";
exports.upload = function (request, response, viewdata, params) {
    var form = new formidable.IncomingForm();
    form.uploadDir = fileDir + "/tmp";
    form.parse(request, function (err, fields, files) {
        //fs.renameSync(files.upload.path, fileDir + "/test.jpg");
    });
    form.on("file", function (field, file) {
        fs.renameSync(file.path, fileDir + "/test.jpg");
        response.$redirect('/test/about');
    });

};

exports.getUser = function (request, response, viewdata) {
    var data = {
        code: 200, msg: '获取用户信息成功', data: { userId: 111, userName: "chx", realName: "陈焕许" }
    };
    handler.processAjax(request,response, data);
};

var MongoClient = require('mongodb').MongoClient;



exports.getUserList = function (request, response, viewdata) {
    var data = {
        code: 200, msg: '获取用户信息成功', data: { userId: 111, userName: "chx", realName: "陈焕许" }
    };
   try{
   	// m_mycol.findData(function (result) {
    //    data.data = result;
    //    handler.processAjax(request,response, data);
    //});
   
   }catch(e){
   	 handler.responseErr(500, e.message, request, response);
   }
   
};

exports.addUser = function (request, response, viewdata) {
    var params = viewdata.params;
    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {

        var data = {
            code: 200, msg: '添加用户信息成功', data: { userId: 111, userName: "chx", realName: "陈焕许" }
        };
        for (var k in fields) {
            data.data[k.toString()] = fields[k.toString()];
        }
        for (var k in params) {
            data.data[k.toString()] = params[k.toString()];
        }
        handler.processAjax(request,response, data);

    });
};