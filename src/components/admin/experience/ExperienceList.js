import { useEffect, useState } from 'react'
import { Button, Table } from 'reactstrap'
import { NavLink as Link } from 'react-router-dom'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const ExperienceList = () => {

const [experience, setExperience] = useState([])

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
    })
    .catch(error => console.log(error.message))
}

  return (
    <div className='admin-panel'>
        <div className="left-block">
            <Sidebar/>
        </div>
        <div className="right-block">
            <Topbar/>
            <div className="section-panel">
                <h4 className='section-head'>Experience</h4>
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
                        {experience.map(exp => (
                            <tr key={exp.id}>
                                <td>{exp.data.organization}</td>
                                <td>{exp.data.designation}</td>
                                <td>{exp.data.city}</td>
                                <td>{exp.data.state}</td>
                                <td>{exp.data.country}</td>
                                <td className='actions'>
                                    <FiEdit2 size={18} className='action-icons edit' style={{cursor: 'pointer'}}/>
                                    <FiTrash2 size={18} className='action-icons delete' style={{cursor: 'pointer'}}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="section-footer">
                    <Button to="/add-experience" tag={Link} color='primary'>Add New Experience</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ExperienceList