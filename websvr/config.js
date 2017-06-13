﻿module.exports = {
    //网站所在的磁盘目录
    docDir: "/root/git/msite/site/",
    //网站默认的路由规则
    router: {
        "url": "{controller}/{action}/{id}/{page}",
        "default": { "controller": "home", "action": "index"}
    },
    //视图文件扩展名
    viewExdName: "html",
    //************以下配置信息一般不用用户修改***************************
    //静态文件所处的一级目录，处于这些目录下的文件，都视为静态文件，直接输出给用户
    staticDir: { "pages": true, "html": true, "res": true, "lib": true, "src": true, "static": true, "modules": true, "dev": true },
    //扩展名为以下文件，直接输出给用户，不需要经过模板引擎处理
    staticSrcTypes: {"jpg": 1, "jpeg": 1, "png": 1, "gif": 1, "ico": 1, "css": 1, "js": 1},
    //静态文件contentType
    mime:{
        "html": "text/html",
        "css": "text/css",
        "js": "application/x-javascript",
        "json": "application/json",
        "ico": "image/x-icon",
        "gif": "image/gif",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "png": "image/png",
        "pdf": "application/pdf",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml",
        ajax: "application/json"
    }
};
