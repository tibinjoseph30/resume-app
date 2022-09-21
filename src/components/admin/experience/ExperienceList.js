import { useEffect, useState } from 'react'
import { Button, Spinner, Table, Alert } from 'reactstrap'
import { NavLink as Link, NavLink } from 'react-router-dom'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const ExperienceList = () => {

const [experience, setExperience] = useState([])
const [isLoading, setIsLoading] = useState(false);
const [status, setStatus] = useState(null);
const [alertVisible, setAlertVisible] = useState(false);

useEffect(()=> {
    getExperience()
}, [])

function getExperience() {
    const experienceCollectionRef = collection(db, 'experience')
    getDocs(experienceCollectionRef)
    .then(response => {
        const getExp = response.docs.map(doc => ({
            data: doc.data(),
            id: doc.id
        }))
        setExperience(getExp)
        // console.log(getExp);
        setIsLoading(true)
    })
    .catch(error => console.log(error.message))
}
function deleteExperience(id) {
    const experienceDeleteRef = doc(db, 'experience', id)
    deleteDoc(experienceDeleteRef)
    .then(response => {
        console.log(response)
        setStatus({ type: 'success' });
    })
    .catch(error => {
        console.log(error.message)
        setStatus({ type: 'error' });
    })
    getExperience()
    setAlertVisible(true)
    setTimeout(() => { 
        setAlertVisible(false)
    }, 5000);
}


  return (
    <div className='admin-panel'>
        <Sidebar/>
        <div className="right-block">
            <Topbar/>
            <div className="section-panel">
                <div className="section-header">
                    <h4 className='section-title'>Experience</h4>
                    <Button tag={Link} to="/add-experience" color='primary' className='ms-auto'>Add New Experience</Button>
                </div>
                <div className="section-body section-table">
                    <div className="table-responsive">
                        <Table>
                            <thead>
                                <tr>
                                    <th>Organization</th>
                                    <th>Designation</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Country</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isLoading ? 
                                <tr>
                                    <td align='center' colSpan={100}>
                                        <Spinner color='primary'/>
                                    </td>
                                </tr> :
                                (experience.length === 0 ? 
                                    <tr>
                                        <td align='center' colSpan={100}>No data available</td>
                                    </tr>:
                                    experience.map((exp, id) => (
                                        <tr key={exp.id}>     
                                            <td>{exp.data.organization}</td>
                                            <td>{exp.data.designation}</td>
                                            <td>{exp.data.city}</td>
                                            <td>{exp.data.state}</td>
                                            <td>{exp.data.country}</td>
                                            <td className='actions'>
                                                <NavLink to={`/edit-experience/${id}`} state={{ state : exp.data, id : exp.id }}>
                                                    <FiEdit2 size={18} className='action-icons edit' style={{cursor: 'pointer'}}/>
                                                </NavLink>
                                                <FiTrash2 onClick={()=>deleteExperience(exp.id)} size={18} className='action-icons delete' style={{cursor: 'pointer'}}/>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                    {status?.type === 'success' && (
                        <Alert color='success' isOpen={alertVisible}>
                        Experience deleted
                        </Alert>
                    )}
                    {status?.type === 'error' && (
                        <Alert color='danger' isOpen={alertVisible}>
                        Something goes wrong
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ExperienceList