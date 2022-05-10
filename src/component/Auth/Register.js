import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, Link as RouteLink } from 'react-router-dom';
import Copyright from '../Copyright';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthPage from '../common/AuthPage';
import UserIcon from '../../images/iconUser.png'
import MailIcon from '../../images/iconEmail.png'
import PassIcon from '../../images/iconPassword.png'
import {useAuth} from "./auth";


function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registerError, setRegisterError] = useState("");

  const auth = useAuth();
  
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    let email = data.get('email');
    let password = data.get('password');
    let firstname = data.get('firstName');
    let lastname = data.get('lastName');


    console.log({
      email: email,
      password: password,
      firstName: firstname,
      lastName: lastname
    });

    let validFirstname = validateFirstname(firstname);
    let validLastname = validateLastname(lastname);
    let validEmail = validateEmail(email);
    let validPassword = validatePassword(password);

    if (!validFirstname || !validLastname || !validEmail || !validPassword) {
      return;
    }

    auth.register(firstname, lastname, email, password).then(success => {
      if(success){
        // need new page to tell user that email has been sent
        navigate('/login', {replace:true});
      }else{
        // deal with failed register
        setRegisterError("Sorry, something went wrong...");  
      }
    });

  };

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  function validateFirstname(firstname) {
    if (firstname.length > 255 || firstname.length <= 0) {
      setFirstnameError("First name no more than 255 or less than 0");
      return false;
    }

    setFirstnameError("");
    return true;
  }

  function validateLastname(lastname) {
    if (lastname.length > 255 || lastname.length <= 0) {
      setLastnameError("Last name no more than 255 or less than 0");
      return false;
    }

    setLastnameError("");
    return true;
  }

  function validateEmail(email) {
    if (email.length > 255 || email.length <= 0) {
      setEmailError("Email no more than 255 or less than 0");
      return false;
    }

    setEmailError("");
    return true;
  }

  function validatePassword(password) {
    if (password.length > 255 || password.length <= 0) {
      setPasswordError("Password no more than 255 or less than 0");
      return false;
    }

    setPasswordError("");
    return true;
  }

  return (
    <Grid container sx={{mt:8}} >
      <Grid item md={5} lg={6} sx={{display:{xs:"none", md:"block"}}}>
        <AuthPage text1='Join Now' text2='Register to continue access pages'/>
      </Grid>
      <Grid item xs={12} md={7} lg={6}>
        
      <Container component="main" maxWidth="xs">
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
          Create an Account
        </Typography>
        <p className='text-center mt-3' style={{ color: '#929EBA', width: '80%', margin: 'auto' }}>
            Enter your details to create an account.
          </p>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
               style={{background:'#F9F9F9'}}
                error={firstnameError != ""}
                helperText={firstnameError}
                onChange={validateFirstname}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                InputProps={{
                  style: {
                    paddingLeft: "40px"
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <img style={{ position: 'absolute', left: '10px', marginRight: '20px' }} src={UserIcon} alt='' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
               style={{background:'#F9F9F9'}}
                error={lastnameError != ""}
                helperText={lastnameError}
                onChange={validateLastname}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                InputProps={{
                  style: {
                    paddingLeft: "40px"
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <img style={{ position: 'absolute', left: '10px', marginRight: '20px' }} src={UserIcon} alt='' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               style={{background:'#F9F9F9'}}
                error={emailError != ""}
                helperText={emailError}
                onChange={validateEmail}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                InputProps={{
                  style: {
                    paddingLeft: "40px"
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <img style={{ position: 'absolute', left: '10px', marginRight: '20px' }} src={MailIcon} alt='' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               style={{background:'#F9F9F9'}}
                error={passwordError != ""}
                helperText={passwordError}
                onChange={validatePassword}
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                InputProps={{
                  style: {
                    paddingLeft: "40px"
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <img style={{ position: 'absolute', left: '10px', marginRight: '20px' }} src={PassIcon} alt='' />
                    </InputAdornment>
                  ),
                  endAdornment: (
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
                  )
                }}
              />
                          <Typography variant="overline" sx={{color:"red"}} display={registerError != "" ? "block" : "none"}>
              {registerError}
            </Typography>

            </Grid>
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{background: 'linear-gradient(90deg, #008720 0%, #004A47 100%)'}}
          >
            Register
          </Button>
          {/* <p className='text-center mt-3' style={{ color: '#929EBA', width: '80%', margin: 'auto' }}>
            By pressing the Sign Up button you accept our terms and conditions.
          </p> */}
          <div className='text-center mt-5'>
             <span style={{fontWeight:'bold'}}>Already have an Account? <RouteLink to="/login" className='mylink'> Login Now</RouteLink></span>
              
          </div>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
      </Grid>
    </Grid>

  )
}

export default Register