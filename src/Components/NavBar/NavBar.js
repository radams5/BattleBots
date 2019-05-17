import React, { Component } from 'react';
import {Link} from 'react-router-dom'


class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">

        <div className="NavBarMenuDiv">
          <ul>
            <li><Link to='/Create' className='NavBarLinks'>Create</Link></li>
            <h1 id='Title'>Nodemon Silver Version</h1>
            <li><Link to='/Collection' className='NavBarLinks'>Battle</Link></li>
          
          </ul>
        </div>
      </div>
  
    );
  }
}

export default NavBar;
