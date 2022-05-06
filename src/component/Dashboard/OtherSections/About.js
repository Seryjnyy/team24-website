import { Memory } from '@mui/icons-material'
import { Box } from '@mui/material'
import React from 'react'

function About() {
  return (



    <div className="aboutContainer">
          <Box sx={{color:"#078707"}}>
    <h4 className='title mb-4'>
      <span>About</span>
      <Memory style={{marginLeft:'10px'}} />
    </h4>
    </Box>
    <p>
      Industria-grid is a system which allows you to track 
      energy prices throughout the whole UK. We plan to make this 
      process as easy and beneficial for all users. If you would like 
      a quick tour around the website please 

      <span>Click here</span>
    </p>
  </div>

  )
}

export default About