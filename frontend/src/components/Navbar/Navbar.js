import React,
{
    Component
}

    from 'react';

import {
    Link
}

    from 'react-router-dom';
import './Navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
        <nav className="navbar navbar-expand-md bg-faded">
        <div className="container navbar-container"> 
        <a className="navbar-brand" href="#">Bet</a> 
        <div className="collapse navbar-collapse " id="navbarText"> 
        <ul className="navbar-nav ml-auto">
         <li className="nav-item active"> <Link to="/events"> <span className="nav-link" href="#">View Events</span> </Link> </li>
          <li className="nav-item"> <Link to="/login"> <span className="nav-link" href="#">Login</span> </Link> </li> </ul> </div> </div> </nav>);
    }
}

export default Navbar;