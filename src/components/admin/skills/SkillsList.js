import {useState, useEffect} from 'react'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import { Table, Button, Spinner, Alert } from 'reactstrap'
import { NavLink as Link, NavLink } from 'react-router-dom'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'

const SkillsList = () => {

    const [skill, setSkill] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);

    useEffect(()=> {
        getSkills()
    }, [])
    
    function getSkills() {
        const skillCollectionRef = collection(db, 'skill')
        getDocs(skillCollectionRef)
        .then(response => {
            const getSki = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            }))
            setSkill(getSki)
            // console.log(getExp);
            setIsLoading(true)
        })
        .catch(error => console.log(error.message))
    }
    function deleteEducation(id) {
        const skillDeleteRef = doc(db, 'skill', id)
        deleteDoc(skillDeleteRef)
        .then(response => {
            console.log(response)
            setStatus({ type: 'success' });
        })
        .catch(error => {
            console.log(error.message)
            setStatus({ type: 'error' });
        })
        getSkills()
        setAlertVisible(true)
        setTimeout(() => { 
            setAlertVisible(false)
        }, 5000);
    }

    return (
    <div className='admin-panel'>
        <Sidebar/>
        <div className='right-block'>
            <Topbar/>
            <div className='section-panel'>
                <h4 className='section-head'>Skills</h4>
                <div className='table-responsive'>
                    <Table>
                        <thead>
                            <tr>
                                <th>Skill</th>
                                <th>Profficiency</th>
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
                            (skill.length === 0 ? 
                                <tr>
                                    <td align='center' colSpan={100}>No data available</td>
                                </tr>:
                                skill.map((ski, id) => (
                                    <tr key={ski.id}>     
                                        <td>{ski.data.skill}</td>
                                        <td>{ski.data.profficiency}</td>
                                        <td className='actions'>
                                            <NavLink to={`/edit-skill/${id}`} state={{ state : ski.data, id : ski.id }}>
                                                <FiEdit2 size={18} className='action-icons edit' style={{cursor: 'pointer'}}/>
                                            </NavLink>
                                            <FiTrash2 onClick={()=>deleteEducation(ski.id)} size={18} className='action-icons delete' style={{cursor: 'pointer'}}/>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </div>
                {status?.type === 'success' && (
                    <Alert color='success' isOpen={alertVisible}>
                      Skill deleted
                    </Alert>
                )}
                {status?.type === 'error' && (
                    <Alert color='danger' isOpen={alertVisible}>
                      Something goes wrong
                    </Alert>
                )}
                <div className="form-action">
                    <Button tag={Link} to="/add-skill" color='primary'>Add New Skill</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SkillsList