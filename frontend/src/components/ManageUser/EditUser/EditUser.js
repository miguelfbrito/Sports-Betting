import React from 'react';

import './EditUser.css';

import { Formik } from 'formik';


const EditUser = (props) => {

    return (
        <div className="row">
        <div className="Bettype-odds">
        <Formik
      initialValues={{password: "joao", name: "João Pinto", email: "user@email.com"}}
      validate={values => {
        let errors = {};
        if (!values.password) {
          errors.password = 'Required';
        }
        if (!values.name) {
            errors.name = 'Required';
        }
        if (!values.email) {
            errors.email = 'Required';
        }else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
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
            <p className="">Password:</p>
            <input
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
            />
            <p className="error-info">{errors.password && touched.password && errors.password}</p>
            </label>
          </label>
        <label className="label-text">
            <label className="input-info">
            <p className="">Name:</p>
            <input
                placeholder="Name"
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
            <p className="">Email:</p>
            <input
                placeholder="user@email.com"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
            />
            <p className="error-info">{errors.email && touched.email && errors.email}</p>
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

export default EditUser;