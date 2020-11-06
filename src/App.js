import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

import { setCurrentUser } from "./actions/authActions";
import store from "./store";
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashbord';
import Navbar from './components/Navbar';
import Token from './components/Token';

//Always check for token to keep user logged in
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  axios.defaults.headers.common["Authorization"] = token;
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component { 
  render() {
    return (
        <Router>
            <Navbar/>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/register" component={Signup}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/token/:token" component={Token} />
        </Router>
    );
  }
}
export default App;

