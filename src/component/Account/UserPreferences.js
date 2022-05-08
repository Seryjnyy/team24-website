import { Box, Button, Card, CardActions, CardContent, Slider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import AccountDataCard from './AccountDataCard';
import jwt_decode from "jwt-decode";
import { useAuth } from '../Auth/auth';

function UserPreferences(props) {
    const [preference, setPreference] = useState(null);
    const { data, status } = useQuery("userPreferenceDemand", fetchUsers);
    const auth = useAuth();
    const [isSendingOrFailed, setIsSendingOrFailed] = useState(false);

    async function fetchUsers() {
        let token = auth.getAccessToken();
        console.log(token)
        let username = jwt_decode(token).sub;
        const res = await fetch("https://5gvn9bmfzi.execute-api.eu-west-2.amazonaws.com/UserPreferences?username=" + username, { headers: { "Authorization": "Bearer " + token } });
        console.log("trygin")
        return res.json();
    }

    useEffect(() => {
        setPreference(data?.upreference);
    }, [data])

    const handleChange = (event, newValue) => {
        setPreference(newValue);
    }

    const marks = [
        {
            value: 0,
            label: "Cheap"
        },
        {
            value: 0.5,
            label: "Mid"
        },
        {
            value: 1,
            label: "Green"
        },
    ]

    const savePreference = () => {
        if (preference > 1 || preference < 0)
            return;

        const token = auth.getAccessToken();
        setIsSendingOrFailed(true);
        fetch('http://18.170.74.59:8080/api/user/preferences/energy-mix/update', {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache': 'no-cache',
            },
            body: new URLSearchParams({
                'username': jwt_decode(token).sub,
                'preference': preference,
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
                value={preference ?? 0.5}
                onChange={handleChange}
                min={0}
                max={1}
                step={0.5}
                marks={marks}
            />;
    }

    return (
        <AccountDataCard cardContent={
            <>
                <Typography sx={{fontWeight: 'bold'}}>Energy mix preference</Typography>
                {cardComponent}
            </>} cardAction={data && <Button size="medium" onClick={savePreference} disabled={isSendingOrFailed}>Save preference</Button>}
        />
    )
}

export default UserPreferences