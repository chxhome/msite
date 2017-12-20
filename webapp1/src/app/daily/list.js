import React from 'react';
import {Link} from 'react-router-dom';

import actions from "../../js/actions.js";
import NoData from "../common/unit/nodata.js";
import Loading from "../common/unit/loading.js";
class DailyList extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillMount () {
      // add event listeners (Flux Store, WebSocket, document, etc.)
    }

    
    render() {
      let state=this.props.state;console.log(state);
      //state.loading=true;
      let _list=state.list.map((item) => {
                      return (
                        <tr>
                          <td>{item.time}</td>
                          <td>{item.place}</td>
                          <td>{item.persons}</td>
                          <td>{item.money}</td>
                          <td>{item.content}</td>
                          <td>{item.exptype}</td>
                          <td>{item.event}</td>
                          <td>{item.importance}</td>
                          <td>操作</td>
                        </tr>
                      )
                    },this);


      return (
         <div className="m-dailyList">
           <dl className="u-crumbs">
              <dt>消费管理</dt>
              <dd>消费列表</dd>
              <dd className="right"><Link to="/daily/edit">创建</Link></dd>
           </dl>
           <div className="m-table">
              <NoData nodata={state.list.length<=0}/>
              <Loading loading={state.loading}/>
              <table class="m-table">
                  <thead>
                    <tr>
                      <td>时间</td>
                      <td>地点</td>
                      <td>人物</td>
                      <td>金额</td>
                      <td>内容</td>
                      <td>类型</td>
                      <td>事件</td>
                      <td>重要性</td>
                      <td>操作</td>
                    </tr>
                  </thead>
                  <tbody>
                    {_list}
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