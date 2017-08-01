//测试集合-表
var config = require('../config');
var MongoClient = require('mongodb').MongoClient;

exports.findData = function (collectioname,where,set,callback) {
    //使用客户端连接数据，并指定完成时的回调方法
    MongoClient.connect(config.mongodbConnStr, function (err, db) {
        if (err) {
            console.log('Error:' + err);
            callback({ code: 500, msg: err.toString()});
            return;
        }
        //获得指定的集合 
        var collection = db.collection(collectioname);
        collection.find(where, set).toArray(function (err, result) {
            db.close();
            //如果存在错误
            if (err) {
                console.log('Error:' + err);
                callback({ code: 500, msg: err.toString() });
                return;
            }
            //调用传入的回调方法，将操作结果返回
            callback({ code: 200, data: result});
        });
    });
};