import React from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'

const IndustryKnowledge = () => {
  return (
    <div className='section section-industry-knowledge'>
        <Card>
            <CardHeader>
                <h6>Industry Knowledge</h6>
            </CardHeader>
            <CardBody>
                <div className='knowledge-block'>
                    <span>Responsive</span>
                    <span>Mobile Application</span>
                    <span>User Interface</span>
                </div>
            </CardBody>
        </Card>
    </div>
  )
}

export default IndustryKnowledge