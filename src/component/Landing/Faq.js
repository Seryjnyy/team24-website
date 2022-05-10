import React from 'react'
import { Accordion, Col, Row } from 'react-bootstrap'

function Faq() {
  return (
    <div className="landing__faq">
    <div className="inner">
    <div className='top'>
      <h3>Frequently Asked Questions</h3>
      <p>You may find an answer to a common question you have below </p>
    </div>
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>How do I set the type of energy I want to purchase?</Accordion.Header>
          <Accordion.Body>
            Login to your account, go to user preferences and set the energy type you wish to choose. 
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How do I reset my password?</Accordion.Header>
          <Accordion.Body>
            Go to the login page and below the username and password field, click the 'forgot my password' link. 
            Sorry, not available in the demo.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>How do I view my energy mix?</Accordion.Header>
          <Accordion.Body>
            Log into your account, click 'dashboard' and click 'energy mix' on side bar to view. 
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>How do I see my transactions?</Accordion.Header>
          <Accordion.Body>
            Log into your account, click 'dashboard' on the navigation bar and click 'transactions' on side bar to view. 
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>I have another question thats not listed on the FAQ </Accordion.Header>
          <Accordion.Body>
            Please message any other questions you have using the contact form below. 
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
    </div>
  </div>
  )
}

export default Faq