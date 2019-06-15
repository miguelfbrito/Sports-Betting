import React, {Component} from 'react';

import '../AddEvents/AddEvents.css';
import { Formik } from 'formik';
import Api from '../../../api/api';


class EditEvent extends Component {
  constructor(props) {
      super(props);
      this.state = {sport:""}
  }

  async componentDidMount() {
    const eventToUpdate = await Api.fetchEventDetails(1);
    console.log(eventToUpdate);
    this.setState(eventToUpdate);
    this.setState({sport : eventToUpdate.sport.name});
    console.log(this.state);
  }


render() {

  //Adaptar para inputs com o valor igual ao que já possuí
  return (
    <div className="row">
      <div className="addevents-form">
          <Formik
          validate={values => {
          let errors = {};
          if (!this.values.sport) {
            errors.sport = 'Required';
          }
          if (!this.state.name) {
            errors.name = 'Required';
          }
          if (!this.state.premium) {
            errors.premium = 'Required';
          }
          if(this.state.premium=="Premium"){
            errors.premium = "Select value";
          }
          if (!this.state.bdate) {
            errors.bdate = 'Required';
          }
          if (!this.state.edate) {
            errors.edate = 'Required';
          } else if (this.state.bdate && this.state.bdate) {
            if (this.state.bdate > this.state.edate) {
              errors.edate = "Must be after begining date ";
            }
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const a = await Api.fetchUpdateEvent(this.state);
          //Colocar a apresentar as mensagens de erro
          if(a){
            this.setState({createdEvent: true});
            alert("Event Created");
          }else{
            console.log("Event Already Created");
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
                  onChange={(e) => this.setState({sport: e.target.value})}
                  onBlur={handleBlur}
                  value={this.state.sport}
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
                  onChange={(e) => this.setState({name: e.target.value})}
                  onBlur={handleBlur}
                  value={this.state.name}
              />
              <div>
              <p className="error-info">{errors.name && touched.name && errors.name}</p>
              </div>
            </div>
            <div className="add-event">
            <label>Premium</label>
            <select name="product" defaultValue={this.state.premium} className="eventpremium" onChange={(event) => {
              var id = event.nativeEvent.target.selectedIndex;
              this.setState({premium : event.nativeEvent.target[id].text});
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
                  onChange={(e) => this.setState({startingdate: e.target.value})}
                  onBlur={handleBlur}
                  value={this.startingdate}
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
                  onChange={(e) => this.setState({finishingdate: e.target.value})}
                  onBlur={handleBlur}
                  value={this.state.finishingdate}
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
                  onChange={(e) => this.setState({description: e.target.value})}
                  onBlur={handleBlur}
                  value={this.state.description}>
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

export default EditEvent;