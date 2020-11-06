import { TextField,Button,Typography, Container } from '@material-ui/core'
import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";


export class signup extends Component {
    constructor() {
        super();
        this.state = {name:"",email: "",password: "",password1:"",isSigningup:false,errors: {}};
    }

    // If logged in and user navigates to signup page, should redirect them to home
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isSigningup:false});
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        switch(e.target.id){
            case "password":
                if(e.target.value.length < 6){
                    this.setState({errors:{password:"Password should be at least 6 character long."}})
                }
                else{this.setState({errors:{}})}
                break;
            case "password1":
                console.log(this.state.password)
                if(e.target.value !== this.state.password){
                    this.setState({errors:{password1:"Password didn't matched."}})
                }
                else{this.setState({errors:{}})}
                break;
            default:
                return 0;
        }
    };

    onSubmit = e => {
        e.preventDefault();
            const userData = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            };
        this.setState({isSigningup:true})
        this.props.registerUser(userData,this.props.history);
    };

    render() {
         const { errors,isSigningup } = this.state;
        return (
        <Container maxWidth="xs" style={{position:"absolute" ,left:"50%",top: "50%",transform: "translate(-50%, -50%)",padding:"50px" }} >
            <Typography component="h1" variant="h5">Sign Up</Typography>
            <form style={{marginTop:"10px"}} onSubmit={this.onSubmit}>
                <TextField id="name"  type="text"  fullWidth label="Name" variant="outlined" required autoFocus onChange={this.onChange} error={(errors.name?true:false)} helperText={errors.name} style={{marginBottom:"15px"}}/>
                <TextField id="email"  type="email"  fullWidth label="Email" variant="outlined" required onChange={this.onChange} error={(errors.email?true:false)} helperText={errors.email} style={{marginBottom:"15px"}}/>
                <TextField id="password"  type="password" fullWidth label="Password" variant="outlined"  required onChange={this.onChange} error={(errors.password?true:false)} helperText={errors.password} style={{marginBottom:"15px"}}  />
                <TextField id="password1"  type="password" fullWidth label="Confirm Password" variant="outlined"  required onChange={this.onChange} error={(errors.password1?true:false)} helperText={errors.password1} style={{marginBottom:"15px"}}  />
                <Button disabled={isSigningup} fullWidth variant="contained" color="primary" type="submit">
                    Sign Up
                </Button>
            </form>
        </Container>   
        )
    }
}

signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{registerUser}) (signup);

