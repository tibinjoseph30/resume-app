import { useEffect, useState } from 'react'
import { Table, Button, Spinner } from 'reactstrap'
import { NavLink as Link, NavLink } from 'react-router-dom'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const EducationList = () => {

    const [education, setEducation] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(()=> {
        getEducation()
    }, [])
    
    function getEducation() {
        const educationCollectionRef = collection(db, 'education')
        getDocs(educationCollectionRef)
        .then(response => {
            const getEdu = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            }))
            setEducation(getEdu)
            // console.log(getExp);
            setIsLoading(true)
        })
        .catch(error => console.log(error.message))
    }
    function deleteEducation(id) {
        const educationDeleteRef = doc(db, 'education', id)
        deleteDoc(educationDeleteRef)
        .then(response => {
            console.log(response)
            setStatus({ type: 'success' });
        })
        .catch(error => {
            console.log(error.message)
            setStatus({ type: 'error' });
        })
        getEducation()
    }

    return (
    <div className='admin-panel'>
        <Sidebar/>
        <div className="right-block">
            <Topbar/>
            <div className="section-panel">
                <div className="section-header">
                    <h4 className='section-title'>Education</h4>
                    <Button tag={Link} to="/add-education" color='primary' className='ms-auto'>Add New Education</Button>
                </div>
                <div className="section-body section-table">
                    <div className='table-responsive'>
                        <Table>
                            <thead>
                                <tr>
                                    <th>University</th>
                                    <th>Course</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Country</th>
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
                                (education.length === 0 ? 
                                    <tr>
                                        <td align='center' colSpan={100}>There is no education added yet !!</td>
                                    </tr>:
                                    education.map((edu, id) => (
                                        <tr key={edu.id}>     
                                            <td>{edu.data.university}</td>
                                            <td>{edu.data.course}</td>
                                            <td>{edu.data.city}</td>
                                            <td>{edu.data.state}</td>
                                            <td>{edu.data.country}</td>
                                            <td className='actions'>
                                                <NavLink to={`/edit-education/${id}`} state={{ state : edu.data, id : edu.id }}>
                                                    <FiEdit2 size={18} className='action-btn edit' style={{cursor: 'pointer'}}/>
                                                </NavLink>
                                                <FiTrash2 onClick={()=>deleteEducation(edu.id)} size={18} className='action-btn delete' style={{cursor: 'pointer'}}/>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EducationList