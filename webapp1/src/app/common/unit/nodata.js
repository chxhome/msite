import React from 'react';
class NoData extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillMount () {
      // add event listeners (Flux Store, WebSocket, document, etc.)
    }

    render() {
      var isnodata=this.props.nodata;
      if(isnodata){
        return (
           <div className="u-nodata">
             暂时无数据
          </div>
        );
      }else{
        return null;
      }
      
    }
  
}

export default NoData;