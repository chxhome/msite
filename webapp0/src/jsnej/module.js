/*
 * 页面模块基类实现文件
 *
 */
NEJ.define([
    'base/klass',
    'base/element',
    'base/util',
    'base/event',
    'util/dispatcher/module'
],function(k, e, u, v, t, p, pro){
    /**
     * 页面模块基类，实现页面的通用逻辑
     *
     * @class   _$$Module
     * @extends util/dispatcher/module._$$ModuleAbstract
     * @param  {Object} options - 模块输入参数
     */
    p._$$Module = k._$klass();
    pro = p._$$Module._$extend(t._$$ModuleAbstract);
    /**
     * 构建模块
     * @return {Void}
     */
    pro.__doBuild = function(){
        this.__super();
    };

    /**
     * 模块初始化
     * @protected
     * @param  {Object} options - 输入参数信息
     * @return {Void}
     */
    pro.__init = function(options){
        this.__super(options);
    };
    /**
     * 刷新模块触发事件
     * @param  {Object} arg0 - 事件对象
     * @return {Void}
     */
    pro.__onRefresh = function(options) {
        this.__super(options);
    };
    /**
     * 显示模块触发事件
     * @param  {Object} arg0 - 事件对象
     * @return {Void}
     */
    pro.__onShow = function(options) {
        this.__super(options);
    };
    /**
     * 隐藏模块触发事件
     * @return {Void}
     */
    pro.__onHide = function(){
        this.__super();
    };
    // adapter regist api
    p._$regist = t._$regist._$bind(t);
});