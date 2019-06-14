import React, { Component } from 'react';

import './EditUser.css';

import { Formik } from 'formik';
import Api from '../../../api/api';


class EditUser extends Component {
  constructor(props) {
      super(props);
      this.state = { password:''}
  }

  async componentDidMount() {
      
      const t = 1;

      let userdetails = await Api.fetchUserDetails(1);

      this.setState(userdetails);
      console.log(this.state)
  }


render() {
        //TODO: Adicionar um scroll para os eventos
        const { users } = this.state;
        return (
        <div className="row">
        <div className="edit-form">
        <Formik
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
        <div className="edit-user">
            <p className="">Password:</p>
            <input
              className="editpassword"
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={this.state.password}
            />
            <p className="error-info">{errors.password && touched.password && errors.password}</p>
          </div>
        <div className="edit-user">
            <p className="">Name:</p>
            <input
                className="editname"
                placeholder="Name"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={this.state.name}
            />
            <p className="error-info">{errors.name && touched.name && errors.name}</p>
          </div>
          <div className="edit-user">
            <p className="">Email:</p>
            <input
                className="editemail"
                placeholder="user@email.com"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={this.state.email}
            />
            <p className="error-info">{errors.email && touched.email && errors.email}</p>
          </div>
          <div className="button-container">
          <button className="btn-1" type="submit" disabled={isSubmitting}>
            Save Changes
          </button>
          </div>
        </form>
      )}
    </Formik>
        </div>
        </div>
    );
  }
}
export default EditUser;