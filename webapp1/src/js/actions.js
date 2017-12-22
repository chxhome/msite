import {bindActionCreators} from 'redux';
import store from "./store.js";
import axios from 'axios';

var _baseActionCreators = {
    setTitle : function(title) {
        return {
            type : 'SET_TITLE',
            data:title
        }
    },
    setLogoImgUrl:function(url){
		return {
            type : 'SET_LOGO_IMGURL',
            data:url
        }

    },
    //no-reducer
    saveDaily:function(data,cb){
        var url="/daily/addDaily";
        if(data.id){
            url='/daily/updateDaily';
        }
        //return function(dispatch) {
             axios.post(url,data)
            .then(function (response) {
                console.log(response);
                // dispatch({
                //     type: '_saveDaily',
                //     data: response.data
                // });
                cb();
            })
            .catch(function (error) {
              console.log(error);
            });

        //}
    },
    //no-reducer
    importDaily:function(data,cb){
        var url="/daily/importDaily";
        //return function(dispatch) {
             axios.post(url,data)
            .then(function (response) {
                console.log(response);
                cb();
            })
            .catch(function (error) {
              console.log(error);
            });

        //}
    },

    getDailyList:function(){
        return function(dispatch) {
             axios.get('/daily/getDailyList')
            .then(function (response) {
                console.log(response);
                dispatch({
                    type: 'GetDailyList',
                    data: response.data
                });
            })
            .catch(function (error) {
              console.log(error);
            });

        }
    }
}

export default bindActionCreators(_baseActionCreators,store.dispatch);