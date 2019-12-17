import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./login/Login";
import SignUp from "./signup/Signup";
import Dashboard from './dashboard/Dashboard';

import './App.css';

const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const api_key = localStorage.getItem('_api_key');
    if(api_key) {
      setLoggedIn(true);
    }
  }, []);
  const handleUpdateLogin = (isLoggedIn) => {
    if(isLoggedIn)
      setLoggedIn(true);
  }
  return (
    <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>Thinkific</Link>
          {
            !loggedIn ?
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                  </li>
                </ul>
              </div>
            : null 
          }
        </div>
      </nav>

      <div className="main-wrapper">
        
          <Switch>
            <Route exact path='/' render={(props) => <Login {...props} handleUpdateLogin={handleUpdateLogin} />} />
            <Route path="/sign-in" render={(props) => <Login {...props} handleUpdateLogin={handleUpdateLogin} />} />
            <Route path="/sign-up" render={(props) => <SignUp {...props} handleUpdateLogin={handleUpdateLogin} />} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>

      </div>
    </div></Router>
  );
}

export default App;
