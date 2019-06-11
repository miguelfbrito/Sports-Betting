import React from 'react';

import './AnEvent.css'
/*import Bet from '../../MakeBet/makebet';*/


    function handleClick(e) {
        //Chamar o makebet e passar o e para lá
    }


const AnEvent = (props) => {
    const { bt } = props;

//Adaptar para inputs com o valor igual ao que já possuí
    return (
        <div className="Bettype-odds">
            {bt.map(event => (
        Object.keys(event).map((key, index) => ( 
            <input id="button" key={index}>  {event[key]}</input> 
          ))
    ))}
        </div>
    );
}


export default AnEvent;