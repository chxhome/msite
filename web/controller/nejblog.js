var dblog = require('../model/blog/daltags');
var handler = require("../nsvr/handler");
exports.index = function (request, response, viewdata) {
    return "/index.html";
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