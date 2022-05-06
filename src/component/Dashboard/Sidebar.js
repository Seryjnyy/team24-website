import React, {useRef}from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Box,
    Button,
  } from "@mui/material";

function Sidebar() {
    const pageNames = [ "Carbon Intensity", "Current energy mix", "Recent transactions", 'About',  'News'];
    const pageLink = [ "/dashboard#carbon-intensity", "/dashboard#energy-mix", "/dashboard#transaction", '/dashboard#about',  '/dashboard#news'];
    let navigate = useNavigate();

  return (
    

    <Box className='dashboard__left' style={{width: "100%"}} display={{"xs" : "none", "sm" : "block"}}>
            {pageNames.map((pageName, i) => (
               <a href={pageLink[i]} key={pageName}>
              <Button style={{textAlign:'start'}}
                key={pageName}
                // onClick={() => { navigate(`/${pageLink[i]}`) }}
                sx={{ my: 2, color: "#fff", display: "block" }}
              >
               {pageName}
              </Button>
              </a>
            ))}
    </Box>
  )
}

export default Sidebar