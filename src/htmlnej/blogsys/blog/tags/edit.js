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

    pro.onNameInput = function (e) {

    };
    pro.onSave = function (e) {
        console.log(e);
        this.__cache._$saveTag({
            name: this.nTagName.value
        });
    };
    pro.onSaveBack = function (result) {
        if (result.code == 200) {
            window.dispatcher._$redirect("/m/blog/tags/");
        } else {
            alert(result.msg);
        }
    };
    /**
     * 构建模块
     * @return {Void}
     */
    pro.__doBuild = function () {
        this.__body = e._$html2node(
            tpl._$getTextTemplate('blog-tagedit')
        );
        this.__cache = cache._$$Cache._$allocate({
            "cbSaveTag": this.onSaveBack._$bind(this)
        });

        var _nodes = e._$getByClassName(this.__body, 'j-form'); 
        this.nTagName = _nodes[0];
        this.nButton = _nodes[1];
        this.__super();
        this.__doInitDomEvent([
            [
                this.nTagName, "input", this.onNameInput._$bind(this)
            ],
            [
                this.nButton, "click", this.onSave._$bind(this)
            ]
        ]);
    };
    /**
     * 模块显示
     * @param options
     * @private
     */
    pro.__onShow = function (options) {
        //console.log(jst);
        this.__super(options);
        //e._$renderHtmlTemplate(this.nList, 'tpl-list', {});
        
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
    t._$regist('blog-tagedit', Module); //t._$regist('blog-blog', Module);


});