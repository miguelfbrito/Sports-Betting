import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Redirect, Link } from 'react-router-dom';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";



import '../Login.css';
import Api from '../../../api/api';
import UserHandler from '../../utils/userHandler';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { userregistered: false, registered: ''}
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

        return (
            <div className="container">
            <ReactNotification ref={this.notificationDOMRef} />
                        <h3>Create an account!</h3>
                        <Formik
                            initialValues={{ username: '', saldo: '0', nome: '', email: '', password: '', cpassword : ''}}
                            validate={values => {
                              let errors = {};
                              if (!values.username) {
                                errors.username = 'Required';
                              }
                              if (!values.saldo) {
                                  errors.saldo = 'Required';
                              }else if (
                                  !/^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/i.test(values.saldo)
                                ) {
                                  errors.saldo = 'Invalid number type';
                                }
                              if (!values.nome) {
                                  errors.nome = 'Required';
                              }
                              if (!values.email) {
                                  errors.email = 'Required';
                              }else if (
                                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                  errors.email = 'Invalid email address';
                                }
                              if (!values.password) {
                                  errors.password = 'Required';
                              }if (!values.cpassword) {
                                errors.cpassword = 'Required';
                                }if (values.password && values.cpassword) {
                                    if(values.password != values.cpassword){
                                        errors.cpassword = 'Passwords must be the same';
                                    }
                                }
                              return errors;
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                                    const a = await Api.fetchRegister(values);

                                    //Colocar a apresentar as mensagens de erro
                                    if (a.success===true) {
                                        this.setState({registered: true });

                                        const c = await Api.fetchLogin(values);

                                        //console.log(a)
                                        //Colocar a apresentar as mensagens de erro
                                        if (c.success) {
                                            this.setState({ logged: true, registered: c });
                                            UserHandler.save(c.token);
                                            window.location.href = '/events';
                                            this.addNotification({ title: 'Successfully registered', message: 'Registered with success!', type: 'success' })
                                        } else {
                                            this.setState({ registered: a });
                                            
                                    }

                                    } else {
                                        this.setState({ registered: a });
                                        this.addNotification({ title: 'Error logging in', message: "Username already selected", type: 'danger' });
                                    }
                                    
                                    setSubmitting(false);
                            }}
                        >
                            {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form className="form" onSubmit={handleSubmit}>
                            <div>
                            <Field className="username" type="username" name="username" placeholder="Username"/>
                            <ErrorMessage name="username" component="div" className="ErrorMessa" />
                            </div>

                            <div>
                                <Field className="name" type="username" name="nome" placeholder="Name"/>
                                <ErrorMessage name="nome" component="div" className="ErrorMessa"/>
                            </div>

                            <div>
                                <Field className="email" type="email" name="email" placeholder="Email"/>
                                <ErrorMessage name="email" component="div" className="ErrorMessa"/>
                            </div>

                            <div>
                                <Field className="password" type="password" name="password" placeholder="Password"/>
                                <ErrorMessage name="password" component="div" className="ErrorMessa"/>
                            </div>

                            <div>
                                <Field className="password" type="password" name="cpassword" placeholder="Confirm Password"/>
                                <ErrorMessage name="cpassword" component="div" className="ErrorMessa"/>
                            </div>

                            <div className="button-container">
                                <button className="btn-1" type="submit" disabled={isSubmitting}>Register</button>
                            </div>
                            </form>
                        )}
                        </Formik>
        
</div >
        );

    }
}

export default Register;
