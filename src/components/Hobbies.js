import React from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'

const Hobbies = () => {
  return (
    <div className='section section-hobbies'>
        <Card>
            <CardHeader>
                <h6>Hobbies</h6>
            </CardHeader>
            <CardBody>
                <ul className='hobbies-list list-unstyled mb-0'>
                    <li>Music</li>
                    <li>Movies</li>
                </ul>
            </CardBody>
        </Card>
    </div>
  )
}

export default Hobbies