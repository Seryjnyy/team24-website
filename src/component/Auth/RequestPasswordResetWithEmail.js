import React, {useState}from 'react'
import jwt_decode from "jwt-decode";
import { useAuth } from './auth';
import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Copyright from '../Copyright';
import { useNavigate, Link as RouteLink, useLocation } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function RequestResetPasswordWithEmail() {
    const[emailError, setEmailError] = useState("");
    const[loginError, setLoginError] = useState("");
  
    let navigate = useNavigate();

    function validateEmail(email){
      if(email.length > 255 || email.length <= 0){
        setEmailError("Email no more than 255 or less than 0");
        return false;
      }

      setEmailError("");
      return true;
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
  
      let email = data.get('email');
  
      let validEmail = validateEmail(email);
  
      if(!validEmail){
        return;
      }

      resetPasswordRequest(email).then(success => {
        if(!success){
            navigate("/login", {replace:true});
        }else{
          setLoginError("Sorry something went wrong try again later.");
        }
      })
      
    };
  

    const resetPasswordRequest = async (username) => {
        let success;

        await fetch('http://18.170.74.59:8080/api/user/reset-password?username='+ username, {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
              'Cache': 'no-cache',
            },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
              success = true;
            })
            .catch((error) => {console.log("RROR" + error); success = false});

        return success;
    }


  return (
    <Container component="main" maxWidth="xs">
      
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Request to reset password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            error={emailError != ""}
            helperText={emailError}
            onChange={validateEmail}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

        <Typography variant="overline" display={loginError != "" ? "block" : "none"}>
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
          >
            Request
          </Button>
          <Grid container>
            <Grid item xs>  

            </Grid>
            <Grid item>
              <RouteLink to="/register">Log in</RouteLink><br></br>
              <RouteLink to="/register">Register</RouteLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>


  //   <>
  //       <Button
  //   fullWidth
  //   onClick={handleClick}
  //   disabled={attempted ? true : false}
  //   variant="contained"
  //   sx={{ mt: 3, mb: 2 }}
  // >
  //   Reset password
  // </Button>
  // <Typography>{message}</Typography>
  //   </>
  )
}

export default RequestResetPasswordWithEmail