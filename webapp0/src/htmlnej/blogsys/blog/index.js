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

    pro.onTabClick = function (_event) {
        var nList = v._$getElement(_event, 'c:bloglist'),
            nTags = v._$getElement(_event, 'c:blogtags');
        for (var a = 0; a < this.nTabs.childNodes.length; a++) {
            if (this.nTabs.childNodes[a].nodeType === 1) {
                e._$delClassName(this.nTabs.childNodes[a], 'z-crt');
            }
            
        }
        if (nList) {
            e._$addClassName(nList, 'z-crt');
            if (window.location.hash.indexOf("/m/blog/list/" == -1)) {
                return;//window.dispatcher._$redirect("/m/blog/list/");
            }
            
        }

        if (nTags) {
            e._$addClassName(nTags, 'z-crt');
            if (window.location.hash.indexOf("/m/blog/tags/" == -1)) {
                return;//window.dispatcher._$redirect("/m/blog/tags/");
            }
            
        }
    };
    /**
     * 构建模块
     * @return {Void}
     */
    pro.__doBuild = function () {
        this.__body = e._$html2node(
            tpl._$getTextTemplate('blog-index')//这里也能访问的'blog-list'这个模板ID，说明放在全局的缓存里
        );
        this.__super();
        var _nodes = e._$getByClassName(this.__body, 'j-flag'); 
        this.__export = {
            parent: _nodes[0]
        };
        this.nTabs = e._$getByClassName(this.__body, 'm-tab')[0]; 
        v._$addEvent(this.nTabs, 'click', this.onTabClick._$bind(this));
        if (window.location.hash.indexOf("/m/blog/tags/") >= 0) {
            console.log(this.nTabs);
            var nlis = e._$getChildren(this.nTabs);
            e._$delClassName(nlis[0], 'z-crt');
            e._$addClassName(nlis[1], 'z-crt');
        }

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
    // regist module
    t._$regist('blog-index', Module);
});