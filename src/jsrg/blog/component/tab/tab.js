define(["text!c/tab/tab.html"], function (tpl) {
    var App = Regular.extend({
        name:"tab",
        template: tpl,
        data: {
            tabIndex:1
        },

        config: function () {

        },

        init: function () {

        },
        onChange: function (v) {
            this.data.tabIndex = v;//像这种与业务无关的局部数据修改，就不用通过store统一处理
            this.$emit("change",v);
        }
    });

    return App;

});