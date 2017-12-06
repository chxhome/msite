//require("./component/app/app.js");
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import App from "./component/app/app.js";

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('app')
    )
};
render(App);

if (module.hot) {
    module.hot.accept('./component/app/app', () => {
        render(App)
    });
}
