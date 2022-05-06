import { Box } from '@mui/material'
import React from 'react'

function DashboardContainer({children}) {

  return (
    <Box sx={{ bgcolor: "#111216",py:5, px:{xs:1, sm:5}, mx: {xs:1.5, sm:3}, mt:2, borderRadius: 5 , minHeight: "40vh"}} >
    {children}
    </Box>
  )
}

export default DashboardContainer