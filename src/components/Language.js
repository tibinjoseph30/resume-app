import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FiBookOpen, FiEdit2, FiHeadphones, FiMic } from 'react-icons/fi'
import { Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap'
import { db } from '../config/firebase-config'

const Language = () => {

    const [language, setLanguage] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    
    useEffect(()=> {
        getLanguage()
    }, [])
    
    function getLanguage() {
        const languageCollectionRef = collection(db, 'language')

        getDocs(query(languageCollectionRef, orderBy('createdAt')))
        .then(response => {
            const getLan = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,
            }))
            setLanguage(getLan)
            console.log(getLan);
            setIsLoading(true)
        })
        .catch(error => console.log(error.message))
    }

  return (
    <div className='section section-language'>
        <Card>
            <CardHeader>
                <h5>Language</h5>
            </CardHeader>
            <CardBody>
                {!isLoading ?
                    <div className="text-center">
                        <Spinner color='primary'/>
                    </div> :
                    (language.length === 0 ?
                        <div className="text-center">
                            There is nothing added yet !!
                        </div> :
                        <Row className='g-3'>
                            {language.map((lan, id)=> (
                                <Col lg="4" key={lan.id}>
                                    <div className='language-box'>
                                        <div className="d-flex align-items-center">
                                            <div className='icon text-capitalize me-3'>{lan.data.code}</div>
                                            <div>
                                                <div className='fw-semibold'>{lan.data.language}</div>
                                                <div className='text-muted small'>
                                                    {
                                                        (lan.data.read && lan.data.write && lan.data.listen && lan.data.speak) === true ? 'Native' : 
                                                        (lan.data.read && lan.data.write && lan.data.listen) === true && lan.data.speak === false ? 'Advanced' : 'Beginner'
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <ul className='list-unstyled mb-0 mt-3 lan-experience-list'>
                                            <li className={lan.data.read === true ? 'active' : ''}>
                                                <div className="lan-icon">
                                                    <FiEdit2/>
                                                </div>
                                            </li>
                                            <li className={lan.data.write === true ? 'active' : ''}>
                                                <div className="lan-icon">
                                                    <FiBookOpen/>
                                                </div>
                                            </li>
                                            <li className={lan.data.listen === true ? 'active' : ''}>
                                                <div className="lan-icon">
                                                    <FiHeadphones/>
                                                </div>
                                            </li>
                                            <li className={lan.data.speak === true ? 'active' : ''}>
                                                <div className="lan-icon">
                                                    <FiMic/>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    )
                }
            </CardBody>
        </Card>
    </div>
  )
}

export default Language