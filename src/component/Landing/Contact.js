import { Box } from "@mui/system";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Contact() {
  return (
    <Box>
      <div className="landing__contact">
        <div>
          <h1 className="mb-3">Contact Us</h1>
          <p className="mb-5">
            Please fill in the form below and submit, we will get back to you shortly. {" "}
          </p>
        </div>
        <Row className="contact__form">
          <Col md={5} className="left">
            <input type="text" placeholder="Full Name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Phone No." />
          </Col>
          <Col md={5} className="right">
            <input type="text" placeholder="Subject" />
            <textarea className="message" type="text" placeholder="Message" />
          </Col>
        </Row>
        <button>Submit</button>
      </div>
    </Box>
  );
}

export default Contact;
