import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Spinner } from 'reactstrap'
import { db } from '../config/firebase-config'
import { Link } from 'react-router-dom'

const Projects = () => {

    const [project, setProject] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    
    useEffect(()=> {
        getProject()
    }, [])
    
    function getProject() {
        const projectCollectionRef = collection(db, 'project')
        const projectQueryRef = query(projectCollectionRef, orderBy("project", "asc"), limit(3));
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
    <div className='section section-project'>
        <Card>
            <CardHeader>
                <h6>Active Projects</h6>
            </CardHeader>
            <CardBody>
                {!isLoading ?
                    <div className="text-center">
                        <Spinner color='primary'/>
                    </div> :
                    (project.length === 0 ?
                        <div className="text-center">
                            There is nothing added yet !!
                        </div> :
                        <ul className='project-list list-unstyled mb-0'>
                            {project.map((proj, id)=> (
                                <li key={proj.id}>
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <div className='fw-semibold mb-2'>{proj.data.project}</div>
                                            <div>{proj.data.client}</div>
                                        </div>
                                        <a href={proj.data.url} target='_' className='btn btn-primary-light btn-sm ms-auto rounded-pill px-3'>View</a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                }
                <Button tag={Link} to="/all-projects" color='primary' className='rounded-pill w-100 mt-4'>Show All</Button>
            </CardBody>
        </Card>
    </div>
  )
}

export default Projects