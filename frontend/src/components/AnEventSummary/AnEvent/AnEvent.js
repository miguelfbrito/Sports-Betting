import React, { Component } from 'react';

import Api from '../../../api/api';

import './AnEvent.css'

class AnEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.onBetClick = this.onBetClick.bind(this);
    }

    onBetClick = (e, bet, event) => {
        this.props.addBetToBettingSlip(bet, event);
    }


    render() {
        const { bt, eventOid } = this.props;

        if (!bt)
            return (<div></div>);

        return (
            <div className="row" id="row-anevent">
                {bt.map(b => (
                    <div className="col-sm-4">
                        <div className="anevent-block">
                            <div style={{ margin: '15px' }}>

                                <div id="bettypename">
                                    <p>{b.bettypeName}</p>
                                </div>
                                <div id="bettypeodd">
                                    <button type="button" className="btn btn-light" onClick={(e) => this.onBetClick(e, b, eventOid)}>{b.odd}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )

    }
}


export default AnEvent;