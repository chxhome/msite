import React from 'react';
import {Link} from 'react-router-dom';
import actions from "../../js/actions.js";

import Text from "../common/form/text.js";
import Textarea from "../common/form/textarea.js";
import SelectHtml from "../common/form/select.js";
import UcDate from "../common/form/date.js";
import UcDateTime from "../common/form/datetime.js";

import dailyEnum from "../../js/enums/daily.js";

import util from "../../js/extend/util.js";

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
		super(props);console.log(props.state);
		//this.state=props.state;
		this._state={
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
    		importances:dailyEnum.importances,//[{"text":"可避免","value":0},{"text":"一般","value":1},{"text":"重要","value":2},{"text":"必须","value":3},{"text":"非常重要","value":4}]
				accounts:[{"text":"2017","value":1},{"text":"2018","value":2}]
			}};

  }
  componentWillMount () {
    // add event listeners (Flux Store, WebSocket, document, etc.)
  }

 onTypeChange(value){
 	  this.state.daily.exptype=value.value;
    console.log(value);
 }

 onImportanceChange(value){
 	 this.state.daily.importance=value.value;
    console.log(value);
 }

 onAccountChange(value){
	 this.state.daily.accountId=value.value;
 }

 	onSave(){
 		var fd=this.state.daily;
 		fd.time=this.refs.time.getValue().valueNumber;
 		fd.persons=this.refs.persons.getValue();
		fd.content=this.refs.content.getValue();
    fd.place=this.refs.place.getValue();
		//fd.event=this.refs.event.getValue();
		fd.money=this.refs.money.getValue();
		console.log(fd);
		actions.saveDaily(fd,function(){
			window.location.href="/daily/list";
			//browserHistory.push("/daily/list");
			//this.context.router.push("/daily/list");
			//this.props.history.push("/daily/list");
		}.bind(this));
 	}

  render() {
		//var state=this.state||{};console.log(this.props.state);
		this.state=this.props.state;//console.log(state);
		if(!this.state.daily._id){
			 util.extend(this.state.daily,this._state.formDD,true);
		}
    var fd=this.state.daily;
		var ui=this._state.uiData||{};

    return (
       <div className="m-dailyedit">
       	<dl className="u-crumbs">
              <dt><Link to="/daily/list">消费管理</Link></dt>
              <dd>创建</dd>
         </dl>
         <div className="m-form">
				 <dl>
         		<dt>账户：</dt>
         		<dd><SelectHtml value={fd.accountId} uiData={ui.accounts} on-change={this.onAccountChange.bind(this)} /></dd>
         	</dl>
         	<dl>
         		<dt>时间：</dt>
         		<dd><UcDate value={fd.time} ref="time"/></dd>
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
         	{/* <dl>
         		<dt>事件：</dt>
         		<dd><Text value={fd.event} ref="event"/></dd>
         	</dl> */}
         	<dl>
         		<dt>类别：</dt>
         		<dd><SelectHtml value={fd.exptype} uiData={ui.exptypes} on-change={this.onTypeChange.bind(this)}/></dd>
         	</dl>
					 <dl>
         		<dt>重要性：</dt>
         		<dd><SelectHtml value={fd.importance} uiData={ui.importances} on-change={this.onImportanceChange.bind(this)} /></dd>
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
	
	componentDidMount () {
		// React.getDOMNode()
		var urlObj=util.parseQueryString(window.location);
		if(urlObj.id){
			actions.getDaily(urlObj.id);
		}
	 		 
  }
  
}

export default DailyEdit;