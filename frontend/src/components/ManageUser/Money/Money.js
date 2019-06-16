import React, { Component } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Money.css';
import Api from '../../../api/api';

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import UserHandler from '../../utils/userHandler';

class Money extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
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

    const depositMoney = (
        <div className="update-form">
            <p className="div-title">Deposit Money</p>
                <Formik
                initialValues={{ updateValue: 0, userOid: UserHandler.get().oid}}
            validate={values => {
                let errors = {};
                if (!values.updateValue) {
                errors.updateValue = 'Required';
                }else if (
                    !/^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/i.test(values.updateValue)
                  ) {
                    errors.updateValue = 'Invalid number type';
                  }
                
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                const a = await Api.fetchDepositMoney(values);
                //Redirecionar para as páginas
                if(a){
                    window.location.href = '/user';
                    this.addNotification({ title: 'Success Deposit Money', message: 'Success on deposit value!', type: 'success' })
                } else {
                    this.addNotification({ title: 'Error Deposit Money', message: 'Error on deposit value!', type: 'danger' })
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
                <form onSubmit={handleSubmit}>
                <div className="update-balance">
                    <p className="info-p">Amount:</p>
                    <input
                    className="updatevalue"
                        placeholder="00.00"
                        type="number"
                        name="updateValue"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.updateValue}
                    />
                    <p className="error-info">{errors.updateValue && touched.updateValue && errors.updateValue}</p>
                </div>
                <div className="button-container">
                <button className="btn-1" type="submit" disabled={isSubmitting}>
                    Deposit
                </button>
                </div>
                </form>
            )}
            </Formik>
        </div>
    );


    const WithdrawMoney = (
        <div className="update-form">
            <p className="div-title">Withdraw Money</p>
                <Formik
                initialValues={{ updateValue: 0, userOid: UserHandler.get().oid}}
            validate={values => {
                let errors = {};
                if (!values.updateValue) {
                errors.updateValue = 'Required';
                }else if (
                    !/^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/i.test(values.updateValue)
                  ) {
                    errors.updateValue = 'Invalid number type';
                  }
                
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                const a = await Api.fetchWithdrawMoney(values);
                //Redirecionar para as páginas
                if(a){
                    window.location.href = '/user';
                    this.addNotification({ title: 'Success Withdraw Money', message: 'Success on withdraw value!', type: 'success' });
                } else {
                    this.addNotification({ title: 'Error Withdraw Money', message: 'Error on withdraw value!', type: 'danger' })
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
                <form onSubmit={handleSubmit}>
                <div className="update-balance">
                    <p className="info-p">Amount:</p>
                    <input
                    className="updatevalue"
                        placeholder="00.00"
                        type="number"
                        name="updateValue"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.updateValue}
                    />
                    <p className="error-info">{errors.updateValue && touched.updateValue && errors.updateValue}</p>
                </div>
                <div className="button-container">
                <button className="btn-1" type="submit" disabled={isSubmitting}>
                    Withdraw
                </button>
                </div>
                </form>
            )}
            </Formik>
        </div>
    );


    return (
        <div className="row">
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="col-sm-6">
            {depositMoney}
        </div>
        <div className="col-sm-6">
            {WithdrawMoney}
        </div>
        </div>
    );
}
}

export default Money;