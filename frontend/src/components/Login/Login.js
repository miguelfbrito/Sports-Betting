import React, { Component } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { gateway } from '../../common/constants';

import { getUserInfo, setUserInfo } from '../utils/utils';

import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.login()
    }

    login() {
        axios.post(`${gateway}/user/login`, {
            username: "miguel",
            password: "password"
        }).then(data => {
            console.log(data.data);
            setUserInfo(data.data);
            console.log(getUserInfo());
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6 login-container shadow">
                        <h3>Welcome!</h3>
                        <Formik
                            initialValues={{ username: '', password: '' }}
                            validate={values => {
                                let errors = {};
                                if (!values.username) {
                                    errors.username = 'Required';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                    console.log("TESTE")
                                }, 400);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="form">
                                    <div>

                                        <label htmlFor="">Username</label>
                                        <Field className="input" type="username" name="username" />
                                        <ErrorMessage name="username" component="div" />
                                    </div>

                                    <div>

                                        <label htmlFor="">Password</label>
                                        <Field className="input" type="password" name="password" />
                                        <ErrorMessage name="password" component="div" />
                                    </div>

                                    <div className="button-container">

                                        <button className="btn-1" type="submit" disabled={isSubmitting}>
                                            Login
                                        </button>

                                        <button className="btn-1" type="submit" disabled={isSubmitting}>
                                            Register
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div >
        );

    }
}

export default Login;
