import React from 'react';
class Text extends React.Component {
    constructor(props) {
      super(props);

      this.state={
         value:""
      };
    }


    onInputChange(event){
      this.setState({
         value:event.target.value//.toUpperCase()
      });
      if(this.props["on-change"]){
        this.props["on-change"](event.target.value);
      }
      
    }

    getValue(){
      return this.state.value;
    }
    render() {
        return (
           <div className="u-input">
             <input type="text" onChange={this.onInputChange.bind(this)} value={this.state.value} className="u-ipt"/>
          </div>
        );
      
    }
  
}

export default Text;