import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap'

const CareerStatus = ({profile, isLoading}) => {
  return (
    <div className='section section-career-status'>
        <Card>
            <CardHeader>
                <h6>Career Status</h6>
            </CardHeader>
            <CardBody>
                {!isLoading ?
                    <div className="text-center">
                        <Spinner color='primary'/>
                    </div> :
                    (profile.length === 0 ?
                        <div className="text-center">
                            There is nothing added yet !!
                        </div> :
                        <div>
                            {profile.map((pro, id)=> (
                                <div key={pro.id}>
                                    <span className='text-muted text-capitalize me-3'><FontAwesomeIcon icon={faBriefcase} /></span>
                                    {pro.data.careerStatus}
                                </div>
                            ))}
                        </div>  
                    )
                }
            </CardBody>
        </Card>
    </div>
  )
}

export default CareerStatus