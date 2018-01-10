import React from 'react';
class SelectHtml extends React.Component {
    constructor(props) {
      super(props);
      this.state={uiData:[{text:"未选择",value:"0"},{text:"选项1",value:"1"},{text:"选项2",value:"2"}]};
    }

    onSelectChange(event){
      this._beginChg=true;
      this.setState({
        value:event.target.value//.toUpperCase()
     });
      if(this.props["on-change"]){
         this.props["on-change"]({
           value:event.target.value,
           text:event.target.options[event.target.selectedIndex].innerHTML
         });
      }
      
    }

    getValue(){
      return this.state.value;
    }

    render() {
        var dd=this.props.uiData||this.state.uiData;
        var opts=[];
        for(var i=0;i<dd.length;i++){
            opts.push(<option value={dd[i].value}>{dd[i].text}</option>);
        }
        if(!this._beginChg){
          this.state.value=this.props.value;
        }
        return (
           <div className="u-select">
             <select onChange={this.onSelectChange.bind(this)} value={this.state.value} className="u-ipt u-ipt-select">
               {opts}
            </select>
          </div>
        );
      
    }
  
}

export default SelectHtml;