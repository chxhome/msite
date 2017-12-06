import React from 'react';
class DailyEdit extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount () {
    // add event listeners (Flux Store, WebSocket, document, etc.)
  }

  render() {
    var state=this.props.state;
    return (
       <div className="m-daily">
        <h1>DailyEditDailyEditDailyEditDailyEditDailyEditDailyEditDailyEdit</h1>
      </div>
    );
  }
  
}

export default DailyEdit;