import { useEffect, useState } from 'react'
import { Button, Spinner, Table } from 'reactstrap'
import { NavLink as Link, NavLink } from 'react-router-dom'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const ExperienceList = () => {

const [experience, setExperience] = useState([])
const [isLoading, setIsLoading] = useState(false);

console.log(experience);
useEffect(()=> {
    getExperience()
    console.log(experience);
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
    .then(console.log('document deleted'))
    .catch(error => console.log(error.message))
}


  return (
    <div className='admin-panel'>
        <Sidebar/>
        <div className="right-block">
            <Topbar/>
            <div className="section-panel">
                <h4 className='section-head'>Experience</h4>
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
                            experience.map((exp, id) => (
                                <tr key={exp.id}>     
                                    <td>{exp.data.formValues.organization}</td>
                                    <td>{exp.data.formValues.designation}</td>
                                    <td>{exp.data.formValues.city}</td>
                                    <td>{exp.data.formValues.state}</td>
                                    <td>{exp.data.formValues.country}</td>
                                    <td className='actions'>
                                        <NavLink to={`/edit-experience/${id}`}>
                                            <FiEdit2 size={18} className='action-icons edit' style={{cursor: 'pointer'}}/>
                                        </NavLink>
                                        <FiTrash2 onClick={()=>deleteExperience(exp.id)} size={18} className='action-icons delete' style={{cursor: 'pointer'}}/>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                </div>
                <div className="form-action">
                    <Button tag={Link} to="/add-experience" color='primary'>Add New Experience</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ExperienceList