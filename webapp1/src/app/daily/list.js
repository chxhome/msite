import React from 'react';
import actions from "../../js/actions.js";
class DailyList extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillMount () {
      // add event listeners (Flux Store, WebSocket, document, etc.)
    }

    render() {
      var state=this.props.state;console.log(state);
      //state.list=[1,2,3];
      return (
         <div className="m-dailyList">
           <div className="m-table">
              <div className="nodata"><p>无数据</p></div>
              <div className="loading"></div>
              <table>
                  <thead>
                    <tr>
                      <td>时间</td>
                      <td>内容</td>
                      <td>金额</td>
                      <td>类型</td>
                      <td>事件</td>
                      <td>操作</td>
                    </tr>
                  </thead>
                  <tbody>
                    {state.list.map((item) => {
                      return (
                        <tr>
                          <td>时间</td>
                          <td>内容</td>
                          <td>金额</td>
                          <td>类型</td>
                          <td>事件</td>
                          <td>操作</td>
                        </tr>
                      )
                    })}
                  </tbody>
              </table>
           </div>
        </div>
      );
    }

    componentDidMount () {
        // React.getDOMNode()
       
        actions.getDailyList();
    }
  
}

export default DailyList;