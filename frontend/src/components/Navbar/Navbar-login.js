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

        this.state = { "user": "João", "saldo": "10.00", "bets": "2" }
    }

    render() {
        //Fazer um counter para passar o número de bets abertas

        return (
            <nav className="navbar navbar-expand-md bg-faded">
                <div className="container navbar-container">
                    <a className="navbar-brand" href="#">Bet</a>
                    <div className="collapse navbar-collapse " id="navbarText">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active"> <Link to="/bets"> <span data-notifications={this.state.bets} className="nav-link" href="#">Bets</span> </Link> </li>
                            <li className="nav-item active"> <Link to="/events"> <span className="nav-link" href="#">View Events</span> </Link> </li>
                            <li className="nav-item"> <Link to="/user"> <span className="nav-link" href="#">Welcome {this.state.user + "(" + this.state.saldo + "€)"}</span> </Link> </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;