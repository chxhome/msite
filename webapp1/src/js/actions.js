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

    getDailyList:function(){
        return function(dispatch) {
             axios.get('/blog/getBlogList')
            .then(function (response) {
                console.log(response);
                dispatch({
                    type: 'GetDailyList',
                    data: response.data.data
                });
            })
            .catch(function (error) {
              console.log(error);
            });

        }
    }
}

export default bindActionCreators(_baseActionCreators,store.dispatch);