//是一个能够根据传入的state, action返回新STATE的函数，返回STATE前，经历许多业务处理
define(["redux","reducers/blogReducers", "reducers/blogblogReducers", "reducers/blogtagReducers", "reducers/blogpropsReducers"]
    , function (Redux, blogReducers, blogblogReducers, blogtagReducers, blogpropsReducers) {
    //var _reducers = {
    //    BlogTagsChange: function (state, action) {
    //        switch (action.type) {
    //            case 'BlogTagsChange':
    //                if (action.data == 1) {
    //                    state.blog.showBlogs = true;
    //                    state.blog.showTags = false;
    //                } else {
    //                    state.blog.showBlogs = false;
    //                    state.blog.showTags = true;
    //                }
    //                return state;
    //            default:
    //                return state;
    //        }
    //    }
    //};
    //return function (state, action) {
    //    if (_reducers[action.type]) {
    //        return _reducers[action.type](state, action);
    //    }
    //    return state;

    //};

    var _setting = function (state, action) {
        if (!state) {
            state = {};
        }
        switch (action.type) {
            case 'ShowAccount':
                var _state = Object.assign({}, state);
                _state.showAccount = action.data;
                return _state;
            case 'SetTitle':
                var _state = Object.assign({}, state);
                _state.title = action.data+"1111111111111";
                return _state;
            default:
                return state;
        }
    }
    var _title = function (state, action) {
        if (!state) {
            state = "";
        }
        switch (action.type) {
            case 'SetTitle':
                return action.data;
            default:
                return state;
        }
    }
    var _showBlog = function (state, action) {
        if (!state) {
            state = true;
        }
        switch (action.type) {
            case 'ShowBlog':
                return action.data;
            default:
                return state;
        }
    }
    var _showSetting = function (state, action) {
        if (!state) {
            state = false;
        }
        switch (action.type) {
            case 'ShowSetting':
                return action.data;
            default:
                return state;
        }
    }

    var _blog = Redux.combineReducers({ blog: blogblogReducers, tag: blogtagReducers, props: blogpropsReducers, title: _title });
    return Redux.combineReducers({ setting: _setting, blog: _blog, title: _title, showBlog: _showBlog, showSetting: _showSetting});
    //return Redux.combineReducers({blog: _blog});

    return function (state, action) {
        switch (action.type) {
            case 'BlogTagsChange':
                var _state = Object.assign({}, state);
                if (action.data == 1) {
                    _state.blog.props.showBlog = true;
                    _state.blog.props.showTag = false;
                } else {
                    _state.blog.props.showBlog = false;
                    _state.blog.props.showTag = true;
                }
                return _state;
            case 'LoadBlogList':
                var _state = Object.assign({}, state);
                _state.blog.blog.list = action.data;
                console.log(_state);
                return _state;
            case 'LoadTagList':
                var _state = Object.assign({}, state);
                _state.blog.blog.tags = action.data;
                _state.blog.tag.list = action.data;
                return _state;
            case 'ShowBlogEdit':
                var _state = Object.assign({}, state);
                _state.blog.blog.showEdit =true;
                return _state;
            case 'ShowBlogList':
                var _state = Object.assign({}, state);
                _state.blog.blog.showEdit =false;
                return _state;

            case 'ShowTagEdit':
                var _state = Object.assign({}, state);
                _state.blog.tag.showEdit = true;
                return _state;
            case 'ShowTagList':
                var _state = Object.assign({}, state);
                _state.blog.tag.showEdit = false;
                return _state;
            default:
                return state;
        }
    };

    
});