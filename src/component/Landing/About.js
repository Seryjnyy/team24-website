import { Grid } from '@mui/material'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import About1 from '../../images/about1.jpg'
import About2 from '../../images/about2.jpg'
import About3 from '../../images/about3.jpg'

function About() {
  return (
    <div className="landing__about">
      <h3 className='mb-3'>About Us</h3>
      <p className='mb-5'>
        Industria grid is a system which allows you to track energy prices and allows users to purchase and sell different enrgy types as they wish to the National Grid. We as Industria grid, plan to make this process simple and beneficial
        for all users.
      </p>
      <Grid container columnSpacing={4} rowSpacing={2}>
        <Grid item xs={12} sm={4}> <img src={About1} alt="" /></Grid>
        <Grid item xs={12} sm={4}> <img src={About2} alt="" /></Grid>
        <Grid item xs={12} sm={4}> <img src={About3} alt="" /></Grid>
      </Grid>

    </div>
  )
}

export default About