import React from 'react'
import {Col, Row } from 'react-bootstrap'
import ArrowImg from '../../images/arrow.png'

function Footer() {
  return (
    <div className="landing__footer">
    <Row>
      <Col className='d-flex flex-column justify-content-end' style={{marginBottom:"20px"}}>
        <p>Our Number</p>
        <p>Our Email</p>
        <div className='footer__inputContainer'>
          <input type="text" placeholder='Enter email to subscribe' />
          <img src={ArrowImg} alt="" />
        </div>
      </Col>
      <Col style={{marginBottom:"20px"}}>
        <h3>Navigation</h3>
        
           <a href='#' alt=''>Home</a>
           <a href='#' alt=''>About Us</a>
           <a href='#' alt=''>Services</a>
           <a href='#' alt=''>Pricing</a>
        
      </Col>
      <Col style={{marginBottom:"20px"}}>
        <h3>Contact</h3>
           <a href='#' alt=''>Faq</a>
           <a href='#' alt=''>Contact Us</a>
           <a href='#' alt=''>Blog</a>
           <a href='#' alt=''>Dashboard</a>
        
      </Col>
      <Col>
        <h3>Stay Connected</h3>
        <a href='#' alt=''>Facebook</a>
        <a href='#' alt=''>Twitter</a>
        <a href='#' alt=''>Instagram</a>
      </Col>
    </Row>
    <Row className='mt-5'>
      <Col>
        <p>Copyright© 2022 </p>
      </Col>
      <Col className='d-flex justify-content-between'>
        <p>Company Details</p>
        <p>Privacy & Policy</p>
        <p>Terms & Conditions</p>
      </Col>
    </Row>
  </div>
  )
}

export default Footer