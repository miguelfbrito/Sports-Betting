import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import './common/global-style.css';

// Components
import Navbar from './components/Navbar/Navbar';
import EventsSummary from './components/EventsSummary/EventsSummary';

function App() {
  return (
    <div>
      {/* TODO: Add navbar */}
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Switch>
            <Route exact path="/events" component={EventsSummary} />
            {/* <Route path="/" component={Dashboard} /> */}
          </Switch>
        </div>
      </Router>
    </div >
  );
}

export default App;
