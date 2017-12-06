import React from 'react';
import {Link} from 'react-router-dom';
class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="m-nav">
          <li><Link to="/">首页</Link></li>
          <li><Link to="/daily/list">日常管理</Link></li>
          <li><Link to="/">用户管理</Link></li>
      </ul>
    );
  }

}

export default Nav;