import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'

const Experience = () => {
  return (
    <div className='section section-experience'>
        <Card>
            <CardHeader>
                <h5>All Experiences</h5>
            </CardHeader>
            <CardBody>
                <ul className='experience-list list-unstyled mb-0'>
                    <li>
                        <div className='d-flex '>
                            <div className='brand-box me-3'></div>
                            <div>
                                <div className='fw-semibold mb-2'>Trendyol <span className='badge bg-light text-dark fw-normal ms-2'>Full Time</span></div>
                                <div>UI Developer<span className='small text-muted ms-4'>October 2020 - January 2022</span></div>
                                <div className='small text-muted mt-3'>1 year 2 Months</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='d-flex'>
                            <div className='brand-box me-3'></div>
                            <div>
                                <div className='fw-semibold mb-2'>Pazarama <span className='badge bg-light text-dark fw-normal ms-2'>Full Time</span></div>
                                <div>Front End Developer<span className='small text-muted ms-4'>October 2020 - January 2022</span></div>
                                <div className='small text-muted mt-3'>1 year 2 Months</div>
                            </div>
                        </div>
                    </li>
                </ul>  
            </CardBody>
        </Card>
    </div>
  )
}

export default Experience