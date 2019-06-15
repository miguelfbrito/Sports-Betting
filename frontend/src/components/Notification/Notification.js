import React, { Component } from 'react';

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();

    }

    componentDidMount() {
        this.addNotification(this.props.message);
    }

    addNotification(message) {
        console.log(message)

        this.notificationDOMRef.current.addNotification({
            title: "Awesomeness",
            message: "Awesome Notifications!",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        });
    }


    render() {

        const { message } = this.props;

        return (
            <div>
                <ReactNotification ref={this.notificationDOMRef} />
            </div>
        );
    }
}

export default Notification;