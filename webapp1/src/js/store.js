import { createStore,applyMiddleware } from 'redux'
import reducers from "./reducers.js";

var _initstate = {
        base: {
        	title:"测试系统"
        },
        logo:{imgUrl:""},
        user:{
        	list:[],name:"chx",realname:"xuxu"
        },
        daily:{list:[],loading:true,daily:{}}
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
                if(action){
                    console.group(action.type);
                    console.info('dispatching', action);
                    let result = next(action);
                    console.log('new state:', store.getState());
                    console.groupEnd(action.type);
                    return result;
                }
                
            }
        }
    }

var _createStore =applyMiddleware(thunkMiddleware,logger)(createStore);

export default _createStore(reducers, _initstate);