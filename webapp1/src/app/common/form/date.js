import React from 'react';
class _Date extends React.Component {
    constructor(props) {
      super(props);
      var val=this.props.value||new Date();
      var obj=this._getDateValue(val);
      this.state={dvalue:obj.value,value:obj};
    }

    _getDateValue(val){
      var _value={};
      if(typeof val=="number"){
        val=new Date(val);
      }
      _value={
        valueNumber:val.getTime(),
        valueDate:val
      };
      if(typeof val!="string"){
        val=val._toString("yyyy-MM-dd");
      }
      _value.value=val;
      return _value;
    }

    onchange(event){
      this._beginChg=true;
       console.dir(event.target);
       var obj={
            value:event.target.value,
            valueDate:event.target.valueAsDate,
            valueNumber:event.target.valueAsNumber
          };
        this.setState({
         dvalue:obj.value,
         value:obj
        });
       if(this.props["on-change"]){
          this.props["on-change"](obj);
        }
    }

    getValue(){
      return this.state.value;
    }
    render() {
       // this.state.dvalue=this.props.value;
       if(!this._beginChg){
        var obj=this._getDateValue(this.props.value);
        this.state.dvalue=obj.value;
        this.state.value=obj;
       }
        return (
           <div className="u-input">
             <input className="u-ipt u-ipt-date" type="date" value={this.state.dvalue} onChange={this.onchange.bind(this)}/>
          </div>
        );
      
    }
  
}

export default _Date;