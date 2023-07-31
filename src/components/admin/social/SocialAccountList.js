import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../config/firebase-config';
import { Button, Card, CardBody, Col, Row, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

const SocialAccountList = () => {

    const [social, setSocial] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        getSocial()
    }, [])

    function getSocial() {
        const socialCollectionRef = collection(db, 'social')
        getDocs(socialCollectionRef)
        .then(response => {
            const getSoc = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            }))
            setSocial(getSoc)
            console.log(getSoc);
            setIsLoading(true)
        })
        .catch(error => console.log(error.message))
    }
    function deleteLanguage(id) {
        const socialDeleteRef = doc(db, 'social', id)
        deleteDoc(socialDeleteRef)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.message)
        })
        getSocial()
    }

  return (
    <div>
        <div className="section-header">
        <h4 className='section-title'>Social Accounts</h4>
            <Button tag={Link} to="../add-social-account" color='primary' className='ms-auto'>Add New Account</Button>
        </div>
        <div className="section-body">
        <Row>
            {!isLoading ? 
            <Col className='text-center'>
                <Spinner color='primary'/>
            </Col> : 
            (social.length === 0 ? 
            <Col className='text-center'>
                There is nothing added yet !!
            </Col> :
            social.map((soc, id)=>(
            <Col xxl="2" xl="3" lg="4" sm="6" className='mb-3' key={soc.id}>
                <Card className='border-dashed'>
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <p className='mb-0'>{soc.data.media}</p>
                            <FiTrash2 onClick={()=>deleteLanguage(soc.id)} className='ms-auto action-btn delete' style={{cursor: 'pointer', fontSize: '16px'}}/>
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

export default SocialAccountList