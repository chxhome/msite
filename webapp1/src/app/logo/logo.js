import React from 'react';
import actions from "../../js/actions.js";
import {Link} from 'react-router-dom';
class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state=props.state;
  }

  render() {
    var state=this.props.state;//没有再这里重新赋值，富组件setState，子组件执行render使用this.state不会更新界面，因为这个值没有改变，改变的是this.props.state,源自父组件
    return (
      <div>
        <Link to="/">
          <img onClick={this.onChangeImg} alt={state.imgUrl} src={state.imgUrl} width="50" title={state.imgUrlExd}/>
        </Link>
      </div>
    );
  }

  componentDidMount () {
    actions.setLogoImgUrl("https://nos.netease.com/ysf/EB4E5828760F0E87AB155A253CCF656C");
  }

  onChangeImg(){
     actions.setLogoImgUrl("https://nos.netease.com/ysf/5EA75194B455B543DA917A35029A4F04");console.log(React);
  }

  // static propTypes={
  //   //imgUrl:React.PropTypes.string
  // }

}

Logo.defaultProps = {
  //imgUrl:'imgUrl'
};

// Logo.propTypes = {
//   imgUrl:React.PropTypes.string
// };

export default Logo;