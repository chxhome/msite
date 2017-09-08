define(["text!m/blog/taglist/taglist.html", "actions", "m/blog/taglist/edit"], function (tpl, actions, edit){
    return Regular.extend({
        name:"taglist",
        template: tpl,
        data: {
            blogs: [],
            tags:[]
        },
        config: function (data) {

        },
        init: function () {
            actions.getTagList({});
        },
        onToEdit: function () {
            actions.showTagEdit();
        }
    });
});