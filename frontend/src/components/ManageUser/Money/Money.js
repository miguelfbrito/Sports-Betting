import React, { Component } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Money.css';
import Api from '../../../api/api';

class Money extends Component {
    constructor(props) {
        super(props);
        this.state = { userOid: 1 }
    }
  
    componentDidMount() {
        
    }
  
  
  render() {

    const depositMoney = (
        <div className="update-form">
            <p className="div-title">Deposit Money</p>
                <Formik
                initialValues={{ updateValue: 0, userOid: this.state.userOid}}
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
                alert("Deposit realized");
                }else{
                alert("Error on Deposit")
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
                initialValues={{ updateValue: 0}}
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
                //const a = await Api.fetchUpdateUser(this.state);
                //Redirecionar para as páginas
                /*if(a==true){
                alert("Detalhes alterados");
                }else{
                alert("Erro ao atualizar detalhes")
                }*/
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