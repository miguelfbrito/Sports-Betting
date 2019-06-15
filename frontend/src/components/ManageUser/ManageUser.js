import React, { Component } from 'react';
import './ManageUser.css';
import CurrentEventsCarousel from '../CurrentEventsCarousel/CurrentEventsCarousel';
//import User from './User/User';
import User from './User/User';
import Api from '../../api/api';
import EditUser from './EditUser/EditUser';
import Money from './Money/Money';
import Premium from './Premium/Premium';

class CheckBetsSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { user: [], showSlip: "Profile", userFilter: 'Profile' }
    }

    async componentDidMount() {
        
        const t = 1;

        let userdetails = await Api.fetchUserDetails(1);

        this.setState({user: userdetails});
    }


    changeUserFilter = (filter) => {
        this.setState({ userFilter: filter });
        this.setState({showSlip: filter});
    }

    render() {
        //TODO: Adicionar um scroll para os eventos

        const { userFilter } = this.state;

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
                <p className="management-div">Account Management</p>
                <div className="user-container shadow">


                    <div className="top-bar-menu">
                        <p className={userFilter === 'Profile' ? 'top-bar-menu-active' : ''} onClick={() => this.changeUserFilter('Profile')}>Profile</p>
                        <p className={userFilter === 'Edit Profile' ? 'top-bar-menu-active' : ''} onClick={() => this.changeUserFilter('Edit Profile')}>Edit Profile</p>
                        <p className={userFilter === 'Deposit/withdraw money' ? 'top-bar-menu-active' : ''} onClick={() => this.changeUserFilter('Deposit/withdraw money')}>Deposit/withdraw money</p>
                        <p className={userFilter === 'Premium' ? 'top-bar-menu-active' : ''} onClick={() => this.changeUserFilter('Premium')}>Premium</p>
                    </div>

                    <div >
                        {this.state.showSlip==="Profile" ? detailsSlipSection : ''}
                        {this.state.showSlip==="Edit Profile" ? editSlipSection : ''}
                        {this.state.showSlip==="Deposit/withdraw money" ? moneySlipSection : ''}
                        {this.state.showSlip==="Premium" ? premiumSlipSection : ''}
                    </div>

                </div>
            </div>
        );
    }
}

export default CheckBetsSummary;