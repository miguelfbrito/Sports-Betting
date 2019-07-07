import React, {Component} from 'react';

import '../AddEvents/AddEvents.css';
import { Formik } from 'formik';
import Api from '../../../api/api';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";


class EditEvent extends Component {
  constructor(props) {
      super(props);
      this.state = {sport:"", eventOid: this.props.match.params.eventOid, sports: []};
      this.addNotification = this.addNotification.bind(this);
      this.notificationDOMRef = React.createRef();
  }

  formatDate = (dateMillis) => {

    const date = new Date(dateMillis);

    //Para ser possível escrever a data usando o mês e não número
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    return date.toISOString().substr(0,16);
}

  async componentDidMount() {
    var newArray=[];
    const allSports = await Api.fetchSports();
    allSports.map(br => {   
      newArray.push(br.name);
    });
    this.setState({sports: newArray});
    
    const eventToUpdate = await Api.fetchEventDetails(this.state.eventOid);
    this.setState(eventToUpdate);
    this.setState({sport: eventToUpdate.sport.name});
    this.setState({startingdate: this.formatDate(this.state.startingdate), finishingdate: this.formatDate(this.state.finishingdate)});
    if(this.state.description===undefined){
      this.state.description="";
    }
    console.log(this.state);
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
    <div className="events-title">
    <div className="events-container shadow">
                <div className="top-bar">
                    <p className="Infodiv">Manage Events</p>
                </div>
<ReactNotification ref={this.notificationDOMRef} />
      <div className="addevents-form">
          <Formik 
          validate={values => {
          let errors = {};
          if (!this.values.sport.name) {
            errors.sport = 'Required';
          }
          if (!this.state.name) {
            errors.name = 'Required';
          }
          if (!this.state.premium) {
            errors.premium = 'Required';
          }
          if(this.state.premium==="Premium"){
            errors.premium = "Select value";
          }
          if (!this.state.startingdate) {
            errors.startingdate = 'Required';
          }
          if (!this.state.finishingdate) {
            errors.finishingdate = 'Required';
          } else if (this.state.startingdate && this.state.startingdate) {
            if (this.state.startingdate > this.state.finishingdate) {
              errors.finishingdate = "Must be after begining date ";
            }
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const a = await Api.fetchUpdateEvent(this.state);
          console.log(a);
          //Colocar a apresentar as mensagens de erro
          if(a){
            this.setState({createdEvent: true});
            window.location.href = '/admin';
            this.addNotification({ title: 'Edit Event', message: 'Event Update with success!', type: 'success' })
          } else {
            this.addNotification({ title: 'Edit Event', message: 'Error on update event!', type: 'danger' })
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
              <select name="product" value={this.state.sport} className="eventpremium" onChange={(event) => {
                      this.state.sport = event.target.value;
                    }}
                      onBlur={handleBlur} >
                      <option value="1" disabled>Sport</option>
                      {this.state.sports.map((sport) => <option key={sport} value={sport}>{sport}</option>)}
                    </select>
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
            <select name="product" value={this.state.ispremium} className="eventpremium" onChange={(event) => {
              var id = event.nativeEvent.target.selectedIndex;
              this.setState({premium : event.nativeEvent.target[id].text});
              }}
              onBlur={handleBlur} >
              <option value="1" disabled>Premium</option>
              <option value="false">false</option>
              <option value="true">true</option>
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
                  value={this.state.startingdate}
              />
              <div>
              <p className="error-info">{errors.startingdate && touched.startingdate && errors.startingdate}</p>
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
              <p className="error-info">{errors.finishingdate && touched.finishingdate && errors.finishingdate}</p>
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
      </div>
  );
}
}

export default EditEvent;