define(["store", "m/blog/app"], function (store,App) {
    var app = new App();
    app.$inject('#app');
    app.data.state = store.getState();
    app.$update();
    store.subscribe(function () {
        if (store.getState()) {
            app.data.state = store.getState();
            app.$update();
        }
    });
});