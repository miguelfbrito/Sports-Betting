import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';


import '../Login.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6 login-container shadow">
                        <h3>Welcome!</h3>
                        <Formik
                            initialValues={{ username: '', saldo: '', nome: '', email: '', password: '', cpassword : ''}}
                            validate={values => {
                              let errors = {};
                              if (!values.username) {
                                errors.username = 'Required';
                              }
                              if (!values.saldo) {
                                  errors.saldo = 'Required';
                              }else if (
                                  !/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/i.test(values.saldo)
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
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }, 400);
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
                            <label htmlFor="">Username</label>
                            <Field className="input" type="username" name="username" />
                            <ErrorMessage name="username" component="div" />
                            </div>

                            <div>
                                <label htmlFor="">Balance</label>
                                <Field className="input" type="number" name="saldo" />
                                <ErrorMessage name="saldo" component="div" />
                            </div>

                            <div>
                                <label htmlFor="">Name</label>
                                <Field className="input" type="text" name="nome" />
                                <ErrorMessage name="nome" component="div" />
                            </div>

                            <div>
                                <label htmlFor="">Email</label>
                                <Field className="input" type="email" name="email" />
                                <ErrorMessage name="email" component="div" />
                            </div>

                            <div>
                                <label htmlFor="">Password</label>
                                <Field className="input" type="password" name="password" />
                                <ErrorMessage name="password" component="div" />
                            </div>

                            <div>
                                <label htmlFor="">Confirm Password</label>
                                <Field className="input" type="password" name="cpassword" />
                                <ErrorMessage name="cpassword" component="div" />
                            </div>

                            <div className="button-container">
                                <button className="btn-1" type="submit" disabled={isSubmitting}>Save</button>
                            </div>
                            </form>
                        )}
                        </Formik>
        </div>
    </div>
</div >
        );

    }
}

export default Register;
