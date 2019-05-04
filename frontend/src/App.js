import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import './App.css';

// Components
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div>
      {/* TODO: Add navbar */}
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Switch>
            {/* <Route exact path="" component={} /> */}
            {/* <Route path="/" component={Dashboard} /> */}
          </Switch>
        </div>
      </Router>
    </div >
  );
}

export default App;
