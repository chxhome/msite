/*
 * -------------------------------------------------------
 * 工单操作
 * @version  1.1
 * @author   fangbo(hzfangbo@corp.netease.com)
 * @date     2015/11/29
 * @update
 * -------------------------------------------------------
 */

NEJ.define([
    'base/klass',
    'base/util',
    'base/event',
    'pro/cache/cache',
    'util/event/event',
    'util/cache/cookie'
], function (k, u, v, t, event, c, p, pro) {
    p._$$Cache = k._$klass();
    pro = p._$$Cache._$extend(t._$$Cache);


    /*
    * 工单修改
    */
    pro._$sheetModify = function(data){
        this.__doSendRequest('sheet-modify',{
            data: data
        })
    }


    pro.__doAddItem = function(options){
        this.__doSendRequest('sheet-add', options)
    }

    pro._$blogList = function (data) {
        this.__doSendRequest({
            method: 'GET',
            url: '/blog/getBlogList',
            format: function (json) {
                //console.log(json);
            }, data: data,
            onload: "cbBlogList"
        });
    };
    pro._$saveBlog = function (data) {
        this.__doSendRequest({
            method: 'POST',
            url: '/blog/saveBlog',
            format: function (json) {
                //console.log(json);
            }, data: data,
            onload: "cbSaveBlog"
        });
    };

    pro._$tagList = function (data) {
        this.__doSendRequest({
            method: 'GET',
            url: '/blog/getTagList',
            format: function (json) {
                //console.log(json);
            }, data: data,
            onload:"cbTagList"
        });
    };
    
    pro._$saveTag = function (data) {
        this.__doSendRequest({
            method: 'POST',
            url: '/blog/saveTag',
            format: function (json) {
                //console.log(json);
            }, data: data,
            onload: "cbSaveTag"
        });
    };


    event._$$CustomEvent._$allocate({
        element: p._$$Cache,
        event: [
            'listchange',
            'onlistloaderror',
            'worksheetlistload'
        ]
    });

    /**
     * do cache sync method
     * @param func
     * @private
     */
    p._$do = t._$do._$bind(
        null, p._$$Cache
    );
    return p;

});