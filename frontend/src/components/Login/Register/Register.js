import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Redirect } from 'react-router-dom'


import '../Login.css';
import Api from '../../../api/api';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { registered: false}
    }

    componentDidMount() {
    }


    render() {

        return (
            <div className="container">
                        <h3>Create an account!</h3>
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
                                    //Redirecionar para as páginas
                                    if(a.success==true){
                                        this.setState({registered: a});
                                        alert(a.message);
                                    }else{
                                        alert(a.message)
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
                                <Field className="balance" type="number" name="saldo" placeholder="00.00"/>
                                <ErrorMessage name="saldo" component="div" className="ErrorMessa"/>
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
