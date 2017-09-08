//创建store依赖reducers，reducers就是我们的应用所有的业务处理的函数，此函数和其他函数的不同点在于：它总是返回一个新的state；而调用reducers的唯一方式是，store.dispatch一个action
define(['redux', 'reducers'], function (Redux, reducers) {

    var _initstate = {
        title: "博客系统",
        blog: {
            props: {
                showBlog: true,
                showTag: false,
            },
            blog: {
                list: [],
                tags:[],
                showEdit: false
            },
            tag: {
                list: [],
                showEdit: false
            }
        },
        setting: {

        },
        showBlog: true,
        showSetting: false
    };

    var thunkMiddleware = function(_ref) {
        var dispatch = _ref.dispatch;
        var getState = _ref.getState;
        return function (next) {
            return function (action) {
                if (typeof action === 'function') {
                    return action(dispatch, getState);
                }
                return next(action);
            };
        };
    }

    var logger = function (store) {
        return function (next) {
            return function (action) {
                console.group(action.type);
                console.info('dispatching', action);
                let result = next(action);
                console.log('new state:', store.getState());
                console.groupEnd(action.type);
                return result;
            }
        }
    }
    var createStore = Redux.applyMiddleware(thunkMiddleware,logger)(Redux.createStore);

    return createStore(reducers, _initstate); 

});