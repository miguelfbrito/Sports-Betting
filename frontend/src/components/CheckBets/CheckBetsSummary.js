import React, { Component } from 'react';
import './CheckBetsSummary.css';
import Bet from './Bet/Bet';

import Api from '../../api/api';

class CheckBetsSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { bets: [], subMenu: 'Open' }
        this.changeSubMenu = this.changeSubMenu.bind(this);
    }

    async componentDidMount() {
        // TODO : substituir pela API call

        const bets = await Api.fetchUserBets();
        console.log("Bets", bets);

        this.setState({ bets: bets });

    }

    changeSubMenu = (newSubMenu) => {
        this.setState({ subMenu: newSubMenu });
    }

    render() {
        //TODO: Adicionar um scroll para os eventos
        let { bets, subMenu } = this.state;

        if (subMenu === 'History') {
            bets = bets.filter(b => b.result !== null);
        } else {
            bets = bets.filter(b => !(['WON', 'LOST'].includes(b.result)));
        }

        bets = bets.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

        return (
            <div className="bet-title">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="top-bar">
                            <p className="Infodiv">Bets</p>
                        </div>

                        <div className="bet-container shadow">

                            <div className="top-bar-menu">
                                <p className={subMenu === 'Open' ? 'top-bar-menu-active' : ''} onClick={() => this.changeSubMenu('Open')}>Open</p>
                                <p className={subMenu === 'History' ? 'top-bar-menu-active' : ''} onClick={() => this.changeSubMenu('History')}>History</p>
                            </div>

                            {/* Carousel 4 or 5 games */}
                            {/* <CurrentEventsCarousel /> */}

                            {/* List all events */}


                            {bets.map(bet => (
                                <div className="bet">
                                    <Bet bet={bet} />
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckBetsSummary;