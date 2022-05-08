import { Box, Button, Card, CardActions, CardContent, Slider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import AccountDataCard from './AccountDataCard';
import jwt_decode from "jwt-decode";
import { useAuth } from '../Auth/auth';

function UserAuto(props) {
    const [paused, setPaused] = useState(null);
    const [isSendingOrFailed, setIsSendingOrFailed] = useState(false);
    const { data, status } = useQuery("userPreferenceDemand", fetchUsers);
    const auth = useAuth();

    async function fetchUsers() {
        let token = auth.getAccessToken();
        console.log(token)
        let username = jwt_decode(token).sub;
        const res = await fetch("https://5gvn9bmfzi.execute-api.eu-west-2.amazonaws.com/UserPreferences?username=" + username, { headers: { "Authorization": "Bearer " + token } });
        return res.json();
    }

    useEffect(() => {
        setPaused(data?.upaused);
    }, [data])

    const savePreference = () => {
        console.log("uhhh");
    const token = auth.getAccessToken();

    let username = jwt_decode(token).sub;
    // grey button whilst fetching
    // optimistically update paused
    setIsSendingOrFailed(true);
    setPaused(!paused);
    fetch('https://pem9g8w8qk.execute-api.eu-west-2.amazonaws.com/UserAutoUpdate?username='+username+"&pause="+!paused, {
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + token,
        },
    })
        .then((response) => { console.log(response.status); setIsSendingOrFailed(false)}).catch((error) => { console.log(error); setPaused(!paused)}); // if it fails set it back
    }

    let cardComponent;
    if (status === "loading") {
        cardComponent = <Typography>Loading...</Typography>;
    } else if (status === "error" || data?.httptatus != null) {
        cardComponent = <Typography>Sorry, something went wrong...</Typography>;
    } else {
        cardComponent = <Typography>Automatic buying/selling : {paused ? "paused" : "running"}</Typography>

    }

    return (
        <AccountDataCard cardContent={
            <>
                <Typography sx={{fontWeight: 'bold'}}>Auto action</Typography>
                {cardComponent}
            </>} cardAction={data && <Button size="medium" onClick={savePreference} disabled={isSendingOrFailed} sx={{mt:3}}>{paused ? "Un-pause" : "pause"}</Button>}
        />
    )
}

export default UserAuto