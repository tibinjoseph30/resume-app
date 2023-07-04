import React from 'react'
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
                        <div className="d-flex align-items-center language-box">
                            <div className='icon me-3'>TR</div>
                            <div>
                                <div className='fw-semibold'>Turkish</div>
                                <div className='text-muted small'>Native Language</div>
                            </div>
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