import React from 'react';
import {Link} from 'react-router-dom';
import actions from "../../js/actions.js";

import Text from "../common/form/text.js";
import Textarea from "../common/form/textarea.js";
import SelectHtml from "../common/form/select.js";
import UcDate from "../common/form/date.js";
import UcDateTime from "../common/form/datetime.js";

import dailyEnum from "../../js/enums/daily.js";

// {
//     "_id" : 0,
//     "id" : "20171212001",
//     "userId" : 0,
//     "accountId" : 0,
//     "createTime" : 0,
//     "editTime" : 0,
//     "creator" : "admin",
//     "money" : 0,
//     "time" : 0,
//     "place" : "",
//     "persons" : "",
//     "content" : "无",
//     "event" : "无",
//     "exptype" : "通用",
//     "importance" : "1"
// }
class DailyEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    	formDD:{
			"time":(new Date()).getTime(),
			"money":0,
			"place" : "1111111111111111",
		    "persons" : "",
		    "content" : "无",
		    "event" : "无",
		    "exptype" : "1",
		    "importance" : "1"
    	},
    	uiData:{
    		exptypes:dailyEnum.exptypes,//[{"text":"未知","value":0},{"text":"购物","value":1},{"text":"教育","value":2},{"text":"饮食","value":3},{"text":"玩乐","value":4}],
    		importances:dailyEnum.importances//[{"text":"可避免","value":0},{"text":"一般","value":1},{"text":"重要","value":2},{"text":"必须","value":3},{"text":"非常重要","value":4}]
    	}
    };
  }
  componentWillMount () {
    // add event listeners (Flux Store, WebSocket, document, etc.)
  }

 onPlaceChange(value){
 	this.state.formDD.place=value;
    console.log(value);
 }

 onTypeChange(value){
 	this.state.formDD.exptype=value.value;
    console.log(value);
 }

 onImportanceChange(value){
 	this.state.formDD.importance=value.value;
    console.log(value);
 }

 	onSave(){
 		var fd=this.state.formDD;
 		fd.time=this.refs.time.getValue().valueNumber;
 		fd.persons=this.refs.persons.getValue();
		fd.content=this.refs.content.getValue();
        fd.place=this.refs.place.getValue();
		fd.event=this.refs.event.getValue();
		fd.money=this.refs.money.getValue();
		console.log(fd);
		actions.saveDaily(fd,function(){
			window.location.href="/build/index.html#/daily/list";
		});
 	}

  render() {
    var state=this.state||{};console.log(state);
    var fd=state.formDD;
    var ui=state.uiData
    return (
       <div className="m-dailyedit">
       	<dl className="u-crumbs">
              <dt><Link to="/daily/list">消费管理</Link></dt>
              <dd>创建</dd>
         </dl>
         <div className="m-form">
         	<dl>
         		<dt>时间：</dt>
         		<dd><UcDate value={fd.time} ref="time" value={fd.time}/></dd>
         	</dl>
         	<dl>
         		<dt>地点：</dt>
         		<dd><Text value={fd.place} ref="place"/></dd>
         	</dl>
         	<dl>
         		<dt>人物：</dt>
         		<dd><Text value={fd.persons} ref="persons"/></dd>
         	</dl>
         	<dl>
         		<dt>金额：</dt>
         		<dd><Text value={fd.money} ref="money"/></dd>
         	</dl>
         	<dl>
         		<dt>内容：</dt>
         		<dd><Textarea value={fd.content} ref="content"/></dd>
         	</dl>
         	<dl>
         		<dt>事件：</dt>
         		<dd><Text value={fd.event} ref="event"/></dd>
         	</dl>
         	<dl>
         		<dt>重要性：</dt>
         		<dd><SelectHtml value={fd.importance} uiData={ui.importances} on-change={this.onImportanceChange.bind(this)} /></dd>
         	</dl>
         	<dl>
         		<dt>类别：</dt>
         		<dd><SelectHtml value={fd.exptype} uiData={ui.exptypes} on-change={this.onTypeChange.bind(this)}/></dd>
         	</dl>
         	<dl>
         		<dt> </dt>
         		<dd>
         			<button className="u-btn" onClick={this.onSave.bind(this)}>保存</button>
         		</dd>
         	</dl>
         </div>
      </div>
    );
  }
  
}

export default DailyEdit;