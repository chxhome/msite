import React from 'react';
class Loading extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillMount () {
      // add event listeners (Flux Store, WebSocket, document, etc.)
    }

    render() {
      var isloading=this.props.loading;
      if(isloading){
        return (
           <div className="u-loading">
             正在加载...
          </div>
        );
      }else{
        return null;
      }
      
    }
  
}

export default Loading;