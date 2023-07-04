import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Card, CardBody, CardHeader, Table } from 'reactstrap'

const Skills = () => {
  return (
    <div className='section section-skill'>
        <Card>
            <CardHeader>
                <h5>Skills</h5>
            </CardHeader>
            <CardBody>
                <Table className='align-middle'>
                    <tbody>
                        <tr>
                            <td>Adobe Photoshop</td>
                            <td width="50">
                                <FontAwesomeIcon icon={faCircleCheck}/>
                            </td>
                            <td width="80">5 Year</td>
                        </tr>
                        <tr>
                            <td>Adobe Illustrator</td>
                            <td width="50">
                                <FontAwesomeIcon icon={faCircleCheck}/>
                            </td>
                            <td width="80">5 Year</td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    </div>
  )
}

export default Skills