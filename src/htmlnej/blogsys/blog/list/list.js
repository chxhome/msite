/*
 * 工单中心-首页
 *
 * Auto build by NEI Builder
 */
NEJ.define([
    'base/klass',
    'base/event',
    'base/element',
    'base/util',
    'util/template/tpl',
    'util/template/jst',
    'pro/module',
    'pro/blog/cache'
], function (k, v, e, u,tpl,jst, t,cache, p, pro, Module) {
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
        this.__body = e._$html2node(
            tpl._$getTextTemplate('blog-list')
        );
        this.__super();
        var _nodes = e._$getByClassName(this.__body, 'j-flag'); 

        this.__ntag = _nodes[1];
        this.__nlist = _nodes[0];
        this.__export = {//这里对应 config.json 里面配置的composite里的两个组件KEY
            tag: this.__ntag,
            list: this.__nlist
        };
        console.log("list___doBuild");
    };
    /**
     * 模块显示
     * @param options
     * @private
     */
    pro.__onShow = function (options) {
        this.__super(options);
        //e._$renderHtmlTemplate(this.nList, 'tpl-list', {});
        //jst._$render(this.nList, 'tpl-list', {});
        console.log("list__onShow");
    };
    /**
     * 刷新模块
     * @param options
     * @private
     */
    pro.__onRefresh = function (options) {
        this.__super(options);
        console.log("list__onRefresh");
    };
    /**
     * 隐藏模块
     * @private
     */
    pro.__onHide = function () {
        this.__super();
        console.log("list__onHide");
    };
    // regist module
    t._$regist('blog-list', Module); //t._$regist('blog-blog', Module);
});