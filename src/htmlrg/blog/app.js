define(["text!m/blog/app.html"
    , "c/tab/tab"
    , "actions"
    , "m/blog/bloglist/bloglist",
    , "m/blog/taglist/taglist"
], function (tpl, tab, actions, bloglist, taglist) {
    var App = Regular.extend({
        template: tpl,
        data: {
            state: {}
        },

        config: function (data) {
            //console.log(this.data);
        },
        onTabChange: function (v) {
            //console.log(actions);
            actions.blogTagsChange(v);
        },
        init: function () {
             window.setTimeout(function () {
                actions.setTitle("aaaaaaaaaaaaaaaaa");
            }, 1000);
        }
    });

    return App;

});