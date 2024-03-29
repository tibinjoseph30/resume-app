import { useEffect, useState } from 'react'
import { Table, Button, Spinner } from 'reactstrap'
import { NavLink as Link, NavLink } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const EducationList = () => {

    const [education, setEducation] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        getEducation()
    }, [])
    
    function getEducation() {
        const educationCollectionRef = collection(db, 'education')

        getDocs(query(educationCollectionRef, orderBy('createdAt', 'desc')))
        .then(response => {
            const getEdu = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            }))
            setEducation(getEdu)
            console.log(getEdu);
            setIsLoading(true)
        })
        .catch(error => console.log(error.message))
    }
    function deleteEducation(id) {
        const educationDeleteRef = doc(db, 'education', id)
        deleteDoc(educationDeleteRef)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.message)
        })
        getEducation()
    }

    return (
        <div>
            <div className="section-header">
                <h4 className='section-title'>Education</h4>
                <Button tag={Link} to="../add-education" color='primary' className='ms-auto'>Add New Education</Button>
            </div>
            <div className="section-body section-table">
                <div className='table-responsive'>
                    <Table className='align-middle'>
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
                                    <td align='center' colSpan={100}>There is nothing added yet !!</td>
                                </tr>:
                                education.map((edu, id) => (
                                    <tr key={edu.id}> 
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className='logo-box'>
                                                {edu.data.logo ? (
                                                    <img
                                                        src={edu.data.logo}
                                                        alt=""
                                                        style={{ width: '100%' }}
                                                    />
                                                    ) : (
                                                    <img
                                                        src='https://firebasestorage.googleapis.com/v0/b/resume-app-c31bf.appspot.com/o/images%2Fno-image.svg?alt=media&token=2dd03c2f-43a4-4456-b3c8-8972b6370074'
                                                        alt=""
                                                        style={{ width: '100%' }}
                                                    />
                                                )}
                                                </div>
                                                <div className='ms-3'>{edu.data.university}</div>
                                            </div>
                                        </td>
                                        <td>{edu.data.course}</td>
                                        <td>{edu.data.city}</td>
                                        <td>{edu.data.state}</td>
                                        <td>{edu.data.country}</td>
                                        <td className='actions'>
                                            <NavLink to={`../edit-education/${id}`} state={{ state : edu.data, id : edu.id }}>
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
    )
}

export default EducationList