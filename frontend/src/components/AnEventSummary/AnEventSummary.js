import React, { Component } from 'react';
import CurrentEventsCarousel from '../CurrentEventsCarousel/CurrentEventsCarousel';
import AnEvent from './AnEvent/AnEvent';
import BettingSlip from '../BettingSlip/BettingSlip';
import Api from '../../api/api';

import BetTypeStruct from '../utils/bettypesstruct';

import './AnEventSummary.css';

class AnEventSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { event: {}, blocks: [], showBettingSlip: true, bettingSlipBets: [] }
    }

    formatDate = (dateMillis) => {

        const date = new Date(dateMillis);
        console.log(this.state);

        //Para ser possível escrever a data usando o mês e não número
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];


        return `${monthNames[date.getMonth()]} ${date.getDate()} of ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
    }


    async componentDidMount() {

        const eventOid = this.props.match.params.eventOid || -1;

        console.log("EventOid", eventOid);

        const data = await Api.fetchAvailableBetTypesByEventOid(eventOid)
        console.log("Bettypes")
        console.log(data)

        const structBetTypes = BetTypeStruct.organize(data);

        console.log("Struct bet types", structBetTypes)


        // TODO : substituir pela API call

        this.setState({
            event: data.event,
            blocks: structBetTypes
        })

    }

    addBetToBettingSlip = (bet, event) => {

        let currentBets = this.state.bettingSlipBets;

        console.log("BET###########################", bet)
        console.log("EVENT###########################", event)

        // Verify if it doesn't exist already

        const matchSame = currentBets.filter(b => b.bettypeOid === bet.bettypeOid && b.eventOid === event.oid);

        if (matchSame.length > 0) {
            console.log("Duplicated bet!")
            return;
        }

        currentBets.push({
            name: event.name,
            eventOid: parseInt(event),
            odd: bet.odd,
            bettypeName: bet.bettypeName,
            bettypeOid: bet.bettypeOid,
            gains: 0,
            wager: 0
        })

        console.log("CURRENT BETS", currentBets)

        if (currentBets.length > 0) {
            this.setState({ bettingSlipBets: currentBets, showBettingSlip: true });
        }
    }

    onPlaceBet = async () => {

        console.log("Placing bet!");
        console.log(this.state.bettingSlipBets);
        await Api.placeBets(this.state.bettingSlipBets)
        console.log("Placed all the bets!");

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