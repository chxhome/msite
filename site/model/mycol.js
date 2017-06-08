//测试集合-表
var config = require('../config');
var MongoClient = require('mongodb').MongoClient;
//定义函数表达式，用于操作数据库并返回结果
var _findData = function (db, callback) {
    //获得指定的集合 
    var collection = db.collection('mycol');
    //要查询数据的条件，_id<=10的用户
    var where = { _id: { "$lte": 10 } };
    //要显示的字段
    var set = { name: 1, age: 1 };
    collection.find(where, set).toArray(function (err, result) {
        //如果存在错误
        if (err) {
            console.log('Error:' + err);
            return;
        }
        //调用传入的回调方法，将操作结果返回
        callback(result);
    });
};

exports.findData = function (callback) {
    //使用客户端连接数据，并指定完成时的回调方法
    MongoClient.connect(config.DB_CONN_STR, function (err, db) {
        console.log("连接成功！");
        _findData(db, function (result) {
            //关闭数据库
            db.close();
            //显示结果
            console.log(result);
            callback(result);
        });
    });
};
