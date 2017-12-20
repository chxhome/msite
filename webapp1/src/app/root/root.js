//document.getElementById("app").innerHTML = "333333eee666rrrrr6663333333";

import React from 'react';
import store from "../../js/store.js";
import { connect } from 'react-redux';
import Logo from "../logo/logo.js";
import Nav from "../nav/nav.js";
import actions from "../../js/actions.js";
import {Switch,BrowserRouter,Router,Route,IndexRoute} from 'react-router-dom';

import Home from "../home/home";
import Daily from "../daily/daily";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state=store.getState();
    var _this=this;
    store.subscribe(function() {
        var newState=store.getState();
        if(newState) {
             _this.setState(newState);//console.warn(newState);console.log(_this);
             _this.forceUpdate();
        }
    });
  }

  // getDefaultProps(){
      //没有被父组件指定props属性的新建实例，为实例设置默认的props值
      //只能在createClass情况下使用
  // }

  // getInitialState(){
      //只能在createClass情况下使用，初始化每个实例的state
      // return {
      //    imgUrlExd:"imgUrlExd"+this.props.state.imgUrl
      // }
  // }

  componentWillMount () {
    //首次渲染之前被调用，是修改组件state的最后机会
    // add event listeners (Flux Store, WebSocket, document, etc.)
  }

  render() {
     var state=this.state;
      return (
         <div className="g-body">
                <div className="g-head">
                    <Logo ref="logo" state={state.logo} />  
                </div>
                <div className="g-main">
                    <div className="g-nav">
                        <h1>{state.base.title}</h1>
                        <Nav/>
                    </div>
                    <div className="g-cont j-flag">
                    <Switch>
                      <Route path="/" component={Home} exact strict></Route>
                      <Route path="/daily">
                          <Daily state={state.daily}/>
                      </Route>
                    </Switch>
                    </div>

                </div>
        </div>
      );
  }

  componentDidMount () {
    // React.getDOMNode()
    actions.setTitle("ddddddd333333333dddddd");
  }

  componentWillReceiveProps(nextProps){
    //console.log(nextProps);
    //this.setState(nextProps.state);
  }

  shouldComponentUpdate(nextProps,nextState){
     return true;//用于组件的精确优化，如果返回false，组件不会被更新，不会调用render和之后的钩子函数
  }

  componentWillUpdate () {}

  componentDidUpdate () {}

  componentWillUnmount () {
    // remove event listeners (Flux Store, WebSocket, document, etc.)
  }

}

export default App;