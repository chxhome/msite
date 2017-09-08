//blog
define(["reducers/reducerNames"], function (names) {
    return function (state = {}, action) {
        switch (action.type) {
            case names.BlogTagsChange:
                var _state = Object.assign({}, state);
                if (action.data == 1) {
                    _state.props.showBlog = true;
                    _state.props.showTag = false;
                } else {
                    _state.props.showBlog = false;
                    _state.props.showTag = true;
                }
                return _state;
            case names.LoadBlogList:
                var _state = Object.assign({}, state);
                _state.blog.list = action.data;
                return _state;
            case names.LoadBlogTagList:
                var _state = Object.assign({}, state);
                _state.blog.tags = action.data;
                return _state;
            case names.LoadTagList:
                var _state = Object.assign({}, state);
                _state.blog.tags = action.data;
                _state.tag.list = action.data;
                return _state;
            case names.ShowBlogEdit:
                var _state = Object.assign({}, state);
                _state.blog.showEdit = true;
                return _state;
            case names.ShowBlogList:
                var _state = Object.assign({}, state);
                _state.blog.showEdit = false;
                return _state;

            case names.ShowTagEdit:
                var _state = Object.assign({}, state);
                _state.tag.showEdit = true;
                return _state;
            case names.ShowTagList:
                var _state = Object.assign({}, state);
                _state.tag.showEdit = false;
                return _state;
            default:
                return state;
        }
    }

});