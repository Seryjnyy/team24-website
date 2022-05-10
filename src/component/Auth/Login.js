import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, Link as RouteLink, useLocation } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthPage from '../common/AuthPage';
import MailIcon from '../../images/iconEmail.png'
import PassIcon from '../../images/iconPassword.png'
import GoogleImg from '../../images/google.png'
import FacebookImg from '../../images/facebook.png'
import {useAuth} from "./auth";

function Login() {
  const[showPassword, setShowPassword] = useState(false);

  const[emailError, setEmailError] = useState("");
  const[passwordError, setPasswordError] = useState("");
  const[loginError, setLoginError] = useState("");
  
  const location = useLocation();
  const redirectPath = location.state?.path || '/dashboard';

  const auth = useAuth();
  
  const navigate = useNavigate();

  function handleClickShowPassword(){
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let email = data.get('email');
    let password = data.get('password');

    console.log({
      email: email,
      password: password,
    });

    let validEmail = validateEmail(email);
    let validPassword = validatePassword(password);

    if(!validEmail || !validPassword){
      return;
    }
    
    auth.login(email, password).then(success => {
      if(success){
        navigate(redirectPath, {replace:true});
      }else{
        // deal with failed login
        setLoginError("Sorry, something went wrong...");  
      }
    });
   
    

    // attemp login
    // login(email, password).then(loggedIn => {

    //   if(loggedIn){
    //     navigate("/dashboard");
    //   }else{
    //     setLoginError("Sorry something went wrong, try again later.");
    //   }

      
    // });
  };

  function validateEmail(email){
    if(email.length > 255 || email.length <= 0){
      setEmailError("Email no more than 255 or less than 0");
      return false;
    }

    // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if ( re.test(email) ) {
    //   console.log("he valid")
    //     // this is a valid email address
    //     // call setState({email: email}) to update the email
    //     // or update the data in redux store.
    //     setEmailError("");
    // }
    // else {
    //     // invalid email, maybe show an error to the user.
    //     setEmailError("This ain't a email bro");
    //     return false;
    // }


    setEmailError("");
    return true;
  }

  function validatePassword(password){
    if(password.length > 255 || password.length <= 0){
      setPasswordError("Password no more than 255 or less than 0");
      return false;
    }

    setPasswordError("");
    return true;
  }

  


  return (
    

    <Grid container sx={{mt:8}} >
      <Grid item md={5} lg={6} sx={{display:{xs:"none", md:"block"}}}>
      <AuthPage text1='Welcome Back' text2='Sign in to continue access pages' />
      </Grid>

      <Grid item xs={12} md={7} lg={6}>
      <Container component="main" maxWidth="xs" className='login' >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar> */}
          <Typography component="h1" variant="h5" style={{color:'#2B395B', fontWeight:'bold'}}>
            Login With Email
          </Typography>
          <p className='text-center mt-3' style={{ color: '#929EBA', width: '80%', margin: 'auto' }}>
            Enter your details to login.
          </p>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              sx={{bgcolor:'#F9F9F9'}}
              margin="normal"
              error={emailError != ""}
              helperText={emailError}
              onChange={validateEmail}
              required
              fullWidth
              label='Email Address'
              id="email"
              name="email"
              autoComplete="email"
              autoFocus

              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <img style={{ position: 'absolute', left: '10px', marginRight: '20px' }} src={MailIcon} alt='' />
                  </InputAdornment>
                )
              }}

            />
            <TextField
              margin="normal"
              error={passwordError != ""}
              helperText={passwordError}
              onChange={validatePassword}
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              sx={{bgcolor:'#F9F9F9'}}
              InputProps={{
                startAdorment: (
                  <>
                    <InputAdornment position="start">
                      <img style={{ position: 'absolute', left: '10px', marginRight: '20px' }} src={PassIcon} alt='' />
                    </InputAdornment>
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  </>
                )
              }}
            />
            <Typography variant="overline" sx={{color:"red"}}  display={loginError != "" ? "block" : "none"}>
              {loginError}
            </Typography>

            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{background: 'linear-gradient(90deg, #008720 0%, #004A47 100%)'}}
            >
              Sign In
            </Button>
            {/* <p className='text-center'>Forgot your password? <RouteLink to="/reset-password">Reset here</RouteLink></p> */}
            <div className='d-flex align-items-center mt-5 justify-content-between'>
              <div>
                <img style={{marginRight:'20px'}} src={GoogleImg} alt="" />
                <img  src={FacebookImg} alt="" />
              </div>
              <div className='text-center'>
                <span style={{fontWeight:'bold'}}>Don't have an Account? <RouteLink to="/register" className='mylink'>Register</RouteLink></span>
              </div>
            </div>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
        </Grid>
    </Grid>
  )
}

export default Login