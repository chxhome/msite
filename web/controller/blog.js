var dblog = require('../model/blog/daltags');
var handler = require("../nsvr/handler");
var formidable = require("formidable");

exports.index = function (request, response, viewdata) {
    return "/index.html";
};

exports.nejindex = function (request, response, viewdata) {
    return "/nejindex.html";
};

exports.rgindex = function (request, response, viewdata) {
    return "/rgindex.html";
};

exports.getTagList = function (request, response, viewdata) {

    try {
        dblog.findTags(function (result) {
            handler.processAjax(request, response, result);
        });

    } catch (e) {
        handler.responseErr(500, e.message, request, response);
    }

};


exports.saveTag = function (request, response, viewdata) {
    try {
        var params = viewdata.params;
        var form = new formidable.IncomingForm();
        form.parse(request, function (err, fields, files) {

            dblog.insertTag({ name: fields["name"] }, function (result) {
                handler.processAjax(request, response, result);
            });

        });
    } catch (e) {
        handler.responseErr(500, e.message, request, response);
    }
};

exports.getBlogList = function (request, response, viewdata) {

    try {
        dblog.findBlogs(function (result) {
            handler.processAjax(request, response, result);
        });

    } catch (e) {
        handler.responseErr(500, e.message, request, response);
    }

};


exports.saveBlog = function (request, response, viewdata) {
    try {
        var params = viewdata.params;
        var form = new formidable.IncomingForm();
        form.parse(request, function (err, fields, files) {

            dblog.insertBlog({
                title: fields["title"]
                , name: fields["content"]
                , readcount: 1
                , msgcount: 0
                , userid: 0
                , username: "admin"
                , nickname: "chx"
                , sendtime: (new Date()).getTime()
                ,editime: (new Date()).getTime()
            }, function (result) {
                handler.processAjax(request, response, result);
            });

        });
    } catch (e) {
        handler.responseErr(500, e.message, request, response);
    }
};