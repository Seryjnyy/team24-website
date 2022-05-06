import { Card, CardActions, CardContent } from '@mui/material'
import React from 'react'

function AccountDataCard({cardContent, cardAction}) {
  return (
    <Card sx={{ width:"100%", maxWidth:400, mx: 2, mb:2 }}>
    <CardContent  sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
        {cardContent}
    </CardContent>
    <CardActions>
        {cardAction}
    </CardActions>
</Card>
  )
}

export default AccountDataCard