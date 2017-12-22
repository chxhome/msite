var xlsx = require('node-xlsx');  
var fs = require('fs'); 
var dbdaily= require('../model/dbchx/daily');
var handler = require("../nsvr/handler");
var formidable = require("formidable");
var config = require("../config");
exports.index = function (request, response, viewdata) {
    return "/index.html";
};

exports.getDailyList = function (request, response, viewdata) {

    try {
        dbdaily.findDaily(function (result) {
            handler.processAjax(request, response, result);
        });

    } catch (e) {
        handler.responseErr(500, e.message, request, response);
    }

};



exports.addDaily = function (request, response, viewdata) {
    try {
        var params = viewdata.params;
        var form = new formidable.IncomingForm();
        form.parse(request, function (err, fields, files) {

            dbdaily.insertDaily({
                "userId" : 0,
                "accountId" : 0,
                "createTime" : (new Date()).getTime(),
                "editTime" : (new Date()).getTime(),
                "creator" : "admin",
                "money" : fields["money"],
                "time" : fields["time"],
                "place" : fields["place"],
                "persons" : fields["persons"],
                "content" : fields["content"],
                "event" : fields["event"],
                "exptype" : fields["exptype"],
                "importance" : fields["importance"]
            }, function (result) {
                handler.processAjax(request, response, result);
            });

        });
    } catch (e) {
        handler.responseErr(500, e.message, request, response);
    }
};

exports.updateDaily = function (request, response, viewdata) {
    try {
        var params = viewdata.params;
        var form = new formidable.IncomingForm();
        form.parse(request, function (err, fields, files) {

            dbdaily.updateDaily(fields["id"],{
                "userId" : 0,
                "accountId" : 0,
                "createTime" : (new Date()).getTime(),
                "editTime" : (new Date()).getTime(),
                "creator" : "admin",
                "money" : fields["money"],
                "time" : fields["time"],
                "place" : fields["place"],
                "persons" : fields["persons"],
                "content" : fields["content"],
                "event" : fields["event"],
                "exptype" : fields["exptype"],
                "importance" : fields["importance"]
            }, function (result) {
                handler.processAjax(request, response, result);
            });

        });
    } catch (e) {
        handler.responseErr(500, e.message, request, response);
    }
};

exports.importDaily = function (request, response, viewdata) {
    console.log("importDaily");
    try{
        var fileDir = config.docDir+"res";
        var form = new formidable.IncomingForm();
        form.uploadDir = fileDir + "/tmp";
        var fname="tmp"+(new Date()).getTime()+".xlsx";
        form.parse(request, function (err, fields, files) {
            console.log(err);//fs.renameSync(files.upload.path, fileDir + "/"+fname);
            //fs.renameSync(files.upload.path, fileDir + "/test.jpg");
        });console.log("importDaily111");
        
        form.on("file", function (field, file) {console.log("importDaily222");
            var filename=fileDir + "/"+fname;
            fs.renameSync(file.path, fileDir + "/"+fname);
            //response.$redirect('/test/about');
            var obj = xlsx.parse(filename);  
            console.log(JSON.stringify(obj));  
        });
    }catch(e){
        console.log(e.message);
    }

};