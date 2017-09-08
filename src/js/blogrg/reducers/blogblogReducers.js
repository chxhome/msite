//blog.blog
define(["reducers/reducerNames"], function (names) {
    return function (state = {}, action) {
        switch (action.type) {
            case names.LoadBlogList:
                var _state = Object.assign({}, state);
                _state.list = action.data;
                return _state;
            case names.LoadBlogTagList:
                var _state = Object.assign({}, state);
                _state.tags = action.data;
                return _state;
            case names.ShowBlogEdit:
                var _state = Object.assign({}, state);
                _state.showEdit = true;
                return _state;
            case names.ShowBlogList:
                var _state = Object.assign({}, state);
                _state.showEdit = false;
                return _state;
            default:
                return state;
           
        }
    }

});