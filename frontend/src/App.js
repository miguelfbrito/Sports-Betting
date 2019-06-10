import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import './common/global-style.css';

// Components
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import EventsSummary from './components/EventsSummary/EventsSummary';
import makebet from './components/MakeBet/makebet';

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
            <Route exact path="/events" component={EventsSummary} />
            <Route exact path="/login" component={Login} />
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
