import React, { Component } from 'react';

import './EditOdds.css'
import { Formik } from 'formik';


/*import Bet from '../../MakeBet/makebet';*/


    /*function handleClick(e) {
        //Chamar o makebet e passar a aposta para lá
    }
*/

const EditOdds = (props) => {

    const { bt } = props;
    const t = bt[0];

    return ( 
        <div className="row">
        <div style={{overflowy: "scroll", marginLeft:"20px" }} className="Bettype-odds">
        <Formik
                            initialValues={{}}
                            validate={values => {
                              let errors = {};
                              if (!values) {
                                errors = 'Required';
                              }/*else if (
                                !/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/i.test(values)
                              ) {
                                errors = 'Invalid number type';
                              }*/
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
                        <form onSubmit={handleSubmit}>
                        {Object.keys(t).map((key, index) => {values[key]=t[key]})}
                        <div className="row">
                        {
                            Object.keys(t).map((key, index) => ( 
                            <div className="col">
                                <input
                                    class="form-control"
                                    id = "odds-info"
                                    placeholder="Odd"
                                    type="text"
                                    onChange={handleChange}
                                    name={key}
                                    onBlur={handleBlur}
                                    value={values[key]}
                                />
                        </div>
                        ))}
                    </div>
          <label className="buttonsub">
          <button type="submit" >Save Changes</button>
          </label>
        </form>
      )}
            </Formik>
            </div>
        </div>
    );
}


export default EditOdds;