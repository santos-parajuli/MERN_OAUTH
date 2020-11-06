import React, { Component } from 'react'
import jwt_decode from "jwt-decode";
import axios from "axios";
import { setCurrentUser } from "../actions/authActions";
import store from "../store";

export default class Token extends Component {
    componentDidMount(){
    localStorage.jwtToken=this.props.match.params.token
    axios.defaults.headers.common["Authorization"] = this.props.match.params.token;
    const decoded = jwt_decode(this.props.match.params.token);
    console.log(decoded)
    store.dispatch(setCurrentUser(decoded));
    this.props.history.push("/login");
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}
