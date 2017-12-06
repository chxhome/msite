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
            tpl._$getTextTemplate('blog-tags')
        );console.log(this.__body);
        this.__super();

        this.__cache = cache._$$Cache._$allocate({
            "cbTagList": this.cbTagList._$bind(this)
        });

        console.log("tag__doBuild");
        
    };
    pro.cbTagList=function(result) {
        console.log(result);
        jst._$render(this.__body, 'tpl-tags', { data: result.data });
    };
    /**
     * 模块显示
     * @param options
     * @private
     */
    pro.__onShow = function (options) {
        this.__super(options);

        this.__cache._$tagList({});
        console.log("tag__onShow");
    };
    /**
     * 刷新模块
     * @param options
     * @private
     */
    pro.__onRefresh = function (options) {
        this.__super(options);
        console.log("tag__onRefresh");
    };
    /**
     * 隐藏模块
     * @private
     */
    pro.__onHide = function () {
        this.__super();
        console.log("tag__onHide");
    };
    // regist module
    t._$regist('blog-tags', Module); //t._$regist('blog-blog', Module);
});