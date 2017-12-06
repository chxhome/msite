//document.getElementById("app").innerHTML = "333333eee666rrrrr6663333333";

import React from 'react';
import state from "./component/store.js";
const App = () => (
    <div class="g-body">
        <div class="g-left j-flag">
            <h1>{state.title}</h1>
            <ul class="m-nav">
                <li><a href="#/m/blog/list/">博客日志</a></li>
                <li><a href="#/m/blog/setting/">博客设置</a></li>
            </ul>
        </div>
        <div class="g-right j-flag">

      </div>
</div>
);
export default App;