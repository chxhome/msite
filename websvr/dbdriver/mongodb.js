//测试集合-表
var config = require('../config');
var MongoClient = require('mongodb').MongoClient;

/*
collectioname:集合名，即表名
where：查询条件
set:指定返回那些字段集合
sortby：排序方式
callback：查询完成后的回调函数
*/
exports.findData = function (collectioname, where, set, sortby, callback) {
    if (typeof sortby === "function") {
        callback = sortby;
        sortby = {_id:-1};
    }
    //使用客户端连接数据，并指定完成时的回调方法
    MongoClient.connect(config.mongodbConnStr, function (err, db) {
        if (err) {
            console.log('Error:' + err);
            callback({ code: 500, msg: err.toString()});
            return;
        }
        //获得指定的集合 
        var collection = db.collection(collectioname);
        collection.find(where, set).sort(sortby).toArray(function (err, result) {
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

exports.insertData = function (collectioname, data, callback) {
    //使用客户端连接数据，并指定完成时的回调方法
    MongoClient.connect(config.mongodbConnStr, function (err, db) {
        if (err) {
            console.log('Error:' + err);
            callback({ code: 500, msg: err.toString() });
            return;
        }
        //获得指定的集合 
        var collection = db.collection(collectioname);
        if (data._autoid) {
            var inc = {};
            var inckey = data._autoid.inckey || "newid";
            inc[inckey] = 1;
            db.collection(data._autoid.colname||'sysids').findAndModify(
                { _id: data._autoid.autoidkey || 'blogtagid' }, [], { $inc: inc }, { new: true }, function (err, result) {
                    if (err) {
                        console.log(err);
                        return cb(err);
                    }
                    //console.log('result111' + JSON.stringify(result));
                    data[data._autoid.id || "_id"] = result.value[inckey];

                    delete data._autoid;
                    collection.insert(data, function (err, result) {
                        db.close();
                        if (err) {
                            console.log('Error:' + err);
                            callback({ code: 500, msg: err.toString() });
                            return;
                        }
                        //调用传入的回调方法，将操作结果返回
                        callback({ code: 200, data: result });
                    });

                });
        } else {
            collection.insert(data, function (err, result) {
                db.close();
                if (err) {
                    console.log('Error:' + err);
                    callback({ code: 500, msg: err.toString() });
                    return;
                }
                //调用传入的回调方法，将操作结果返回
                callback({ code: 200, data: result });
            });
        }

    });
};

exports.updateData = function (collectioname, where, updatedata, callback) {
    //使用客户端连接数据，并指定完成时的回调方法
    MongoClient.connect(config.mongodbConnStr, function (err, db) {
        if (err) {
            console.log('Error:' + err);
            callback({ code: 500, msg: err.toString() });
            return;
        }
        //获得指定的集合 
        var collection = db.collection(collectioname);

        //更新数据
        //var where = { "id": 111 };
        //data={name:"aaaaaaaa",id:111,age:12}
        for (var k in data) {
            if (where[k.toString()]) {
                delete data[k.toString()];//删除条件字段
            }
        }
        collection.update(where, {$set: updatedata}, function (err, result) {
            db.close();
            if (err) {
                console.log('Error:' + err);
                callback({ code: 500, msg: err.toString() });
                return;
            }
            //调用传入的回调方法，将操作结果返回
            callback({ code: 200, data: result });
        });


    });
};