import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'

const CareerStatus = () => {
  return (
    <div className='section section-career-status'>
        <Card>
            <CardHeader>
                <h6>Career Status</h6>
            </CardHeader>
            <CardBody>
                <div>
                    <span className='text-muted me-3'><FontAwesomeIcon icon={faBriefcase} /></span>
                    Currently Working
                </div>
            </CardBody>
        </Card>
    </div>
  )
}

export default CareerStatus