import React, { Component } from 'react';
import './ManageUser.css';
import CurrentEventsCarousel from '../CurrentEventsCarousel/CurrentEventsCarousel';
//import User from './User/User';
import User from './Premium/Premium';
import FilterOptions from './FilterOptions/FilterOptions';

class CheckBetsSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] }
    }

    componentDidMount() {
        // TODO : substituir pela API call

        this.setState({
            users: [
                {
                    "Username": "João",
                    "Saldo": "30.00",
                    "Nome": "João Pinto",
                    "Email": "user@email.com",
                    "Premium": "Não"
                }
            ]
        })

    }

    render() {
        //TODO: Adicionar um scroll para os eventos
        const { users } = this.state;
        return ( 
            <div className="user-title">
                <p className="Info-div">Account Management</p>
                <div className="user-container shadow">


                    {/* Carousel 4 or 5 games */}
                    {/* <CurrentEventsCarousel /> */}

                    {/* List all events */}

                    <FilterOptions />

                    {users.map(user => (
                        <div className="user">
                            <User user={user} />
                        </div>
                    ))}

                </div>
            </div>
        );
    }
}

export default CheckBetsSummary;