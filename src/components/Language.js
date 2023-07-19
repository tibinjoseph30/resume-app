import React from 'react'
import { FiBookOpen, FiEdit2, FiHeadphones, FiMic } from 'react-icons/fi'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'

const Language = () => {
  return (
    <div className='section section-language'>
        <Card>
            <CardHeader>
                <h5>Language</h5>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col lg="4">
                        <div className='language-box'>
                            <div className="d-flex align-items-center">
                                <div className='icon me-3'>TR</div>
                                <div>
                                    <div className='fw-semibold'>Turkish</div>
                                    <div className='text-muted small'>Native</div>
                                </div>
                            </div>
                            <ul className='list-unstyled mb-0 mt-3 lan-experience-list'>
                                <li className='active'>
                                    <div className="lan-icon">
                                        <FiEdit2/>
                                    </div>
                                </li>
                                <li className='active'>
                                    <div className="lan-icon">
                                        <FiBookOpen/>
                                    </div>
                                </li>
                                <li>
                                    <div className="lan-icon">
                                        <FiHeadphones/>
                                    </div>
                                </li>
                                <li>
                                    <div className="lan-icon">
                                        <FiMic/>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col lg="4">
                        <div className="d-flex align-items-center language-box">
                            <div className='icon me-3'>EN</div>
                            <div>
                                <div className='fw-semibold'>English</div>
                                <div className='text-muted small'>Advanced</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </div>
  )
}

export default Language