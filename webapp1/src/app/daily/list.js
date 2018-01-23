import React from 'react';
import {Link} from 'react-router-dom';

import actions from "../../js/actions.js";
import NoData from "../common/unit/nodata.js";
import Loading from "../common/unit/loading.js";
import util from "../../js/extend/util.js";
import dailyEnum from "../../js/enums/daily.js";
class DailyList extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillMount () {
      // add event listeners (Flux Store, WebSocket, document, etc.)
    }

    onToEdit(item){

      if(item){
        window.rHistory.push("/daily/edit?id="+item._id);
      }else{
        window.rHistory.push("/daily/edit");
      }
    }

    onToDelete(item){
      actions.deleteDaily(item._id,function(){
        actions.getDailyList();
      });
    }

    render() {
      let state=this.props.state;console.log(state);
      //state.loading=true;
      let _list=state.list.map((item) => {
                      return (
                        <tr key={item._id}>
                          <td>{util.timeFormat(item.time,"yyyy-MM-dd")}</td>
                          <td>{item.place}</td>
                          <td>{item.persons}</td>
                          <td>{item.money}</td>
                          <td title={item.content}>{item.content}</td>
                          <td>{dailyEnum.getExpTypeName(item.exptype)}</td>
                          {/* <td>{item.event}</td> */}
                          <td>{dailyEnum.getImportancesName(item.importance)}</td>
                          <td>
                            <a onClick={this.onToEdit.bind(this,item)} className="cssicon cssicon-edit"><span></span></a>
                            <a onClick={this.onToDelete.bind(this,item)} className="cssicon cssicon-del"><span></span></a>
                          </td>
                        </tr>
                      )
                    },this);


      return (
         <div className="m-dailyList">
           <dl className="u-crumbs">
              <dt>消费管理</dt>
              <dd>消费列表</dd>
              <dd className="right"><Link to="/daily/edit" className="u-btn u-btn-sm">创建</Link><Link className="u-btn u-btn-sm" to="/daily/import">导入</Link></dd>
           </dl>
           <div className="m-table">
              <NoData nodata={state.list.length<=0}/>
              <Loading loading={state.loading}/>
              <table className="m-table">
                  <thead>
                    <tr>
                      <td>时间</td>
                      <td>地点</td>
                      <td>人物</td>
                      <td>金额</td>
                      <td>内容</td>
                      <td>类型</td>
                      {/* <td>事件</td> */}
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
        actions.getDailyList();
    }
  
}

export default DailyList;