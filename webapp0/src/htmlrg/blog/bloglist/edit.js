define(["text!m/blog/bloglist/edit.html", "actions"], function (tpl, actions){
    return Regular.extend({
        name: "blogedit",
        template: tpl,
        data: {
           
        },
        config: function (data) {
            
        },
        init: function () {
            
        },
        onSave: function () {
            actions.saveBlog({
                title: this.data.title,
                content: this.data.content
                });
        }
    });
});