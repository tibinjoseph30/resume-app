import {useState, useEffect} from 'react'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import { Button, Spinner, Card, CardBody, Row, Col } from 'reactstrap'
import { NavLink as Link } from 'react-router-dom'
import { FiArrowDown, FiArrowUp, FiTrash2 } from 'react-icons/fi'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'

const SkillsList = () => {

    const [skill, setSkill] = useState([])
    const [isLoading, setIsLoading] = useState(false);

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
    function deleteSkill(id) {
        const skillDeleteRef = doc(db, 'skill', id)
        deleteDoc(skillDeleteRef)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.message)
        })
        getSkills()
    }

    return (
    <div className='admin-panel'>
        <Sidebar/>
        <div className='right-block'>
            <Topbar/>
            <div className='section-panel'>
                <div className="section-header">
                    <h4 className='section-title'>Skills</h4>
                    <Button tag={Link} to="/add-skill" color='primary' className='ms-auto'>Add New Skill</Button>
                </div>
                <div className="section-body">
                    <Row>
                        {!isLoading ? 
                        <Col className='text-center'>
                            <Spinner color='primary'/>
                        </Col> :
                        (skill.length === 0 ?
                            <Col className='text-center'>
                                There is no skills added yet !!
                            </Col> :
                            skill.map((ski, id) => (
                                <Col xxl="2" xl="3" lg="4" sm="6" className='mb-3' key={ski.id}>
                                    <Card className='border-dashed'>
                                        <CardBody>
                                            <div className="d-flex align-items-center">
                                                <h3 className='mb-0'>{ski.data.profficiency}</h3>
                                                <FiTrash2 onClick={()=>deleteSkill(ski.id)} className='ms-auto action-btn delete' style={{cursor: 'pointer', fontSize: '16px'}}/>
                                            </div>
                                            <p className='mb-0 mt-2'>{ski.data.skill}</p>  
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))
                        )}   
                    </Row>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SkillsList