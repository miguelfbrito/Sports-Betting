import React, { Component } from 'react';

import Api from '../../../api/api';

import '../../AnEventSummary/AnEvent/AnEvent.css'

class UpdateAnEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    GetValue(ev){
        let v={};
        console.log(ev.target);
        for(let i=0; i<this.state.bt.length; i++){
            if(this.state.bt[i].bettypeName == ev.target.name){
                this.state.bt[i].odd = ev.target.value;
                console.log(this.state.bt[i]);
            }
        }
    }

    render() {
        const { bt, eventOid } = this.props;
        this.state = this.props;

        //this.setState({[this.props.nameBT]: {[b.bettypeName]: b.odd}});

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
                                    <div><input type="text" name={b.bettypeName} value={b.odd} onChange={(e) => this.GetValue(e)}></input></div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                ))}
                {console.log(this.state)}
            </div>
        )

    }
}


export default UpdateAnEvent;