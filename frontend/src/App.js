import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import './common/global-style.css';

// Components
import Navbar from './components/Navbar/Navbar-login';
import Login from './components/Login/Login';
import EventsSummary from './components/EventsSummary/EventsSummary';
import makebet from './components/MakeBet/makebet';
import checkbets from './components/CheckBets/CheckBetsSummary';
import manageusers from './components/ManageUser/ManageUser';
import AnEvent from './components/AnEventSummary/AnEventSummary';
import Admin from './components/AdminSummary/AdminSummary';
import createevent from './components/AdminSummary/AddEvents/AddEvents';
import register from './components/Login/Register/Register';
import edit from './components/AdminSummary/EditEvent/EditEvent';

function App() {
  return (
    <div>
      <div className="bg-image"></div>
      {/* TODO: Add navbar */}
      <Router>
        <Navbar />
        <div className="container mt-4">
        <div className="row">
        <div className="col-sm-9">
          <Switch>
            <Route exact path="/anevent" component={AnEvent} />
            <Route exact path="/events" component={EventsSummary} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/bets" component={checkbets} />
            <Route exact path="/user" component={manageusers} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/admin/createevent" component={createevent} />
            <Route exact path="/register" component={register} />
            <Route exact path="/admin/edit" component={edit} />
            {/* <Route path="/" component={Dashboard} /> */}
          </Switch>
        </div>
        <div className="col-sm-3 pr-0">
        <Switch>
            <Route exact path="/events" component={makebet} />
            {/* <Route path="/" component={Dashboard} /> */}
          </Switch>
        </div>
        </div>
        </div>
      </Router>
    </div >
  );
}

export default App;
