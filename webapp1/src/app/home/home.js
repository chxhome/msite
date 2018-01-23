import React from 'react';
class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
         <div className="m-home">
         	<span className="cssicon cssicon-del"><span></span></span>
           <span className="cssicon cssicon-edit"><span></span></span>
           <span className="cssicon cssicon-up"></span>
           <span className="cssicon cssicon-down"></span>
           <span className="cssicon cssicon-left"></span>
           <span className="cssicon cssicon-right"></span>
           <span className="cssicon cssicon-head"></span>

           <button class="u-btn">按钮</button>
           <button class="u-btn u-btn-disabled">按钮</button>
           <button class="u-btn u-btn-cancel">按钮</button>
           <button class="u-btn u-btn-sm">按钮</button>
           <button class="u-btn u-btn-lg">按钮</button>
           <button class="u-btn u-btn-delete">按钮</button>
           <button class="u-btn u-btn-delete u-btn-delete-disabled">按钮</button>
        </div>
      );
  }
  
}

export default Home;