import React from 'react';
import {render} from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import _exdbase from "../js/extend/base";
import App from "./root/root";
import Home from "./home/home";
import Logo from "./logo/logo";
import Daily from "./daily/daily";
import {BrowserRouter,Switch,HashRouter,Router,Route,Link,IndexLink,hashHistory} from 'react-router-dom';

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
        (<HashRouter history={hashHistory}>
        	<App/>
		  </HashRouter>),
        document.getElementById('app')
    );

// if (module.hot) {
//     module.hot.accept('./root/root', () => {
//     	window.setTimeout(function(){
//     		 render(App);
//     	},1000);
       
//     });
// }
