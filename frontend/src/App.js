import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import './common/global-style.css';

// Components
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import EventsSummary from './components/EventsSummary/EventsSummary';
import CheckBets from './components/CheckBets/CheckBetsSummary';
import ManageUsers from './components/ManageUser/ManageUser';
import AnEventSummary from './components/AnEventSummary/AnEventSummary';
import AdminSummary from './components/AdminSummary/AdminSummary';
import UserRegister from './components/Login/Register/Register';
import AdminEdit from './components/AdminSummary/EditEvent/EditEvent';
import EditOdds from './components/AdminSummary/EditOdds/EditOdds';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AdminRoute from './components/PrivateRoute/AdminRoute';
import AddEvents from './components/AdminSummary/AddEvents/AddEvents';



function App() {

  const navbarRef = React.createRef();

  const updateBalance = (newBalance) => {
    navbarRef.current.updateBalance(newBalance)
    // navbarRef.current.print("ASDASDASDADS");
  }


  return (
    <div>
      <div className=""></div>
      {/* TODO: Add navbar */}
      <Router>
        <Navbar ref={navbarRef} />
        <div className="container mt-4">
          <div className="row">
            <div className="col-sm-12">
              <Switch>
                <Route exact path="/" render={(props) => <EventsSummary {...props} updateBalance={updateBalance} />} />
                <Route exact path="/events" render={(props) => <EventsSummary {...props} updateBalance={updateBalance} />} />
                {/* <PrivateRoute exact path="/events/:eventOid" component={AnEventSummary} /> */}
                <Route exact path="/events/:eventOid" render={(props) => <AnEventSummary {...props} updateBalance={updateBalance} />} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/bets" component={CheckBets} />
                <PrivateRoute exact path="/user" component={ManageUsers} />
                {/* <Route exact path="/admin" component={AdminSummary} /> */}
                <AdminRoute exact path="/admin" component={AdminSummary} />
                <Route exact path="/register" component={UserRegister} />
                <AdminRoute exact path="/admin/edit/:eventOid" component={AdminEdit} />
                <AdminRoute exact path="/admin/update/:eventOid" component={EditOdds} />
                <AdminRoute exact path="/admin/createevent" component={AddEvents} />
                <Route component={EventsSummary} />
              </Switch>
            </div>
          </div>
          <footer style={{ marginTop: '25px' }}></footer>
        </div>
      </Router>
    </div >
  );

}

export default App;
