import React from 'react'
import UserDashboard from './UserDashboard';
import UserPreferences from './UserPreferences';

import UserHardware from './UserHardware';
import UserBattery from './UserBattery';
import RequestResetPassword from '../Auth/RequestResetPassword';
import UserTransactions from './UserTransactions'
import UserAuto from "./UserAuto";
import UserAutoOverride from './UserAutoOverride';
import { Box, Grid } from '@mui/material';
import BatteryStateGraph from './BatteryStateGraph';

function Account() {


  return (
    <Box sx={{mt:8}}>

    
      <UserDashboard />
      <Grid container  >
        <Grid item xs={12} sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', mb: 2, height:"100%", mt: 0, mx: {xs:2, md:5}, p:2, bgcolor: "#fbf7f5"}} justifyContent="center">
        <UserAuto />
          <UserAutoOverride />
          <UserPreferences />
        </Grid>
        <Grid item xs={12} sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', mb: 2, height:"100%", mt: 0, mx: {xs:2, md:5}, p:2, bgcolor: "#fbf7f5"}} justifyContent="center">
          <UserHardware />
          <UserBattery />
        </Grid>
        <Grid item xs={12} sx={{ mb: 2, height:"100%", mt: 0, mx: {xs:2, md:5}, p:2, bgcolor: "#fbf7f5"}}>
          <BatteryStateGraph />
        </Grid>
        <Grid item xs={12} sx={{ mb: 2, height:"100%", mt: 0, mx: {xs:2, md:5}, p:2, bgcolor: "#fbf7f5"}}>
          <UserTransactions />
        </Grid>
  
        <Grid item xs={12} sx={{ mb: 2, height:"100%", mt: 0, mx: {xs:2, md:5}, p:2, bgcolor: "#fbf7f5"}}>
          <RequestResetPassword />
        </Grid>
      
        
      </Grid>
      </Box>
  )
}

export default Account