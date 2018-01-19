import appcss from "../sass/app.scss";

import _exdbase from "../js/extend/base";
import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router,HashRouter} from 'react-router-dom';

import App from "./root/root";

ReactDom.render(
        (<Router>
        	<App/>
		  </Router>),
        document.getElementById('app')
    );

