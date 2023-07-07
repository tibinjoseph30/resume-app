import {useState, useEffect} from 'react'
import { Button, Col, Row, Spinner } from 'reactstrap'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import { NavLink as Link } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'

const ProfileView = () => {

    const [profile, setProfile] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        getProfile()
    }, [])

    function getProfile() {
        const profileCollectionRef = collection(db, 'profile');
        getDocs(profileCollectionRef)
        .then(response => {
            const getProf = response.docs.map((doc)=> ({
                data: doc.data(),
                id: doc.id
            }))
            setProfile(getProf);
            console.log(getProf);
            setIsLoading(true);
        })
    }
  return (
    <div className='admin-panel'>
        <Sidebar/>
        <div className="right-block">
            <Topbar/>
            <div className="section-panel">
                <div className="section-body">
                    {!isLoading ? 
                    <Col className='text-center'>
                        <Spinner color='primary'/>
                    </Col> :  
                    profile.map((prof, id)=>(
                        <Row key={prof.id}>
                            <Col lg="3">
                                <div className="profile-pic">
                                    <img src="../../../../images/user.jpg" alt="user" />
                                </div>
                            </Col>
                            <Col lg="9">
                                <h4>{prof.data.firstName} {prof.data.lastName}</h4>
                                <h6>{prof.data.designation}</h6>
                                <p className='mt-5'>lorem ipsum</p>
                                <div className='mt-5'>
                                    <Row>
                                        <Col lg="3">
                                            <div className='text-muted'>Address:</div>
                                        </Col>
                                        <Col lg="9">
                                            <div className='mb-3'>{prof.data.city}, {prof.data.state}, {prof.data.country}</div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="3">
                                            <div className='text-muted'>Phone:</div>
                                        </Col>
                                        <Col lg="9">
                                            <div className='mb-3'>{prof.data.phone}</div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="3">
                                            <div className='text-muted'>Email:</div>
                                        </Col>
                                        <Col lg="9">
                                            <div className='mb-3'>{prof.data.email}</div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="3">
                                            <div className='text-muted'>Date of Birth:</div>
                                        </Col>
                                        <Col lg="9">
                                            <div className='mb-3'></div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="3">
                                            <div className='text-muted'>Career Status:</div>
                                        </Col>
                                        <Col lg="9">
                                            <div className='mb-3'></div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="3">
                                            <div className='text-muted'>Freelance:</div>
                                        </Col>
                                        <Col lg="9">
                                            <div className='mb-3'></div>
                                        </Col>
                                    </Row>
                                    <Button tag={Link} to="/edit-profile" state={{state: prof.data, id: prof.id}} color='primary' className='mt-4'>Edit Profile</Button>
                                </div>
                            </Col>
                        </Row>
                    )) 
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileView