import React from 'react';

import './AnEvent.css'
/*import Bet from '../../MakeBet/makebet';*/


function handleClick(e) {
    //Chamar o makebet e passar o e para lá
}


const AnEvent = (props) => {
    const { bt } = props;

    console.log(bt);


    if (Object.keys(bt[0]).length == 3) {
        return (
            <div className="row">
                {bt.map(event => (
                    Object.keys(event).map((key, index) => (
                        <div className="col-sm-4">
                            <p className="parainfo">{key}</p>
                            <p className="parainfo">----------</p>
                            <button id="buttonbettype" key={index}>{event[key]}</button>
                        </div>
                    ))
                ))}
            </div>
        );
    } else if (Object.keys(bt[0]).length >= 4 || Object.keys(bt[0]).length <= 2) {
        return (
            <div className="row">
                {bt.map(event => (
                    Object.keys(event).map((key, index) => (
                        <div className="col-sm-6">
                            <p className="parainfo">{key}</p>
                            <p className="parainfo">----------</p>
                            <button id="buttonbettype" key={index}>{event[key]}</button>
                        </div>
                    ))
                ))}
            </div>
        );
    }
}


export default AnEvent;