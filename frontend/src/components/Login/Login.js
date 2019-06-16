import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Redirect, Link } from 'react-router-dom';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import UserHandler from '../utils/userHandler';

import './Login.css';
import Api from '../../api/api';
import Register from './Register/Register';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { logged: false, token: "", showRegisterSlip: false }
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {

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


    render() {

        console.log("PROPS LOGIN", this.props)

        const { showRegisterSlip } = this.state;

        const registerSlipSection = (
            <div className="login-container shadow">
                <Register />
            </div>);

        const loginPresentationSection = (
            <div className="login-container shadow">
                <h3>Welcome back!</h3>
                <p>
                    To keep connected with us please login with your personal info.
                </p>
                <div className="button-container">
                    <button className="btn-1" onClick={() => this.setState({ showRegisterSlip: false })}>Sign In</button>
                </div>
            </div>
        );

        const registerPresentationSection = (
            <div className="login-container shadow">
                <h3>Welcome!</h3>
                <p>
                    Enter your personal details and start betting for fun with us.
                </p>
                <div className="button-container">
                    <button className="btn-1" onClick={() => this.setState({ showRegisterSlip: true })}>Sign Up</button>
                </div>
            </div>
        );

        const loginSlipSection = (
            <div className="login-container shadow">
                <h3>Sign In into BettingAPP!</h3>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validate={values => {
                        let errors = {};
                        if (!values.username) {
                            errors.username = 'Required';
                        } if (!values.password) {
                            errors.password = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        const a = await Api.fetchLogin(values);

                        console.log(a)
                        //Colocar a apresentar as mensagens de erro
                        if (a.success) {
                            this.setState({ logged: true, registered: a });
                            UserHandler.save(a.token);
                            window.location.href = '/events';

                        } else {
                            this.setState({ registered: a });
                            this.addNotification({ title: 'Error logging in', message: 'Invalid credentials!', type: 'danger' })
                        }


                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="form">
                            <div>

                                <Field className="username" type="username" name="username" placeholder="Username" />
                                <ErrorMessage name="username" component="div" className="ErrorMessa" />
                            </div>

                            <div>

                                <Field className="password" type="password" name="password" placeholder="Password" />
                                <ErrorMessage name="password" component="div" className="ErrorMessa" />
                            </div>

                            <div className="button-container">
                                <button className="btn-1" type="submit" disabled={isSubmitting}>
                                    Sign In
                            </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        );

        return (
            <div className="container">
                <ReactNotification ref={this.notificationDOMRef} />
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className={showRegisterSlip ? "col-sm-3" : "col-sm-5"}>
                        {!showRegisterSlip ? loginSlipSection : ''}
                        {showRegisterSlip ? loginPresentationSection : ''}
                    </div>
                    <div className={showRegisterSlip ? "col-sm-7" : "col-sm-3"}>
                        {showRegisterSlip ? registerSlipSection : ''}
                        {!showRegisterSlip ? registerPresentationSection : ''}
                    </div>
                </div>
            </div >
        );

    }
}

export default Login;
