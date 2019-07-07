import React, { Component } from 'react';
import AnEvent from './AnEvent/AnEvent';
import BettingSlip from '../BettingSlip/BettingSlip';
import Api from '../../api/api';
import Notification from '../Notification/Notification';
import UserHandler from '../utils/userHandler';

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import BetTypeStruct from '../utils/bettypesstruct';

import './AnEventSummary.css';

class AnEventSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { event: {}, blocks: [], showBettingSlip: true, bettingSlipBets: [] }

        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    async componentDidMount() {

        const eventOid = this.props.match.params.eventOid || -1;
        const data = await Api.fetchAvailableBetTypesByEventOid(eventOid)
        const structBetTypes = BetTypeStruct.organize(data);

        this.setState({
            event: data.event,
            blocks: structBetTypes
        })

    }

    formatDate = (dateMillis) => {

        const date = new Date(dateMillis);
        console.log(this.state);

        //Para ser possível escrever a data usando o mês e não número
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];


        return `${monthNames[date.getMonth()]} ${date.getDate()} of ${date.getFullYear()} - ${date.getUTCHours()}:${date.getMinutes()}`
    }



    addNotification(notification) {
        this.notificationDOMRef.current.addNotification({
            title: notification.title || "Awesomeness",
            message: notification.message || "Awesome Notifications!",
            type: notification.type || "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: notification.dismiss || 2000 },
            dismissable: { click: true }
        });
    }

    addBetToBettingSlip = (bet, eventOid) => {

        let currentBets = this.state.bettingSlipBets;
        const matchSame = currentBets.filter(b => b.bettypeOid === bet.bettypeOid);

        if (matchSame.length > 0) {
            return;
        }

        currentBets.push({
            name: eventOid.name,
            eventOid: parseInt(eventOid),
            odd: bet.odd,
            bettypeName: bet.bettypeName,
            bettypeOid: bet.bettypeOid,
            gains: 0,
            wager: 0
        })

        if (currentBets.length > 0) {
            this.setState({ bettingSlipBets: currentBets, showBettingSlip: true });
        }
    }


    onPlaceBet = async () => {
        const betResults = await Api.placeBets(this.state.bettingSlipBets);
        betResults.map(br => {
            const event = this.state.event;
            if ('message' in br) {
                this.addNotification({
                    title: 'Error placing bet!',
                    message: br.message,
                    type: 'danger',
                    dismiss: 5000
                });
            } else {
                this.addNotification({
                    title: event.name,
                    message: 'Your bet has been placed!',
                    type: 'success',
                    dismiss: 5000
                });

                const data = UserHandler.get();
                const newBalance = data.balance - br.wager;
                this.props.updateBalance(newBalance);
            }
        })
    }

    changeSportFilter = (sport) => {
        this.setState({ sportFilter: sport });
    }

    removeBets = () => {
        this.setState({ bettingSlipBets: [], showBettingSlip: false })
    }

    removeSingleBet = (bettypeOid, eventOid) => {

        const currentBets = this.state.bettingSlipBets;
        let updatedBets = currentBets.filter(bet => (bet.bettypeOid !== bettypeOid || bet.eventOid !== eventOid));

        this.setState({ bettingSlipBets: updatedBets });
    }

    updateWagerBet = (bettypeOid, eventOid, wager) => {

        console.log("Updating", wager)

        const currentBets = this.state.bettingSlipBets;
        const updatedBets = currentBets.map(b => {
            if (b.bettypeOid === bettypeOid && b.eventOid === eventOid) {
                return {
                    bettypeName: b.bettypeName,
                    bettypeOid: b.bettypeOid,
                    eventOid: b.eventOid,
                    gains: wager * b.odd,
                    name: b.name,
                    odd: b.odd,
                    wager: wager
                }
            }
            return b;
        })

        this.setState({ bettingSlipBets: updatedBets });

    }


    render() {

        const { blocks, event, showBettingSlip, bettingSlipBets } = this.state;

        if (!blocks) {
            // Loading
            return (<div></div>);
        }


        const bettingSlipSection = (
            <div className="col-sm-3">
                <BettingSlip bets={bettingSlipBets} onPlaceBet={this.onPlaceBet}
                    removeBets={this.removeBets} removeSingleBet={this.removeSingleBet}
                    updateWagerBet={this.updateWagerBet} />
            </div>);



        return (
            <div className="anevents-title">
                <ReactNotification ref={this.notificationDOMRef} />
                <div className="row">
                    <div className={showBettingSlip ? 'col-md-9' : 'col-md-12'}>
                        <div className="top-bar">
                            <p className="Infodiv">{event.name}</p>
                        </div>

                        <div className="anevents-container shadow">
                            {blocks.map(sbt => (
                                <div key={sbt.oid} className="anevent">
                                    <div className="BetText">
                                        <p>{sbt.name}</p>
                                    </div>

                                    <AnEvent bt={sbt.bettypes} eventOid={this.props.match.params.eventOid}
                                        addBetToBettingSlip={this.addBetToBettingSlip} onPlaceBet={this.onPlaceBet}
                                    />

                                </div>
                            ))}

                        </div>
                    </div>

                    {showBettingSlip ? bettingSlipSection : ''}

                </div>
            </div>
        );
    }
}

export default AnEventSummary;