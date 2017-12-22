import React from 'react';
import {Link} from 'react-router-dom';
import actions from "../../js/actions.js";

import Text from "../common/form/text.js";
import Textarea from "../common/form/textarea.js";
import SelectHtml from "../common/form/select.js";
import UcDate from "../common/form/date.js";
import UcDateTime from "../common/form/datetime.js";

class DailyImport extends React.Component {
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
    		exptypes:[{"text":"未知","value":0},{"text":"购物","value":1},{"text":"教育","value":2},{"text":"饮食","value":3},{"text":"玩乐","value":4}],
    		importances:[{"text":"可避免","value":0},{"text":"一般","value":1},{"text":"重要","value":2},{"text":"必须","value":3},{"text":"非常重要","value":4}]
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
 		let formData = new FormData(this.refs.form);
		actions.importDaily(formData,function(){
			window.location.href="http://127.0.0.1:8000/build/index.html#/daily/list";
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
              <dd>导入</dd>
         </dl>
         <div className="m-form">
            <form enctype="multipart/form-data" ref="form">
         	<dl>
         		<dt>选择文件：</dt>
         		<dd><input type="file" id="file" name="file"/></dd>
         	</dl>
         	<dl>
         		<dt> </dt>
         		<dd>
         			<button type="button" className="u-btn" onClick={this.onSave.bind(this)}>导入</button>
         		</dd>
         	</dl>
         	</form>
         </div>
      </div>
    );
  }
  
}

export default DailyImport;