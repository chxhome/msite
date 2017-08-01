var doc = {
    _id: 1,
    title: "",//标题
    cont: "",//内容
    sendtime: (new Date()).getTime(),//发布时间
    editime:0,//最后修改时间
    readcount: 0,//阅读次数
    msgcount: 0,//留言个数
    userid: 0,
    username: "",
    nickname:""
};
var dbhelper = require('../../dbdriver/mongodb');

exports.findTags = function (cb) {
    dbhelper.findData("blogtags", {}, {},cb);
};