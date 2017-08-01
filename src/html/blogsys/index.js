/*
 * 工单中心-首页
 *
 * Auto build by NEI Builder
 */
NEJ.define([
    'base/klass',
    'base/event',
    'base/element',
    'util/template/tpl',
    'pro/blog/module'
], function (k, v, e, tpl, t, p, pro, Module) {
    /**
     * 当前会话布局模块
     *
     * @class   _$$Module
     * @extends pro/kefu/module._$$Module
     * @param  {Object} options - 模块输入参数
     */
    Module = k._$klass();
    pro = Module._$extend(t._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    pro.__doBuild = function () {
        this.__super();
        this.__body = e._$html2node(
            tpl._$getTextTemplate('blog-sys')
        );
        var _nodes = e._$getByClassName(this.__body, 'j-flag'); console.log(_nodes);
        this.__export = {
            parent: _nodes[1]//子模块的容器，这个非常重要
        };
    };
    /**
     * 模块显示
     * @param options
     * @private
     */
    pro.__onShow = function (options) {
        this.__super(options);
    };
    /**
     * 刷新模块
     * @param options
     * @private
     */
    pro.__onRefresh = function (options) {
        this.__super(options);
    };
    /**
     * 隐藏模块
     * @private
     */
    pro.__onHide = function () {
        this.__super();
    };
    /**
     * 获取容器节点
     * @return {Void}
     */
    pro.__doParseParent = function (options) {
        return e._$get('blog-module');
    };
    // regist module
    t._$regist('blog-sys', Module);
});