import { TextField,Button,Typography, Container,Link, Divider } from '@material-ui/core'
import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import FacebookIcon from '@material-ui/icons/Facebook';
import DividerWithText from './DividerWithText';
import GTranslateIcon from '@material-ui/icons/GTranslate';


export class login extends Component {
    constructor() {
        super();
        this.state = {email: "",password: "",errors: {},isLogging:false};
    }
    // If logged in and user navigates to Login page, should redirect them to dashboard
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ isLogging:false });
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/");
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.setState({ isLogging:true });
        this.props.loginUser(userData);

    };
     facebookLogin = e => {
        e.preventDefault();
        this.setState({ isLogging:true });
        window.open("http://localhost:5000/api/auth/facebook", "_self") 

    };
    googleLogin = e => {
        e.preventDefault();
        this.setState({ isLogging:true });
        window.open("http://localhost:5000/api/auth/google", "_self") 
    };
    render() {
         const { errors,isLogging } = this.state;
        return (
        <Container maxWidth="xs" style={{position:"absolute" ,left:"50%",top: "50%",transform: "translate(-50%, -50%)",padding:"50px" }} >
            <Typography component="h1" variant="h5">Sign in</Typography>
            <form style={{marginTop:"10px"}} onSubmit={this.onSubmit}>
                <TextField id="email"  type="email"  fullWidth label="Email" variant="outlined" required autoFocus onChange={this.onChange} error={(errors.email?true:false)} helperText={errors.email} style={{marginBottom:"15px"}}/>
                <TextField id="password"  type="password" fullWidth label="Password" variant="outlined"  required onChange={this.onChange} error={(errors.password?true:false)} helperText={errors.password} style={{marginTop:"15px",marginBottom:"30px"}}  />
                <Button disabled={isLogging} fullWidth variant="contained" color="primary" type="submit">
                    Sign In
                </Button>
                <div style={{margin:"10px",display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
                    <Typography  variant="caption" >Forget Password?</Typography>
                    <Typography  variant="caption" >Don't Have an Account? <Link href="/register" style={{color:"blue"}}>Sign Up</Link></Typography>
                </div>
                <DividerWithText>OR</DividerWithText>
                <div style={{marginTop:"5px",display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
                    <Button  startIcon={<FacebookIcon/>}  fullWidth disabled={isLogging} variant="contained" color="primary" onClick={this.facebookLogin}>
                        facebook
                    </Button>
                    <Button startIcon={<GTranslateIcon/>} fullWidth  variant="contained" disabled={isLogging} style={{marginTop:"15px", backgroundColor:"#db3236",color:"white"}} onClick={this.googleLogin}>
                        google
                    </Button>
                </div>
            </form>

        </Container>   
        )
    }
}

login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{loginUser }) (login);