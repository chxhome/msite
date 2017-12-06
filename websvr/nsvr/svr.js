var http = require("http"),
 router = require("./router");
exports.start = function (port) {
    http.createServer(function (request, response) {
    	//console.log(__dirname);
    	//var rrr=require("/root/git/msite/site/controller/test");
    	//console.log(rrr);
        router.route(request, response);

    }).listen(port);
    
    console.log("服务已启动，端口：" + port);
};
