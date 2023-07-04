import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'

const Resume = () => {
  return (
    <div className='section section-resume'>
        <Card>
            <CardHeader>
                <h6>Resume</h6>
            </CardHeader>
            <CardBody>
                <div>
                    <span className='text-muted me-3'><FontAwesomeIcon icon={faFileAlt} /></span>
                    john-doe-resume.pdf
                </div>
            </CardBody>
        </Card>
    </div>
  )
}

export default Resume