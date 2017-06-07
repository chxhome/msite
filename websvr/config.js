module.exports = {
    exdName:"html",
    staticDir: { "pages": true, "html": true, "res": true, "lib": true, "src": true, "static": true, "modules": true, "dev": true },
    docDir: "E:/home/TestCodes/msite/site/",
    router: {
        "url": "{controller}/{action}/{id}/{page}",
        "default": { "controller": "home", "action": "index", "id": 1, "page": 1 }
    }
};
