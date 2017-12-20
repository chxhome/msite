import React from 'react';
class TextArea extends React.Component {
    constructor(props) {
      super(props);
      this.state={
         value:""
      };
    }

    onTextChange(event){
      this.state.value=event.target.value;

      if(this.props["on-change"]){
        this.props["on-change"](event.target.value);
      }
      
    }

    getValue(){
      return this.state.value;
    }

    render() {
        return (
           <div className="u-textarea">
             <textarea cols="50" rows="6" onChange={this.onTextChange.bind(this)} defaultValue={this.props.value} className="u-ipt u-ipt-text"></textarea>
          </div>
        );
     
    }
  
}

export default TextArea;