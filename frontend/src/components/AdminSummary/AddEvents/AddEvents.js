import React, { Component } from 'react';

import './AddEvents.css';
import { Formik } from 'formik';
import Api from '../../../api/api';

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class AddEvents extends Component {
  constructor(props) {
    super(props);
    this.state = { createdEvent: false };
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

    //Adaptar para inputs com o valor igual ao que já possuí
    return (
      <div className="row">

        <ReactNotification ref={this.notificationDOMRef} />
        <div className="addevents-form">
          <Formik
            initialValues={{ sport: '', name: '', premium: '', bdate: '', edate: '', description: '' }}
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
              if (values.premium === "Premium") {
                errors.premium = "Select value";
              }
              if (!values.bdate) {
                errors.bdate = 'Required';
              }
              if (!values.edate) {
                errors.edate = 'Required';
              } else if (values.bdate && values.bdate) {
                if (values.bdate > values.edate) {
                  errors.edate = "Must be after begining date ";
                }
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const a = await Api.fetchCreateNewEvent(values);
              //Colocar a apresentar as mensagens de erro
              if (a) {
                this.setState({ createdEvent: true });
                window.location.href = '/admin';
                this.addNotification({ title: 'Success add event', message: 'Success on adding event!', type: 'success' })
              } else {
                this.addNotification({ title: 'Error add event', message: 'Error on adding event!', type: 'danger' })
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
                  <div className="add-event">
                    <label>Sport</label>
                    <input
                      className="eventsport"
                      placeholder="Sport"
                      type="text"
                      name="sport"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.sport}
                    />
                    <div>
                      <p className="error-info">{errors.sport && touched.sport && errors.sport}</p>
                    </div>
                  </div>
                  <div className="add-event">
                    <label>Name of event</label>
                    <input
                      className="eventname"
                      placeholder="Name"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <div>
                      <p className="error-info">{errors.name && touched.name && errors.name}</p>
                    </div>
                  </div>
                  <div className="add-event">
                    <label>Premium</label>
                    <select name="product" defaultValue={1} className="eventpremium" onChange={(event) => {
                      var id = event.nativeEvent.target.selectedIndex;
                      values.premium = event.nativeEvent.target[id].text;
                    }}
                      onBlur={handleBlur} >
                      <option value="1" disabled>Premium</option>
                      <option value="2">false</option>
                      <option value="3">true</option>
                    </select>
                    <div>
                      <p className="error-info">{errors.premium && touched.premium && errors.premium}</p>
                    </div>
                  </div>
                  <div className="add-event">
                    <label>Begin Date</label>
                    <input
                      className="eventbdate"
                      type="datetime-local"
                      name="bdate"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.bdate}
                    />
                    <div>
                      <p className="error-info">{errors.bdate && touched.bdate && errors.bdate}</p>
                    </div>
                  </div>
                  <div className="add-event">
                    <label>End Date</label>
                    <input
                      className="eventedate"
                      type="datetime-local"
                      name="edate"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.edate}
                    />
                    <div>
                      <p className="error-info">{errors.edate && touched.edate && errors.edate}</p>
                    </div>
                  </div>
                  <div className="add-event">
                    <label>Description</label>
                    <textarea rows="4" className="eventdescription"
                      type="text"
                      name="description"
                      placeholder="Description of event"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}>
                    </textarea>
                    <div>
                      <p className="error-info">{errors.description && touched.description && errors.description}</p>
                    </div>
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

export default AddEvents;