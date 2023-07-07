import { faFileText } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FiArrowDown } from "react-icons/fi";
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
                <div className="d-flex align-items-center">
                    <div>
                        <span className='text-muted me-3'><FontAwesomeIcon icon={faFileText} /></span>
                        john-doe-resume.pdf
                    </div>
                    <button className='btn btn-primary btn-download ms-auto'><FiArrowDown/></button>
                </div>
            </CardBody>
        </Card>
    </div>
  )
}

export default Resume