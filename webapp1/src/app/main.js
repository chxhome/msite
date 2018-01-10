import React from 'react';
import {render} from 'react-dom';
//import { AppContainer } from 'react-hot-loader';
//import { Provider } from 'react-redux';
import _exdbase from "../js/extend/base";
import App from "./root/root";
import {BrowserRouter,HashRouter,hashHistory} from 'react-router-dom';
var sss={a:1};
// const render = (Component) => {
//     ReactDOM.render(
//         <AppContainer>
//             <Component />
//         </AppContainer>,
//         document.getElementById('app')
//     )
// };
//render(App);

render(
        (<BrowserRouter>
        	<App history={sss}/>
		  </BrowserRouter>),
        document.getElementById('app')
    );

// if (module.hot) {
//     module.hot.accept('./root/root', () => {
//     	window.setTimeout(function(){
//     		 render(App);
//     	},1000);
       
//     });
// }
