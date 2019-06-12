import React, { Component } from 'react';

import Api from '../../../api/api';

import './AnEvent.css'

class AnEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        const { bt } = this.props;


        if (!bt)
            return (<div></div>);

        console.log("Bt", bt)

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
                                    <button type="button" className="btn btn-light">{b.odd}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )


        // if (Object.keys(bt[0]).length == 3) {
        //     return (
        //         <div className="row">
        //             {bt.map(event => (
        //                 Object.keys(event).map((key, index) => (
        //                     <div className="col-sm-4">
        //                         <p className="parainfo">{key}</p>
        //                         <p className="parainfo">----------</p>
        //                         <button id="buttonbettype" key={index}>{event[key]}</button>
        //                     </div>
        //                 ))
        //             ))}
        //         </div>
        //     );
        // } else if (Object.keys(bt[0]).length >= 4 || Object.keys(bt[0]).length <= 2) {
        //     return (
        //         <div className="row">
        //             {bt.map(event => (
        //                 Object.keys(event).map((key, index) => (
        //                     <div className="col-sm-6">
        //                         <p className="parainfo">{key}</p>
        //                         <p className="parainfo">----------</p>
        //                         <button id="buttonbettype" key={index}>{event[key]}</button>
        //                     </div>
        //                 ))
        //             ))}
        //         </div>
        //     );
        // }
    }
}


export default AnEvent;