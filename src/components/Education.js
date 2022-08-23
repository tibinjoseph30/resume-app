import React from 'react';
import { Row, Col } from "reactstrap";

const Education = () => {
  return (
    <div className='section education'>
        <h3 className='section-title'>Education</h3>
        <Row>
          <Col lg="3">
            <h6 className='date'>2018 - 2022</h6>
            <p></p>
          </Col>
          <Col lg="9">
            <h5 className='section-head'>B. Tech. in Computer Science</h5>
            <p className='text-muted'>Mansfield Fort University<span className='mx-3'>|</span>Newyork City, USA</p>
          </Col>
        </Row>
    </div>
  )
}

export default Education