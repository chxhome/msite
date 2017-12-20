var dbdaily= require('../model/dbchx/daily');
var handler = require("../nsvr/handler");
var formidable = require("formidable");

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