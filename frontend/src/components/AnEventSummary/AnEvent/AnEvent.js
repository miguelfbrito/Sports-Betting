import React from 'react';

import './AnEvent.css'
/*import Bet from '../../MakeBet/makebet';*/


    function handleClick(e) {
        //Chamar o makebet e passar o e para lá
    }


const AnEvent = (props) => {
    const { bt } = props;


    return (
        <div>
            {bt.map(event => (
        Object.keys(event).map((key, index) => ( 
            <button id="button" key={index}>  {event[key]}</button> 
          ))
    ))}
        </div>
    );
}


export default AnEvent;