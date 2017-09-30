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
    'pro/module'
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
     * 构建--构建模块结构，缓存模块需要使用的节点，初始化组合控件的配置参数
     * @return {Void}
     */
    pro.__doBuild = function () {
       // console.log(tpl);
        this.__super();
        this.__body = e._$html2node(
            tpl._$getTextTemplate('blog-sys')//显示时，用到__body
        );
        var _nodes = e._$getByClassName(this.__body, 'j-flag');// console.log(_nodes);
        this.__export = {
            parent: _nodes[1]//子模块的容器，这个非常重要
        };
    };
    /**
     * 显示--将模块放置到指定的容器中，分配组合控件，添加相关事件，执行__onRefresh的业务逻辑
     * @param options
     * @private
     */
    pro.__onShow = function (options) {
        this.__super(options);
    };
    /**
     * 刷新--根据外界输入的参数信息获取数据并展示（这里主要做数据处理）
     * @param options
     * @private
     */
    pro.__onRefresh = function (options) {
        this.__super(options);
    };
    /**
     * 隐藏--模块放至内存中，回收在__onShow中分配的组合控件和添加的事件，回收__onRefresh中产生的视图（这里尽量保证执行完成后恢复到__doBuild后的状态）
     * @private
     */
    pro.__onHide = function () {
        this.__super();
    };
    /**
     * 获取容器节点,整个单页应用模块的终极父容器
     * @return {Void}
     */
    pro.__doParseParent = function (options) {
        return e._$get('blog-module');
    };
    // regist module
    t._$regist('blog-sys', Module);
});