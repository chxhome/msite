//var config = require("./core/config");//加载配置文件，进行初始化配置
//config.setConf("exdName","html");
//config.setConf("viewVPath","../template");
//config.port=1005;

var srv = require("./svr");
srv.start(800);
