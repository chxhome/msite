define(["redux", "store", "reducers/reducerNames"], function (Redux,store,names) {
    var actions= {
        blogTagsChange: function (v, a) {
            return {
                type: names.BlogTagsChange,
                data: v
            }
        },
        getBlogList: function (params) {
            return function (dispatch, getSatate) {
                $.ajax({
                    url: '/blog/getBlogList',
                    data: {},
                    success: function (data) {
                        dispatch({
                            type: names.LoadBlogList,
                            data: data.data
                        });
                    }
                });
            }
            
        },
        getBlogTagList: function (params) {
            return function (dispatch) {
                $.ajax({
                    url: '/blog/getTagList',
                    data: {},
                    success: function (data) {
                        dispatch({
                            type: names.LoadBlogTagList,
                            data: data.data
                        });
                    }
                });
            }

        },

        getTagList: function (params) {

            return function (dispatch) {
                $.ajax({
                    url: '/blog/getTagList',
                    data: {},
                    success: function (data) {
                        dispatch({
                            type: names.LoadTagList,
                            data: data.data
                        });
                    }
                });
            }

        },
        saveBlog: function (params) {

            return function (dispatch) {
                $.ajax({
                    url: '/blog/saveBlog',
                    data: params,
                    type:"POST",
                    success: function (data) {
                        console.log(data);
                        dispatch(actions.getBlogList());
                        dispatch(actions.showBlogList());
                    }
                });
            }

        },
        saveTag: function (params) {

            return function (dispatch) {
                $.ajax({
                    url: '/blog/saveTag',
                    data: params,
                    type: "POST",
                    success: function (data) {
                        console.log(data);
                        dispatch(actions.getTagList());
                        dispatch(actions.showTagList());
                    }
                });
            }

        },
        showBlogEdit: function () {
            return {
                type: names.ShowBlogEdit
            };
        },
        showBlogList: function () {
            return {
                type: names.ShowBlogList
            };
        },
        showTagEdit: function () {
            return {
                type: names.ShowTagEdit
            };
        },
        showTagList: function () {
            return {
                type: names.ShowTagList
            };
        }, setTitle: function (title) {
            return {
                type:names.SetTitle,
                data: title
            };
        }
    };
    //bindActionCreators() 可以自动把多个 action 创建函数 绑定到 store.dispatch() 方法上。
    return Redux.bindActionCreators(actions, store.dispatch);

});