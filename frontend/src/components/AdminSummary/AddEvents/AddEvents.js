import React, {Component} from 'react';

import './AddEvents.css';
import { Formik } from 'formik';
import Api from '../../../api/api';


class AddEvents extends Component {
  constructor(props) {
      super(props);
      this.state = { createdEvent: false}
  }

  componentDidMount() {
  
  }


render() {

  //Adaptar para inputs com o valor igual ao que já possuí
  return (
    <div className="row">
      <div className="addevents-form">
          <Formik
          initialValues={{ sport: '', name: '', premium: '', bdate: '', edate: '', description : ''}}
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
          if(this.state.premium=="Premium"){
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
          if (!values.description) {
            errors.description = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const a = await Api.fetchCreateNewEvent(values);
          //Colocar a apresentar as mensagens de erro
          if(a.success==true){
            this.setState({createdEvent: true});
            alert(this.state.createdEvent);
          }else{
            alert(this.state.createdEvent);
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
            <select name="product" defaultValue={1} className="eventpremium" onChange={(event) => {
              var id = event.nativeEvent.target.selectedIndex;
              values.premium = event.nativeEvent.target[id].text;
              }}
              onBlur={handleBlur} >
              <option value="1" disabled>Premium</option>
              <option value="2">False</option>
              <option value="3">True</option>
            </select>
            <div>
              <p className="error-info">{errors.premium && touched.premium && errors.premium}</p>
              </div>
            </div>
            <div className="add-event">
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