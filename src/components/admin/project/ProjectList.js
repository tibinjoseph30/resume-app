import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { NavLink as Link, NavLink } from 'react-router-dom'
import { Button, Spinner, Table } from 'reactstrap'
import { db } from '../../../config/firebase-config'

const ProjectList = () => {

    const [project, setProject] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        getProject()
    }, [])

    function getProject() {
        const projectCollectionRef = collection(db, 'project')
        getDocs(projectCollectionRef)
        .then(response => {
            const getProj = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            }))
            setProject(getProj)
            setIsLoading(true)
        })
        .catch(error => console.log(error.message))
    }

    function deleteProject(id) {
        const projectDeleteRef = doc(db, 'project', id)
        deleteDoc(projectDeleteRef)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.message)
        })
        getProject()
    }

  return (
    <div>
        <div className="section-header">
            <h4 className='section-title'>Projects</h4>
            <Button tag={Link} to="../add-project" color='primary' className='ms-auto'>Add New Project</Button>
        </div>
        <div className="section-body section-table">
            <div className="table-responsive">
                <Table>
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>URL</th>
                            <th className='actions'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading ? 
                        <tr>
                            <td align='center' colSpan={100}>
                                <Spinner color='primary'/>
                            </td>
                        </tr> :
                        (project.length === 0 ? 
                            <tr>
                                <td align='center' colSpan={100}>There is nothing added yet !!</td>
                            </tr>:
                            project.map((pro, id) => (
                                <tr key={pro.id}>     
                                    <td>{pro.data.project}</td>
                                    <td>{pro.data.client}</td>
                                    <td>{pro.data.url}</td>
                                    <td className='actions'>
                                        <NavLink to={`../edit-project/${id}`} state={{ state : pro.data, id : pro.id }}>
                                            <FiEdit2 size={18} className='action-btn edit' style={{cursor: 'pointer'}}/>
                                        </NavLink>
                                        <FiTrash2 onClick={()=>deleteProject(pro.id)} size={18} className='action-btn delete' style={{cursor: 'pointer'}}/>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    </div>
  )
}

export default ProjectList