import React, { Component } from 'react';

import './EditOdds.css'
import { Formik } from 'formik';


/*import Bet from '../../MakeBet/makebet';*/


    /*function handleClick(e) {
        //Chamar o makebet e passar a aposta para lá
    }
*/

class EditOdds extends Component {
  constructor(props) {
      super(props);
      this.state = { events: [] }
  }

  componentDidMount() {
    // TODO : substituir pela API call

    this.setState({
        events: [
            {
                "name": "1 x 2 TR",
                bt : [{
                "odd1": "1- 2.85",
                "oddX": "x- 1.85",
                "odd2": "2- 2.15",
                "odd3": "1- 2.85",
                "odd4": "x- 1.85",
                "odd5": "2- 2.15",
                "odd6": "1- 2.85",
                "odd7": "x- 1.85",
                }
                ]
            },
            {
                "name": "1 x 2 INT",
                bt : [{
                "odd1": "1- 1.85",
                "oddX": "x- 1.55",
                "odd2": "2- 1.75",
                "odd4": "x- 1.85",
                "odd5": "2- 2.15",
                "odd6": "1- 2.85",
                "odd7": "x- 1.85",
                }
                ]
            }
        ]
    })

}

onSubmit(e){
    console.log(e);
}

render() {
    return(
        <div></div>
    );
/*
    const { bt } = this.state;
    
    return ( 
        <div className="Bettypeodds">
        <form onSubmit={this.onSubmit}>
          <div className="row">
            {bt.map(event => (
            Object.keys(event).map((key, index) => ( 
              <div className="col">
                <input
                    class="form-control"
                    id = "odds-info"
                    placeholder="Odd"
                    type="text"
                    onChange={console.log()}
                    name={event[key]}
                    value={event[key]}
                />
                </div>
              ))
              ))}
          </div>
          <label className="buttonsub">
          <button type="submit" >Save Changes</button>
          </label>
        </form>
        </div>
    );
            */}
}

export default EditOdds;