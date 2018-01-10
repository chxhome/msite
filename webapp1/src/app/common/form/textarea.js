import React from 'react';
class TextArea extends React.Component {
    constructor(props) {
      super(props);
      this.state={
         value:""
      };
    }

    onTextChange(event){
      this._beginChg=true;
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
      if(!this._beginChg){
        this.state.value=this.props.value;
      }
     
        return (
           <div className="u-textarea">
             <textarea cols="50" rows="6" onChange={this.onTextChange.bind(this)} value={this.state.value} className="u-ipt u-ipt-text"></textarea>
          </div>
        );
     
    }
  
}

export default TextArea;