//测试集合-表
var config = require('../config');
var MongoClient = require('mongodb').MongoClient;

/*
collectioname:集合名，即表名:string
set:指定返回那些字段集合:{}
where：查询条件:{}
sortby：排序方式{colname:1升序|-1降序}
callback：查询完成后的回调函数:function
*/
exports.findData = function (collectioname, set, where, sortby, callback) {
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
        console.log("mongodb driver find(",where,",",set,")");
        collection.find(where, set).sort(sortby).toArray(function (err, result) {
            db.close();
            //如果存在错误
            if (err) {
                console.log('Error:' + err);
                callback({ code: 500, msg: err.toString() });
                return;
            }
            console.log("mongodb driver result:",result);
            //调用传入的回调方法，将操作结果返回
            callback({ code: 200, data: result});
        });
    });
};

/*
collectioname:集合名
data：插入集合的简单键值对对象
callback：插入成功后的回调函数
*/
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
        //配置了自定义递增方案
        if (data._autoid) {
            var inc = {};
            var inckey = data._autoid.inckey || "newid";
            var autoidcoll = data._autoid.autoidcoll || collectioname;
            var id = data._autoid.id || "_id";
            var incidscoll=data._autoid.incidscoll || "sysids";
            inc[inckey] = 1;
            db.collection(incidscoll).findAndModify(
                { _id: autoidcoll}, [], { $inc: inc }, { new: true }, function (err, result) {
                    if (err) {
                        console.log(err);
                        return cb(err);
                    }
                    //console.log('result111' + JSON.stringify(result));
                    data[id] = result.value[inckey];

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

/*
collectioname:集合名
where：作为条件的简单键值对对象
updatedata：修改集合的简单键值对对象
callback：插入成功后的回调函数
*/
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
        for (var k in updatedata) {
            if (where[k.toString()]) {
                delete updatedata[k.toString()];//删除包含在条件对象里的字段
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