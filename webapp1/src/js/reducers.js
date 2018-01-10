import {combineReducers} from 'redux';
//var Redux = require('redux')
var _base=function (state = {}, action) {
        switch (action.type) {
            case "SET_TITLE":
                var _state = Object.assign({}, state);
                _state.title=action.data;
                return _state;
            default:
                return state;
        }
    }

var _logo=function (state = {}, action) {
        switch (action.type) {
            case "SET_LOGO_IMGURL":
                var _state = Object.assign({}, state);
                _state.imgUrl=action.data;
                return _state;
            default:
                return state;
        }
    }

var _user=function (state = {}, action) {
        switch (action.type) {
            case "USER_LIST":
                var _state = Object.assign({}, state);
                _state.list=[{id:1,name:'chx1'},{id:2,name:chx2}];
                return _state;
            default:
                return state;
        }
    }

    var _daily=function (state = {}, action) {
        switch (action.type) {
            case "GetDailyList":
                var _state = Object.assign({}, state);
                var dd=action.data;console.log(dd);
                _state.list=dd.data;
                _state.loading=false;
                return _state;
            case "GetDaily":
                var _state = Object.assign({}, state);
                var dd=action.data;console.log(dd);
                _state.daily=dd.data;
                _state.loading=false;
                return _state;
                
            default:
                return state;
        }
    }

export default combineReducers({base:_base,logo:_logo,user:_user,daily:_daily});