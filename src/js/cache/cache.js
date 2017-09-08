/*
 * 缓存基类实现文件
 *
 * Auto build by NEI Builder
 */
NEJ.define([
    'base/klass',
    'base/util',
    'util/ajax/xdr',
    'util/ajax/rest',
    'util/cache/abstract'
],function(k,u,j,jj,t, p,pro){
    // request config
    var config = {};
    /**
     * 缓存基类实现文件
     *
     * @class   _$$Cache
     * @extends util/cache/abstract._$$CacheListAbstract
     * @param  {Object} options - 模块输入参数
     */
    p._$$Cache = k._$klass();
    pro = p._$$Cache._$extend(t._$$CacheListAbstract);
    /**
     * 发送请求
     * @protected
     * @param  {String} key - 请求配置标识
     * @param  {Object} options - 请求信息
            method: 'GET',
            url: '/worksheet/api/count',
            format: function (json) {
                json.result = {
                    list: json.result || [],
                    total: json.total
                };
            },
            onload: function(result){
                var filterList = this._$getListInCache('filter-list');
                u._$forEach(filterList, function(filter){
                    u._$forEach(result.list, function(item){
                        if(filter.id == item.id){
                            filter.sheetCount = item.count;
                        }
                    })
                })
                v._$dispatchEvent(this.constructor, 'listchange', {
                    key: 'filter-list',
                    action: 'refresh'
                })
            },
            onerror: function(err){
                console.error('get worksheet count error');
            }
     * @return {Void}
     */
    pro.__doSendRequest = function(options){
        var conf = options;//config[key];
        // onerror event
        var onerror = function(error){

            error = error||{};

   //         // add http error catch
			//log._$error('httpRequestError', u._$merge({
			//	url  : conf.url
			//}, options, error));

            // check logout
            if (error.code==8005||error.code==8001){
                location.assign(
                    '/login?target='+
                    encodeURIComponent(location.href)
                );
                return;
            }
            var ret = !1,
                event = options.onerror||conf.onerror||'onerror';
            if (u._$isFunction(event)){
                ret = event.call(this,error,options);
            }
            if (!ret&&u._$isString(event)){
                this._$dispatchEvent(event,error,options);
            }
        };
        // onload event
        var onload = function (result) {
            //console.log(result);
            if (!!result&&u._$isFunction(conf.post)){
                conf.post.call(this,result);
            }
            if (!result||(''+result.code).indexOf('2')!==0){
                onerror.call(this,result);
                return;
            }
            if (u._$isFunction(conf.format)){
                conf.format.call(this,result,options);
            }
            // callback
            var callback = options.onload||conf.onload || 'onload';
            if (u._$isFunction(callback)){
                callback.call(this,result);
            }else if(u._$isString(callback)){
                this._$dispatchEvent(callback,result);
            }
            // finally action
            if (u._$isFunction(conf.finaly)){
                conf.finaly.call(this,options,result);
            }
        };
        // send request
        var set = {},
            token = !set.token?'':('?token='+set.token),
            opt = u._$merge({
                cookie:!0
            },options,{
                type:'json',
                method:conf.method||'POST',
                onload:onload._$bind(this),
                onerror:onerror._$bind(this)
            }),
            url = conf.url;
        if (url.indexOf('://')<0){
            url = (set.remoteRoot||'')+url+token;
        }
        !conf.rest ? j._$request(url,opt)
                   : jj._$request(url,opt);
    };
    /**
     * 取当前时间戳
     * @private
     */
    pro.__getNowTimeStamp = function(){
        return new Date(+new Date+((setting||{}).delta||0));
    };
    /**
     * 判断是否存在指定项
     * @param id
     * @private
     */
    pro._$hasItem = function(id){
        return !!this._$getItemInCache(id);
    };
    /**
     * 请求配置信息
     * @param  {Object} map - 配置映射关系
     * @return {Void}
     */
    p._$config = function(map){
        u._$forIn(map,function(value,key){
            if (typeof value==='string'){
                value = {url:value};
            }
            config[key] = value;
        });
    };
    /**
     * 合并请求配置信息
     * @param key
     * @param map
     * @private
     */
    p._$merge = function(key,map){
        var conf = config[key];
        if (!conf){
            config[key] = map;
        }else{
            config[key] = u._$merge(conf,map);
        }
    };
    /**
     * 取配置信息
     * @param key
     * @private
     */
    p._$getConfig = function(key){
        return config[key]||{};
    };
    /**
     * 执行缓存的同步方法
     * @param Klass
     * @param func
     * @private
     */
    p._$do = function(Klass,func){
        if (!u._$isFunction(func)){
            return;
        }
        var cache = Klass._$allocate(),
            ret = func.call(null,cache);
        cache._$recycle();
        return ret;
    };
});