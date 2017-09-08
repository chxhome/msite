define(["text!m/blog/taglist/edit.html", "actions"], function (tpl, actions){
    return Regular.extend({
        name: "tagedit",
        template: tpl,
        data: {
           
        },
        config: function (data) {
            
        },
        init: function () {
            
        },
        onSave: function () {
            actions.saveTag({
                name: this.data.name
                });
        }
    });
});