import React, { Component } from 'react';
import './ManageUser.css';
import CurrentEventsCarousel from '../CurrentEventsCarousel/CurrentEventsCarousel';
//import User from './User/User';
import User from './User/User';
import FilterOptions from './FilterOptions/FilterOptions';
import Api from '../../api/api';
import EditUser from './EditUser/EditUser';
import Money from './Money/Money';

class CheckBetsSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { user: [], showEditSlip: false, showDetailsSlip: false, showMoneySlip: true }
    }

    async componentDidMount() {
        
        const t = 1;

        let userdetails = await Api.fetchUserDetails(1);

        this.setState({user: userdetails});


        /*this.setState({
            users: [
                {
                    "Username": "João",
                    "Saldo": "30.00",
                    "Nome": "João Pinto",
                    "Email": "user@email.com",
                    "Premium": "Não"
                }
            ]
        })*/

    }

    render() {
        //TODO: Adicionar um scroll para os eventos

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

        return ( 
            <div className="user-title">
                <p className="management-div">Account Management</p>
                <div className="user-container shadow">


                    {/* Carousel 4 or 5 games */}
                    {/* <CurrentEventsCarousel /> */}

                    {/* List all events */}

                    <FilterOptions />

                        <div >
                            {this.state.showDetailsSlip ? detailsSlipSection : ''}
                            {this.state.showEditSlip ? editSlipSection : ''}
                            {this.state.showMoneySlip ? moneySlipSection : ''}
                        </div>

                </div>
            </div>
        );
    }
}

export default CheckBetsSummary;