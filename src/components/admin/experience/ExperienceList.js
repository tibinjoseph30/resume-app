import { useEffect, useState } from 'react'
import { Button, Spinner, Table } from 'reactstrap'
import { NavLink as Link, NavLink } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const ExperienceList = () => {

const [experience, setExperience] = useState([])
const [isLoading, setIsLoading] = useState(false);

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
    })
    .catch(error => {
        console.log(error.message)
    })
    getExperience()
}


  return (
    <div>
        <div className="section-header">
            <h4 className='section-title'>Experience</h4>
            <Button tag={Link} to="../add-experience" color='primary' className='ms-auto'>Add New Experience</Button>
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
                        (experience.length === 0 ? 
                            <tr>
                                <td align='center' colSpan={100}>There is nothing added yet !!</td>
                            </tr>:
                            experience.map((exp, id) => (
                                <tr key={exp.id}>     
                                    <td>{exp.data.organization}</td>
                                    <td>{exp.data.designation}</td>
                                    <td>{exp.data.city}</td>
                                    <td>{exp.data.state}</td>
                                    <td>{exp.data.country}</td>
                                    <td className='actions'>
                                        <NavLink to={`../edit-experience/${id}`} state={{ state : exp.data, id : exp.id }}>
                                            <FiEdit2 size={18} className='action-btn edit' style={{cursor: 'pointer'}}/>
                                        </NavLink>
                                        <FiTrash2 onClick={()=>deleteExperience(exp.id)} size={18} className='action-btn delete' style={{cursor: 'pointer'}}/>
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

export default ExperienceList