import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Container, Row, Spinner } from 'reactstrap'
import { db } from '../config/firebase-config'
import { NavLink } from 'react-router-dom'
import { FiAlignLeft, FiArrowLeft } from 'react-icons/fi'

const AllProjects = () => {

    const [project, setProject] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    
    useEffect(()=> {
        getProject()
    }, [])
    
    function getProject() {
        const projectCollectionRef = collection(db, 'project')
        const projectQueryRef = query(projectCollectionRef, orderBy("project"));
        getDocs(projectQueryRef)
        .then(response => {
            const getProj = response.docs
            .sort((a, b) => (a.id < b.id ? 1 : -1))
            .map(doc => ({
                data: doc.data(),
                id: doc.id,
            }))
            setProject(getProj)
            console.log(getProj);
            setIsLoading(true)
        })
        .catch(error => console.log(error.message))
    }

  return (
    <main>
        <Container>
            <div className='section section-all-projects'>
                <div className="d-flex align-items-center mb-4">
                    <h4 className='mb-0'>All Projects</h4>
                    <NavLink to="/" className='ms-auto d-inline-flex align-items-center'><FiArrowLeft className='me-2'/>Back</NavLink>
                </div>
                {!isLoading ?
                    <div className="text-center">
                        <Spinner color='primary'/>
                    </div> :
                    (project.length === 0 ?
                        <div className="text-center">
                            There is nothing added yet !!
                        </div> :
                        <Row>
                            {project.map((proj, id)=> (
                                <Col lg="4" key={proj.id}>
                                    <Card>
                                        <CardBody>
                                            <div className='fw-semibold h5 mb-2'>{proj.data.project}</div>
                                            <div>{proj.data.client}</div>
                                            <div className="d-flex justify-content-end">
                                                <a href="https://www.geeksforgeeks.org/" target='_' className='btn btn-primary-light mt-4 rounded-pill px-5'>View</a>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )
                }
            </div>
        </Container>
    </main>
  )
}

export default AllProjects