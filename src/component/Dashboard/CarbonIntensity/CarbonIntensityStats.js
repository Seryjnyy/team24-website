import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';

function CarbonIntensityStats({dateFromParent}) {

    const {isLoading, isError, isSuccess, data } = useQuery(["CarbonIntensityStats", dateFromParent], async () => {
        const dateString = dateFromParent.toLocaleDateString('en-CA');
        const from = dateString + "T00:00Z";
        const to = dateString + "T24:00Z";
        const res = await fetch("https://cors-everywhere-me.herokuapp.com/http://api.carbonintensity.org.uk/intensity/stats/" + from + "/" + to);
        return res.json();
    });


    if(isSuccess){
        return(
            <>
            <Typography sx={{fontSize:15}}>Stats</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2}}>            
            <Typography sx={{fontSize:14, color:"grey.400", pr: 2}}>min: {data?.data[0].intensity.min}</Typography>
            <Typography sx={{fontSize:14, color:"grey.400", pr: 2}}>average: {data?.data[0].intensity.average}</Typography>
            <Typography sx={{fontSize:14, color:"grey.400", pr: 2}}>max: {data?.data[0].intensity.max}</Typography>
            <Typography sx={{fontSize:14, color:"grey.400", pr: 2}}>index: {data?.data[0].intensity.index}</Typography>
            </Box>
            </>
        )
    }

    return(<div></div>)
}

export default CarbonIntensityStats