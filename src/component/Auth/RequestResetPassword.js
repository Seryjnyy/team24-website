import { Button, Typography } from '@mui/material'
import React, {useState}from 'react'
import jwt_decode from "jwt-decode";
import { useAuth } from './auth';

function RequestResetPassword() {
    const [attempted, setAttempted] = useState(false);
    const [message, setMessage] = useState("");
    const {getAccessToken} = useAuth();

    function handleClick(event){

        resetPasswordRequest().then(success => {
            if(!success){
                setAttempted(true);
                setMessage("Password request sent, please check your email.");
            }else{
                setMessage("Password request sent, but something went wrong\nplease try again later.");
                // failure
            }
        });

    }

    const resetPasswordRequest = async () => {
        let success;

        await fetch('http://18.170.74.59:8080/api/user/reset-password?username='+ jwt_decode(getAccessToken()).sub, {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
              'Cache': 'no-cache',
              'Authorization' : "Bearer " + getAccessToken()
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
    <>
    <Typography sx={{fontWeight:'bold', mx: 2, mt: 2, fontSize: 18}}>Settings</Typography>
        <Button
    fullWidth
    onClick={handleClick}
    disabled={attempted ? true : false}
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
  >
    Reset password
  </Button>
  <Typography>{message}</Typography>
    </>
  )
}

export default RequestResetPassword