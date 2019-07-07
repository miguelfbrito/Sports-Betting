import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

import UserHandler from '../utils/userHandler';
import User from '../ManageUser/User/User';

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = { user: {} }
    }

    componentDidMount() {

        window.addEventListener('localStorage', () => console.log('IMPRIMINDO DO NAVBAR'), false)

        console.log("NAV")
        const userData = UserHandler.get();
        console.log("USER DATA", userData);
        console.log();
        this.setState({ user: userData });
    }

    updateBalance = (newBalance) => {
        let user = this.state.user;
        user.balance = newBalance;
        UserHandler.updateBalance(newBalance);
        this.setState({
            ...user
        })
    }

    render() {
        //Fazer um counter para passar o número de bets abertas

        const { user } = this.state;


        if (!user) {
            return (
                <nav className="navbar navbar-expand-md bg-faded">
                    <div className="container navbar-container">
                        <a className="navbar-brand" href="#">BetApp</a>
                        <div className="collapse navbar-collapse " id="navbarText">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active"> <Link to="/events"> <span className="nav-link" href="#">Events</span> </Link> </li>
                                <li className="nav-item"> <Link to="/login"> <span className="nav-link" href="#">Login</span> </Link> </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            );
        }

        if (UserHandler.get() !== null && UserHandler.isAdmin()) {
            return (
                <nav className="navbar navbar-expand-md bg-faded">
                    <div className="container navbar-container">
                        <a className="navbar-brand" href="#">BetApp</a>
                        <div className="collapse navbar-collapse " id="navbarText">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active"> <Link to="/"> <span className="nav-link" href="#">Events</span> </Link> </li>
                                <li className="nav-item active"> <Link to="/admin"> <span className="nav-link" href="#">Manage Events</span> </Link> </li>
                                <li className="nav-item active"> <Link to="/admin/createevent"> <span className="nav-link" href="#">Create Event</span> </Link> </li>
                                <li className="nav-item"> <Link to="/user"> <span className="nav-link" href="#"> {user.username}</span> </Link> </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            );
        }


        return (
            <nav className="navbar navbar-expand-md bg-faded">
                <div className="container navbar-container">
                    <a className="navbar-brand" href="#">BetApp</a>
                    <div className="collapse navbar-collapse " id="navbarText">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active"> <Link to="/events"> <span className="nav-link" href="#">Events</span> </Link> </li>
                            <li className="nav-item active"> <Link to="/bets"> <span className="nav-link" href="#">Bets</span> </Link> </li>
                            <li className="nav-item"> <Link to="/user"> <span className="nav-link" href="#"> {user.username + " (" + (user.balance || 0).toFixed(2) + "€)"}</span> </Link> </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;