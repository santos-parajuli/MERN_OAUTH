import React, { Component } from 'react';
import PropTypes from "prop-types";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import Button from '@material-ui/core/Button';


export class Navbar extends Component {

    check = () =>{
         if (this.props.auth.isAuthenticated) {
            return (
                    <p>{this.props.auth.user.name}</p>
            )  
         }
        else{
            return (
                <a href="/login" >
                    <Button style={{textDecoration:"none",color:"white"}}>Login</Button>
                </a>
            )
        }
    }
   
    render() {
        
        return (
            <AppBar position="fixed"  style={{padding:"0px"}}>
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow:"1"}} >
                        MERN AUTHENTICATION
                    </Typography>
                    {this.check()}
                </Toolbar>
               

            </AppBar>
        );
    }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps,{logoutUser}) (Navbar);
 
