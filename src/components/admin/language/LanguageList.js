import React from 'react'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import { Button, Card, CardBody, Col, Row } from 'reactstrap'
import { NavLink as Link } from 'react-router-dom'
import { FiTrash2 } from 'react-icons/fi'
import { MdStar } from 'react-icons/md'

const LanguageList = () => {
  return (
    <div className='admin-panel'>
        <Sidebar/>
        <div className="right-block">
            <Topbar/>
            <div className="section-panel">
                <div className="section-header">
                <h4 className='section-title'>Language</h4>
                    <Button tag={Link} to="/add-language" color='primary' className='ms-auto'>Add New Language</Button>
                </div>
                <div className="section-body">
                  <Row>
                    <Col xxl="2" xl="3" lg="4" sm="6" className="mb-3">
                      <Card className='border-dashed'>
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <p className='mb-0'>avd</p>
                                <FiTrash2 className='ms-auto action-btn delete' style={{cursor: 'pointer', fontSize: '16px'}}/>
                            </div>
                            <div className="star-rating">
                                <MdStar className='star'/>
                                <MdStar className='star'/>
                                <MdStar className='star'/>
                                <MdStar className='star'/>
                                <MdStar className='star'/>
                            </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LanguageList