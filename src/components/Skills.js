import React from 'react'
import { Col, Progress, Row} from 'reactstrap'

const Skills = () => {
  return (
    <div className='section skills'>
        <h3 className='section-title'>Key Skills</h3>
        <Row className='gx-5'>
            <Col className='offset-lg-3' lg="9">
                <Row className='align-items-center'>
                    <Col lg="4">Photoshop</Col>
                    <Col lg="8">
                        <Progress style={{height: '4px'}} value={50} />
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
  )
}

export default Skills