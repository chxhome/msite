//根据分隔符从字符串创建数组
exports.getArr = function (arrStr, s) {
    var pathArr = [arrStr];
    if (arrStr.indexOf(s) >= 0) {
        pathArr = arrStr.split(s);
    }

    return pathArr;
};

//简单的对象属性扩展
exports.extend = function (srcObj,exdObj) {
    if (!srcObj) { srcObj = {}; }
    if (!exdObj) { exdObj = {};}
    for (var a in exdObj) {
        srcObj[a.toString()] = exdObj[a.toString()];
    }
    return srcObj;
};

exports.xlsNumber2Date=function(num){
        num=+num;
        var date=new Date(1900,0,0);
        date=new Date(date.getTime()+num*24*60*60*1000);
        return date;
}
