var xlsx = require('node-xlsx');  
var fs = require('fs'); 
var dbdaily= require('../model/dbchx/daily');
var handler = require("../nsvr/handler");
var formidable = require("formidable");
var config = require("../config");
var myutil = require("../nsvr/myutil");
var util = require("util");
let splitRowByRN=function(row,cont){
    var arr=[];newrow=[];
    var rows=cont.split("\r\n");
    for(var c=0;c<rows.length;c++){
        var exec=/\d+/.exec(rows[c]);
        newrow=JSON.parse(JSON.stringify(row));
        if(exec){
            newrow[4]=exec[0];
            newrow[3]=exec.input.replace(newrow[4],"");
            arr.push(newrow);
        }
    }
    return arr;
};

exports.index = function (request, response, viewdata) {
    return "/index.html";
};

/*
*GET
*/
exports.getDailyList = function (request, response, viewdata) {
    //console.log(util.inspect(request));
    console.log(util.inspect(viewdata));
    if(request.method!="GET"){
        handler.responseErr(400,"method错误",response);
        return;
    }
    try {
        dbdaily.findDaily({},function (result) {
            handler.processAjax(request, response, result);
        });

    } catch (e) {
        handler.responseErr(500, e.message, request, response);
    }

};

let xlsRow2Param=function(row){
    var event=row.length>5?row[5]:"";
    var money=row.length>4?row[4]:0;
    var content=row.length>3?row[3]:"无";
    var time=row[0];
    var param={
        "userId" : 1,
        "accountId" : 1,
        "createTime" : time,
        "editTime" : time,
        "creator" : "admin",
        "money" : money,
        "time" : time,
        "place" : "无",
        "persons" : "无",
        "content" :content,
        "event" : event,
        "exptype" : 1,
        "importance" : 1
    };
    return param;
};

exports.getDaily = function (request, response,viewdata) {

    var id=viewdata.query["id"];
    if(!id){
        handler.responseErr(500, "参数错误", request, response);
        return;
    }
    try {
        dbdaily.findDaily({_id:id},function (result) {
            var re=(result&&result.length)?result[0]||{}
            handler.processAjax(request, response, re);
        });

    } catch (e) {
        handler.responseErr(500, e.message, request, response);
    }

};

exports.addDaily = function (request, response) {
    try {
        var form = new formidable.IncomingForm();
        form.parse(request, function (err, fields, files) {

            dbdaily.insertDaily({
                "userId" : fields["userId"]||1,
                "accountId" :fields["accountId"]||1,
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
        var form = new formidable.IncomingForm();
        form.parse(request, function (err, fields, files) {

            dbdaily.updateDaily(fields["id"],{
                "userId" : fields["userId"]||1,
                "accountId" : fields["accountId"]||1,
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
    var sheets=[],sheet=null,a,b,insetNum=0,data=[],row=[],params=[];
    try{
        var fileDir = config.docDir+"res";
        var form = new formidable.IncomingForm();
        form.uploadDir = fileDir + "/tmp";
        var fname="tmp"+(new Date()).getTime()+".xlsx";
        form.parse(request, function (err, fields, files) {
            console.log(err);//fs.renameSync(files.upload.path, fileDir + "/"+fname);
            //fs.renameSync(files.upload.path, fileDir + "/test.jpg");
        });
        
        form.on("file", function (field, file) {
            var filename=fileDir + "/"+fname;
            fs.renameSync(file.path, fileDir + "/"+fname);
            sheets = xlsx.parse(filename);  
            if(sheets.length){
                sheet=sheets[0];
                console.log("sheet.name:"+sheet.name+"\r\n");  
                data= sheet.data;
                for(b=0;b<data.length;b++){
                    if(b>0){
                        row=data[b];
                        if(row.length){
                            row[0]=myutil.xlsNumber2Date(row[0]).getTime();
                        }
                        if(row.length>3&&row[3]){
                            var cont=""+row[3];
                            var rows=splitRowByRN(row,cont);
                            for(var c=0;c<rows.length;c++){
                                var param=xlsRow2Param(rows[c]);
                                params.push(param);
                            }
                        }
                    }
                }
            }
            for(a=0;a<params.length;a++){
                dbdaily.insertDaily(params[a], function (result) {
                     console.log(JSON.stringify(param)+"\r\n");  
                     insetNum++;
                     if(insetNum>=params.length){
                        handler.processAjax(request, response, result);
                     }
                     
                 });
            }
        });
    }catch(e){
        console.log(e.message);
    }

};