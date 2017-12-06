//blog.tag
define(["reducers/reducerNames"], function (names) {
    return function (state = {}, action) {
        switch (action.type) {
            case names.LoadTagList:
                var _state = Object.assign({}, state);
                _state.list = action.data;
                return _state;

            case names.ShowTagEdit:
                var _state = Object.assign({}, state);
                _state.showEdit = true;
                return _state;
            case names.ShowTagList:
                var _state = Object.assign({}, state);
                _state.showEdit = false;
                return _state;
            default:
                return state;
        }
    }

});