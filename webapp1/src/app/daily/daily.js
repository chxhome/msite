import React from 'react';
import {Route,Link,IndexLink} from 'react-router-dom';
import DailyList from "../daily/list";
import DailyEdit from "../daily/edit";
class Daily extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
	    var state=this.props.state;console.log(state);
	    return (
		       <div className="m-daily">
		       		<div className="m-title">日常管理</div>
		    		<Route path="/daily/list">
		    			<DailyList state={state}/>
		    		</Route>
        		   <Route path="/daily/edit" component={DailyEdit}></Route>
		       </div>
	    );
  }
  
  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    //this.setState(nextProps.state);
  }


}

export default Daily;