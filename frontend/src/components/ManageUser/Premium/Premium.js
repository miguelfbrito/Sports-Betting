import React, { Component } from 'react';

import './Premium.css';
import Api from '../../../api/api';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import UserHandler from '../../utils/userHandler';

class Premium extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    async componentDidMount() {

        let userdetails = await Api.fetchUserDetails(UserHandler.get().oid);

        this.setState(userdetails);
        console.log(this.state)
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
            dismiss: { duration: 5000 },
            dismissable: { click: true }
        });
    }

    subscribe = async() => {
        const a = await Api.fetchSubscribe(UserHandler.get().oid);
        console.log(a);
        if (a.message!=="Subscription failed!"){
            window.location.href = '/user';
            UserHandler.updatePremium(true);
            UserHandler.WithdrawMoney(10);
            this.addNotification({ title: 'Subscribed', message: 'Subscribed!', type: 'success' })
        }else{
            this.addNotification({ title: 'NOT Subscribed', message: 'Insufficient Balance!', type: 'danger' })   
        }
    }

    unsubscribe = async() => {
        const a = await Api.fetchUnsubscribe(UserHandler.get().oid);
        console.log(a);
        window.location.href = '/user';
        UserHandler.updatePremium(false);
        this.addNotification({ title: 'Unsubscribe', message: 'Unsubscribed!', type: 'success' })
    }

    render() {
        //Todo: colocar os alerta com o resultado
        const bePremium = (
            <div className="bePremium">
                <p className="premium-titles">Become a Premium user, for 10€, and gain access to exclusive events</p>
                <button className="btn-1" onClick={this.subscribe}>Subscribe Premium</button>
            </div>
        );


        const notBePremium = (
            <div className="bePremium">
                <p className="premium-titles">Already a Premium user! You can cancel your subscription below!</p>
                <button className="btn-1" onClick={this.unsubscribe}>Unsubscribe Premium</button>
            </div>
        );


        return (
            <div>
            <ReactNotification ref={this.notificationDOMRef} />
                <div className="premium">
                    {!this.state.ispremium ? bePremium : ''}
                    {this.state.ispremium ? notBePremium : ''}
                </div>
            </div>
        );
    }

}

export default Premium;