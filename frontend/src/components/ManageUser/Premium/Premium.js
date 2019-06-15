import React, { Component } from 'react';

import './Premium.css';
import Api from '../../../api/api';

class Premium extends Component {
    constructor(props) {
        super(props);
        this.state = { userid: 1}
    }
  
    async componentDidMount() {
        
        let userdetails = await Api.fetchUserDetails(this.state.userid);
  
        this.setState(userdetails);
        console.log(this.state)
    }
  

    async subscribe () {
        const a = await Api.fetchSubscribe(this.state.oid);
        alert(a.message);
    }

    async unsubscribe () {
        const a = await Api.fetchUnsubscribe(this.state.oid);
        alert(a.message);
    }

  render() {
      //Todo: colocar os alerta com o resultado

    const bePremium = (
        <div className="bePremium">
            <p className="premium-titles">Be a Premium user and get many more advantages!</p>
            <button className="btn-1" onClick={async ()=>await Api.fetchSubscribe(this.state.oid)}>Subscribe Premium</button>
        </div>
    );


    const notBePremium = (
        <div className="bePremium">
            <p className="premium-titles">Already a Premium user! Keep going and get many more advantages!</p>
            <button className="btn-1" onClick={async ()=>await Api.fetchUnsubscribe(this.state.oid)}>Unsubscribe Premium</button>
        </div>
    );


    return (
        <div>
        <div className="premium">
            {!this.state.ispremium ? bePremium:''}
            {this.state.ispremium ? notBePremium:''}
        </div>
        </div>
    );
}

}

export default Premium;