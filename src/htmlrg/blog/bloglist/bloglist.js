define(["text!m/blog/bloglist/bloglist.html", "actions","m/blog/bloglist/edit"], function (tpl, actions,edit){
    return Regular.extend({
        name:"bloglist",
        template: tpl,
        data: {
            blog: {}
        },
        config: function (data) {
        },
        init: function () {
            actions.getBlogList({});
            actions.getBlogTagList({});
        },
        onToEdit: function () {
            actions.showBlogEdit();
            //actions.blogTagsChange(2);
        }
        
    });
});