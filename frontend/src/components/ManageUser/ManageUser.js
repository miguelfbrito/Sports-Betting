import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './ManageUser.css';
import CurrentEventsCarousel from '../CurrentEventsCarousel/CurrentEventsCarousel';
//import User from './User/User';
import User from './User/User';
import Api from '../../api/api';
import EditUser from './EditUser/EditUser';
import Money from './Money/Money';
import Premium from './Premium/Premium';

import UserHandler from '../utils/userHandler';

class CheckBetsSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [], showEditSlip: false, showDetailsSlip: false, showMoneySlip: false, showPremium: true,
            menus: ['Profile', 'Edit Profile', 'Deposit/Withdraw', 'Premium', 'Logout'], filter: 'Profile'
        }
    }

    async componentDidMount() {

        const t = 1;

        let userdetails = await Api.fetchUserDetails(1);

        this.setState({
            user: userdetails
        })
    }

    changeFilter = (menu) => {

        if (menu === 'Logout') {
            UserHandler.remove();
            window.location.href = "/events"
        }

        this.setState({ filter: menu });
    }

    render() {
        //TODO: Adicionar um scroll para os eventos

        let { filter, menus } = this.state;

        const editSlipSection = (
            <div className="user">
                <EditUser />
            </div>);

        const detailsSlipSection = (
            <div className="user">
                <User user={this.state.user} />
            </div>);

        const moneySlipSection = (
            <div className="user">
                <Money user={this.state.user} />
            </div>);

        const premiumSlipSection = (
            <div className="user">
                <Premium user={this.state.user} />
            </div>);


        return (
            <div className="user-title">
                <div className="top-bar">
                    <p className="management-div">Account Management</p>
                </div>

                <div className="user-container shadow">
                    <div className="top-bar-menu">
                        {menus.map(menu => (
                            <p className={filter === menu ? 'top-bar-menu-active' : ''} onClick={() => this.changeFilter(menu)}>{menu}</p>
                        ))}
                    </div>

                    <div >
                        {filter === 'Profile' ? detailsSlipSection : ''}
                        {filter === 'Edit Profile' ? editSlipSection : ''}
                        {filter === 'Deposit/Withdraw' ? moneySlipSection : ''}
                        {filter === 'Premium' ? premiumSlipSection : ''}
                    </div>

                </div>
            </div>
        );
    }
}

export default CheckBetsSummary;