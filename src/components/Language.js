import React from 'react'
import { Col, Row } from 'reactstrap';
import { MdStar } from "react-icons/md";

const Language = () => {
  return (
    <div className='section language'>
        <h3 className='section-title'>Language</h3>
        <Row>
            <Col lg="5">English</Col>
            <Col lg="7">
                <div className="star-rating">
                    <MdStar className='star'/>
                    <MdStar className='star'/>
                    <MdStar className='star'/>
                    <MdStar className='star'/>
                    <MdStar className='star'/>
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default Language