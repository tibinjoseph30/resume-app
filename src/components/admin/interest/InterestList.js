import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, Col, Row, Spinner } from 'reactstrap'
import { db } from '../../../config/firebase-config'

const InterestList = () => {

    const [language, setLanguage] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        getInterest()
    }, [])

    function getInterest() {
        const interestCollectionRef = collection(db, 'interest')
        
        getDocs(query(interestCollectionRef, orderBy('createdAt')))
        .then(response => {
            const getInt = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            }))
            setLanguage(getInt)
            console.log(getInt);
            setIsLoading(true)
        })
        .catch(error => console.log(error.message))
    }
    function deleteLanguage(id) {
        const interestDeleteRef = doc(db, 'interest', id)
        deleteDoc(interestDeleteRef)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.message)
        })
        getInterest()
    }
    return (
        <div>
            <div className="section-header">
            <h4 className='section-title'>Interests</h4>
                <Button tag={Link} to="../add-interest" color='primary' className='ms-auto'>Add New Interest</Button>
            </div>
            <div className="section-body">
            <Row>
                {!isLoading ? 
                <Col className='text-center'>
                    <Spinner color='primary'/>
                </Col> : 
                (language.length === 0 ? 
                <Col className='text-center'>
                    There is nothing added yet !!
                </Col> :
                language.map((int, id)=>(
                <Col xxl="2" xl="3" lg="4" sm="6" className='mb-3' key={int.id}>
                    <Card className='border-dashed'>
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <p className='mb-0'>{int.data.interest}</p>
                                <FiTrash2 onClick={()=>deleteLanguage(int.id)} className='ms-auto action-btn delete' style={{cursor: 'pointer', fontSize: '16px'}}/>
                            </div> 
                        </CardBody>
                    </Card>
                </Col>
                ))
                )}
            </Row>
            </div>
        </div>
    )
}

export default InterestList