import { Box, Button, Card, CardActions, CardContent, Slider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import AccountDataCard from './AccountDataCard';
import jwt_decode from "jwt-decode";
import { useAuth } from '../Auth/auth';

function UserAutoOverride(props) {
    const [isSendingOrFailed, setIsSendingOrFailed] = useState(false);
    const [autoOverride, setAutoOverride] = useState(null);
    const { data, status } = useQuery("userPreferenceDemand", fetchUsers);
    const auth = useAuth();

    async function fetchUsers() {
        let token = auth.getAccessToken();
        let username = jwt_decode(token).sub;
        const res = await fetch("https://5gvn9bmfzi.execute-api.eu-west-2.amazonaws.com/UserPreferences?username=" + username, { headers: { "Authorization": "Bearer " + token } });
        return res.json();
    }

    useEffect(() => {
        setAutoOverride(data?.uoverride);
    }, [data])

    const handleChange = (event, newValue) => {
        setAutoOverride(newValue);
    }

    const marks = [
        {
            value: -1,
            label: "Buy"
        },
        {
            value: 0,
            label: "Default"
        },
        {
            value: 1,
            label: "Sell"
        },
    ]

    const savePreference = () => {
        if (autoOverride > 1 || autoOverride < -1)
            return;

        const token = auth.getAccessToken();

        const username = jwt_decode(token).sub;
        setIsSendingOrFailed(true);
        fetch('http://18.170.74.59:8080/api/user/preferences/auto-bias/update', {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache': 'no-cache',
            },
            body: new URLSearchParams({
                'username': jwt_decode(token).sub,
                'bias': autoOverride,
            })
        })
            .then((response) => {console.log(response.status); setIsSendingOrFailed(false);}).catch((error) => { console.log(error); });
    }

    let cardComponent;
    if (status === "loading") {
        cardComponent = <Typography>Loading...</Typography>;
    } else if (status === "error" || data?.httptatus != null) {
        cardComponent = <Typography>Sorry, something went wrong...</Typography>;
    } else {
        cardComponent =
            <Slider
                sx={{ maxWidth: 200 }}
                value={autoOverride ?? 0}
                onChange={handleChange}
                min={-1}
                max={1}
                step={1}
                marks={marks}
                track={false}
            />;
    }

    return (
        <AccountDataCard cardContent={
            <>
                <Typography sx={{fontWeight: 'bold'}}>Auto action preference</Typography>
                {cardComponent}
            </>} cardAction={data && <Button size="medium" onClick={savePreference} disabled={isSendingOrFailed}>Save preference</Button>}
        />
    )
}

export default UserAutoOverride