var tagdoc = {
    _id: 1,
    name: "",
    createtime:11111
};
var blogdoc = {
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

exports.insertTag = function (data, cb) {
    //data._id = "_id: db.sysids  .findAndModify({update: { $inc: { 'newid':1 } },query: { '_id':'blogtagid' },new:true}).newid";
    data._autoid = {
        colname: "sysids", autoidkey: "blogtagid", inckey:"newid",id:"_id"//配置自动递增
    };
    dbhelper.insertData("blogtags", data,cb);
};

exports.insertBlog = function (data, cb) {
    //data._id = "_id: db.sysids  .findAndModify({update: { $inc: { 'newid':1 } },query: { '_id':'blogtagid' },new:true}).newid";
    data._autoid = {
        autoidkey: "blogid", id: "_id"//配置自动递增
    };
    dbhelper.insertData("blogs", data, cb);
};

exports.findBlogs = function (cb) {
    dbhelper.findData("blogs", {}, {},cb);
};

