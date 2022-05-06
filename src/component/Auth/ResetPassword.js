import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from './auth';

function ResetPassword() {
    const {token} = useParams()
    const[passwordError, setPasswordError] = useState("");
    const [resetPasswordError, setResetPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const {getAccessToken} = useAuth();
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let password = data.get('password');

        let validPassword = validatePassword(password);

        if(!validPassword){
            return;
          }


        // idiotic error which i don't get, it returns the oposite of what actuall happened
        // so in unsucessful it somehow returns success=true
        resetPasswordRequest(token, password)
        .then(success => {
            console.log(success)
            if(success){
                setResetPasswordError("Something went wrong.")
            }else{
                navigate("/account", {replace:true});
            }
        })
 

    }

    const resetPasswordRequest = async (token, password) => {
        let success;

        await fetch('https://cors-everywhere-me.herokuapp.com/http://18.170.74.59:8080/api/user/set-password', {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
              'Cache': 'no-cache',
              'Authorization' : "Bearer " + getAccessToken()
            },
            body: new URLSearchParams({
                'token': token,
                'password': password,
            })})
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
              success = true;
            })
            .catch((error) => {console.log("RROR" + error); success = false});

        return success;
    }

function validatePassword(password){
    console.log(password)
    if(password.length > 255 || password.length <= 0){
        setPasswordError("Password no more than 255 or less than 0");
        return false;
      }
  
      setPasswordError("");
      return true;
}

function handleClickShowPassword(){
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



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
          Reset your password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
           <TextField
            margin="normal"
            error={passwordError != ""}
            helperText={passwordError}
            onChange={validatePassword}
            required
            fullWidth
            name="password"
            label="New password"
            type={showPassword ? "text" :"password"}
            id="password"
            autoComplete="current-password"
            InputProps={{            
              endAdornment:(
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
            )}}
          />
        <Typography variant="overline" display={resetPasswordError != "" ? "block" : "none"}>
          {resetPasswordError}
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
            Reset password
          </Button>
          <Grid container>
            <Grid item xs>

            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default ResetPassword