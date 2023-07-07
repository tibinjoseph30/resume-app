import React from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MdStarRate } from "react-icons/md";
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
                            <td className='text-muted'>Image Editor</td>
                            <td width="100">
                                <div className="rating">
                                    <MdStarRate/>
                                    <MdStarRate/>
                                    <MdStarRate/>
                                    <MdStarRate/>
                                    <MdStarRate/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    </div>
  )
}

export default Skills