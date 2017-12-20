import React from 'react';
class DateTime extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
        return (
           <div className="u-input">
             <input type="datetime" className="u-ipt u-ipt-datetime"/>
          </div>
        );
      
    }
  
}

export default DateTime;