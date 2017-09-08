//blog.props
define(["reducers/reducerNames"], function (names) {
    return function (state, action) {
        if (!state) {
            state = {
                showBlog: true,
                showTag: false,
            };
        }
        switch (action.type) {
            case names.BlogTagsChange:
                //console.log(state);
                var _state = Object.assign({}, state);
                if (action.data == 1) {
                    _state.showBlog = true;
                    _state.showTag = false;
                } else {
                    _state.showBlog = false;
                    _state.showTag = true;
                }
                return _state;
            default:
                return state;
        }
    }

});