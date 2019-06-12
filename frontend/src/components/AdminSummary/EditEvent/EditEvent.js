import React from 'react';

import '../AddEvents/AddEvents.css';

import { Formik } from 'formik';


const EditEvent = (props) => {

const bt = {sport: 'Futebol', name: 'A x B', premium: 'No', bdate: '2019-01-02T00:00', edate: '2019-01-02T20:00', description: 'Football game'}


    return (
        <div className="row">
        <div style={{ height: '500px', overflowY: "scroll" }} className="Bettype-odds">
        <Formik
      initialValues={{ sport: bt.sport, name: bt.name, premium: bt.premium, bdate: bt.bdate, edate: bt.edate, description: bt.description }}
      validate={values => {
        let errors = {};
        if (!values.sport) {
          errors.sport = 'Required';
        }
        if (!values.name) {
            errors.name = 'Required';
        }
        if (!values.premium) {
            errors.premium = 'Required';
        }
        if (!values.bdate) {
            errors.bdate = 'Required';
        }
        if (!values.edate) {
            errors.edate = 'Required';
        }else if(values.bdate && values.bdate){
            if(values.bdate>values.edate){
                errors.edate = "Must be after begining date ";
            }
        }
        if (!values.description ) {
            errors.description = 'Required';
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
        <form onSubmit={handleSubmit}>
        <label className="label-text">
            <label className="input-info">
            <p className="">Sport:</p>
            <input
                placeholder="Sport"
                type="text"
                name="sport"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.sport}
            />
            <p className="error-info">{errors.sport && touched.sport && errors.sport}</p>
            </label>
          </label>
        <label className="label-text">
            <label className="input-info">
            <p className="">Name:</p>
            <input
                placeholder="Team1 x Team2"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
            />
            <p className="error-info">{errors.name && touched.name && errors.name}</p>
            </label>
          </label>
          <label className="label-text">
            <label className="input-info">
            <p className="">Premium:</p>
            <input
                placeholder="Yes/no"
                type="text"
                name="premium"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.premium}
            />
            <p className="error-info">{errors.premium && touched.premium && errors.premium}</p>
            </label>
          </label>
          <label className="label-text">
            <label className="input-info">
            <p className="">Begin date:</p>
            <input
                type="datetime-local"
                name="bdate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bdate}
            />
            <p className="error-info">{errors.bdate && touched.bdate && errors.bdate}</p>
            </label>
          </label>
          <label className="label-text">
            <label className="input-info">
            <p className="">End date:</p>
            <input
                type="datetime-local"
                name="edate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.edate}
            />
            <p className="error-info">{errors.edate && touched.edate && errors.edate}</p>
            </label>
            </label>
          <label className="label-text">
            <label className="input-info">
            <p className="">Desciption:</p>
            <input
                placeholder="Description of event"
                type="text"
                id="description"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
            />
            <p className="error-info">{errors.description && touched.description && errors.description}</p>
            </label>
          </label>
          <label className="buttonsub">
          <button type="submit" disabled={isSubmitting}>
            Save Changes
          </button>
          </label>
        </form>
      )}
    </Formik>
        </div>
        </div>
    );
}

export default EditEvent;