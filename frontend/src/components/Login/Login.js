import React, { Component } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { gateway } from '../../common/constants';

import { getUserInfo, setUserInfo } from '../utils/utils';

import './Login.css';
import Api from '../../api/api';
import Register from './Register/Register';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {logged: false, token: "", showRegisterSlip: false}
    }

    componentDidMount() {
        
    }

    render() {
        
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
                <button className="btn-1" onClick={() => this.setState({showRegisterSlip : false})}>SignIn</button>
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
                <button className="btn-1" onClick={() => this.setState({showRegisterSlip : true})}>Sign Up</button>
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
                    }if (!values.password) {
                        errors.password = 'Required';
                    }
                    return errors;
                }}
                onSubmit={ async (values, { setSubmitting }) => {
                        const a = await Api.fetchLogin(values);
                        //Colocar a apresentar as mensagens de erro
                        if(a.success==true){
                            this.setState({logged: true, registered: a});
                            alert(this.state.registered.message);
                        }else{
                            this.setState({registered: a});
                            alert(this.state.registered.message);
                        }
                        setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="form">
                        <div>

                            <Field className="username" type="username" name="username" placeholder="Username" />
                            <ErrorMessage name="username" component="div" className="ErrorMessa"/>
                        </div>

                        <div>

                            <Field className="password" type="password" name="password" placeholder="Password" />
                            <ErrorMessage name="password" component="div" className="ErrorMessa"/>
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
