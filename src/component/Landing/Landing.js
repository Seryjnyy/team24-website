import React from 'react'
import { ank } from 'react-router-dom'
import './landing.css'
import HeaderImg from '../../images/header.png'
import { Accordion, Col, Row } from 'react-bootstrap'
import About1 from '../../images/about1.jpg'
import About2 from '../../images/about2.jpg'
import About3 from '../../images/about3.jpg'
import ArrowImg from '../../images/arrow.png'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import About from './About'
import Faq from './Faq'
import Contact from './Contact'
import Footer from './Footer'
function Landing() {
  return (
    <Box sx={{ bgcolor:"#0D0D2B", color:"white"}}>
      <Grid container >

        <Grid item xs={12}>
          <Row className='landing__header'>
            <Col md={6} className="left">
              <Box sx={{ mt: { xs: 12, sm: 14, md: 0 } }}>
                <h1>Save energy, save Earth</h1>
                <p>View the change we create in the world</p>
                <button>Explore</button>
              </Box>
            </Col>
            <Col md={6} className="right">
            <Box sx={{ mt: { xs: 3, sm: 15 } }}>
              <img src={HeaderImg} alt="" />
            </Box>
          </Col>
          </Row>
        </Grid>


        <Grid item xs={12}>
          <About />
        </Grid>


        <Grid item xs={12}>
          <Faq />
        </Grid>


        <Grid item xs={12}>
        <Contact />
      </Grid>


        <Grid item xs={12}>
          <Footer />
        </Grid>






      </Grid>
    </Box>


  )
}

export default Landing