import React from 'react';
import {Switch,Route,Link,IndexLink} from 'react-router-dom';
import DailyList from "../daily/list";
import DailyEdit from "../daily/edit";
import DailyImport from "../daily/import";
class Daily extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
	    var state=this.props.state;console.log(state);
	    return (
		       <div className="m-daily">
		       		<div className="m-title"><h1>日常管理</h1></div>
		       		<Switch>
  		    		  <Route path="/daily/list" exact>
  		    				<DailyList state={state}/>
  		    		  </Route>
        		   <Route path="/daily/edit" exact>
								 	<DailyEdit state={state}/>
							 </Route>
               <Route path="/daily/import" exact component={DailyImport}></Route>
        		  </Switch>
		       </div>
	    );
  }
  
  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    //this.setState(nextProps.state);
  }


}

export default Daily;