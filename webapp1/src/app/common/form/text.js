import React from 'react';
class Text extends React.Component {
    constructor(props) {
      super(props);

      this.state={
         value:""
      };
    }


    onInputChange(event){
      this._beginChg=true;
      this.setState({
         value:event.target.value
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
           <div className="u-input">
             <input type="text" onChange={this.onInputChange.bind(this)} value={this.state.value} className="u-ipt"/>
          </div>
        );
      
    }
  
}

export default Text;