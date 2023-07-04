import React from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'

const Projects = () => {
  return (
    <div className='section section-project'>
        <Card>
            <CardHeader>
                <h6>Active Projects</h6>
            </CardHeader>
            <CardBody>
                <ul className='project-list list-unstyled mb-0'>
                    <li>
                        <div className="d-flex align-items-center">
                            <div>
                                <div className='fw-semibold mb-2'>Unibix</div>
                                <div>Techversant</div>
                            </div>
                            <button className='btn btn-primary-light btn-sm ms-auto rounded-pill px-3'>View</button>
                        </div>
                    </li>
                    <li>
                        <div className="d-flex align-items-center">
                            <div>
                                <div className='fw-semibold mb-2'>Unibix</div>
                                <div>Techversant</div>
                            </div>
                            <button className='btn btn-primary-light btn-sm ms-auto rounded-pill px-3'>View</button>
                        </div>
                    </li>
                </ul> 
                <button className='btn btn-primary rounded-pill w-100 mt-4'>Show All</button>
            </CardBody>
        </Card>
    </div>
  )
}

export default Projects