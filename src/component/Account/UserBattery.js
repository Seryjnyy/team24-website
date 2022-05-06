import React from 'react'
import { getUserToken } from '../../services/AuthService';
import jwt_decode from "jwt-decode";
import { Typography } from '@mui/material';
import AccountDataCard from './AccountDataCard';
import { useQuery } from 'react-query';
import { useAuth } from '../Auth/auth';

function UserBattery() {
    const { data, status } = useQuery("userBattery", fetchBattery);
    const auth = useAuth();

    async function fetchBattery() {
        let token = auth.getAccessToken();
        let username = jwt_decode(token).sub;
        const res = await fetch("http://18.170.74.59:8080/api/user/battery?username=" + username, { headers: { "Authorization": "Bearer " + token } });
        return res.json();
    }

    let cardComponent;
    if (status === "loading") {
        cardComponent = <Typography>Loading...</Typography>;
    } else if (status === "error" || data?.httptatus != null) {
        cardComponent = <Typography> {data?.message ?? "Sorry, something went wrong..."}</Typography>;
    } else if(Object.keys(data).length === 0){
        cardComponent = <AccountDataCard cardContent={
            <>
                <Typography sx={{fontWeight:'bold'}}>Battery</Typography>
                <Typography> {"Sorry, no batteries found..."}</Typography>
            </>
        } />
    } else {
        cardComponent = (
            data.map((value) => (
                <AccountDataCard key={value.idBattery} cardContent={
                    <>
                        <Typography sx={{fontWeight:'bold'}}>Battery</Typography>
                        <Typography>Charging: {value.charging == true ? "true" : "false"}</Typography>
                        <Typography>Discharging: {value.idischarge == true ? "true" : "false"}</Typography>
                        <Typography>Charge: {value.icurrentElectricityStored}%</Typography>
                        <Typography>Capacity: {value.imaximumCapacity} kWh</Typography>
                    </>
                } />

            ))

        );

    }

    return (
<>
        { cardComponent }
        </>
        // <AccountDataCard cardContent={
        //     <>
        //         <Typography sx={{ fontSize: 14 }}>Battery</Typography>
        //         {cardComponent}
        //     </>}
        // />
    )
}

export default UserBattery