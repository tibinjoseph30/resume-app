import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, NavLink, Spinner } from 'reactstrap'
import { db } from '../config/firebase-config'

const Projects = () => {

    const [project, setProject] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    
    useEffect(()=> {
        getProject()
    }, [])
    
    function getProject() {
        const projectCollectionRef = collection(db, 'project')
        getDocs(projectCollectionRef)
        .then(response => {
            const getProj = response.docs.map(doc => ({
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
                <button className='btn btn-primary rounded-pill w-100 mt-4'>Show All</button>
            </CardBody>
        </Card>
    </div>
  )
}

export default Projects