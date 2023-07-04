import React from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'

const Education = () => {
  return (
    <div className='section section-education'>
        <Card>
            <CardHeader>
                <h5>Education</h5>
            </CardHeader>
            <CardBody>
                <ul className='education-list list-unstyled mb-0'>
                    <li>
                        <div className='d-flex '>
                            <div className='brand-box me-3'></div>
                            <div>
                                <div className='fw-semibold mb-2'>Birmingham University<span className='badge bg-light text-dark fw-normal ms-2'>Regular</span></div>
                                <div>Master Degree in Computer Science</div>
                                <div className='small text-muted mt-3'>October 2020 - January 2022</div>
                            </div>
                        </div>
                    </li>
                </ul> 
            </CardBody>
        </Card>
    </div>
  )
}

export default Education