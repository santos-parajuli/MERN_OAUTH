import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Button, Container } from "@material-ui/core";
import { Router } from "react-router-dom";

class Dashboard extends Component {
    
    // If not logged in and user is redirected to Login page.
    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/login");
        }
        console.log(Router.query);

   
    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        window.location.reload(false);
    };

    render() {
        const { user } = this.props.auth;
        return (
            <Container fixed maxWidth="lg" style={{textAlign:"center",padding:"50px" }} >
                <h1>Welcome to MERN Authentication App.</h1>
                <h2>{user.emailAddress}</h2>                
                <Button variant="contained" style={{color:"white",backgroundColor:"#91b2eb"}} onClick={this.onLogoutClick}>
                Logout
                </Button>
            </Container>
        );
    }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,{logoutUser})(Dashboard);
