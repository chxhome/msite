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
        incidscoll: "sysids",//各个集合递增字段的最新值存在于这个系统集合，可省略
         autoidcoll: "blogtags",//在系统集合里主键--其值用于确定newid的值是哪个集合的递增字段的值,可省略，因为跟集合名一样
          inckey:"newid",//系统集合里保存其它集合递增字段最新值的字段，可省略
          id:"_id"//其他集合里被配置为自定义递增的字段
    };
    dbhelper.insertData("blogtags", data,cb);
};

exports.insertBlog = function (data, cb) {
    //data._id = "_id: db.sysids  .findAndModify({update: { $inc: { 'newid':1 } },query: { '_id':'blogtagid' },new:true}).newid";
    data._autoid = {
        autoidcoll: "blogs", //在系统集合里主键--其值用于确定newid的值是哪个集合的递增字段的值,可省略，因为跟集合名一样
        id: "_id"//其他集合里被配置为自定义递增的字段,一般也是_id 可省略
    };
    dbhelper.insertData("blogs", data, cb);
};

exports.findBlogs = function (cb) {
    dbhelper.findData("blogs", {}, {},cb);
};

