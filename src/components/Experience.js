import React from 'react';
import { Row, Col } from "reactstrap";

const Experience = () => {
  return (
    <div className='section experience'>
        <h3 className='section-title'>Experience</h3>
        <Row>
          <Col lg="3">
            <h6 className='date'>2018 - 2022</h6>
            <p></p>
          </Col>
          <Col lg="9">
            <h5 className='section-head'>Ui Developer</h5>
            <p>Microsoft<span className='mx-3'>|</span>Newyork City, USA</p>
            <ul className='list-unstyled list-default'>
              <li>Developed front-end web pages with HTML5, CSS3, and JavaScript.</li>
            </ul>
          </Col>
        </Row>
    </div>
  )
}

export default Experience