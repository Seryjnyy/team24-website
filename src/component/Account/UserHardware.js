import React from 'react'
import { getUserToken } from '../../services/AuthService';
import jwt_decode from "jwt-decode";
import { Typography } from '@mui/material';
import AccountDataCard from './AccountDataCard';
import { useQuery } from 'react-query';
import { useAuth } from '../Auth/auth';

function UserHardware() {
    const { data, status } = useQuery("userHardware", fetchHardware);
    const auth = useAuth();

    async function fetchHardware() {
        let token = auth.getAccessToken();
        let username = jwt_decode(token).sub;
        const res = await fetch("https://172.31.25.8:8080/api/user/hardware?username=" + username, { headers: { "Authorization": "Bearer " + token } });
        return res.json();
    }

    let cardComponent;
    if (status === "loading") {
        cardComponent = <Typography>Loading...</Typography>;
    } else if (status === "error" || data?.httpStatus != null) {
        cardComponent = <Typography> {data?.message ?? "Sorry, something went wrong..."}</Typography>;
    } else if(Object.keys(data).length === 0){
        cardComponent = <AccountDataCard cardContent={
            <>
                <Typography sx={{fontWeight:'bold'}}>Hardware</Typography>
                <Typography> {"Sorry, no hardware found..."}</Typography>
            </>
        } />}
     else {
        cardComponent = (
            data.map((value) => (
                <AccountDataCard key={value.hid} cardContent={
                    <>
                        <Typography sx={{fontWeight:'bold'}}>Hardware</Typography>
                        <Typography>Output : {value.houtput} kW</Typography>
                        <Typography>Type : {value.htype === 1 ? "Wind turbine" : "Solar panel"}</Typography>
                        <Typography>Faulted : {value.hstatus ? "true" : "false"}</Typography>
                    </>
                } />

            )));

    }

    return (

        <>
            {cardComponent}
        </>
        // <AccountDataCard cardContent={
        //     <>
        //         <Typography sx={{ fontSize: 14 }}>Hardware</Typography>
        //         {cardComponent}
        //     </>}
        // />
    )
}

export default UserHardware