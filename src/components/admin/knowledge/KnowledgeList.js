import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, Col, Row, Spinner } from 'reactstrap'
import { db } from '../../../config/firebase-config'
import { FiTrash2 } from 'react-icons/fi'

const KnowledgeList = () => {
    const [knowledge, setKnowledge] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        getKnowledge()
    }, [])

    function getKnowledge() {
        const knowledgeCollectionRef = collection(db, 'knowledge')
        getDocs(knowledgeCollectionRef)
        .then(response => {
            const getKno = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            }))
            setKnowledge(getKno)
            console.log(getKno);
            setIsLoading(true)
        })
        .catch(error => console.log(error.message))
    }

    function deleteKnowledge(id) {
        const knowledgeDeleteRef = doc(db, 'knowledge', id)
        deleteDoc(knowledgeDeleteRef)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.message)
        })
        getKnowledge()
    }

  return (
    <div>
        <div className="section-header">
        <h4 className='section-title'>Industry Knowledge</h4>
            <Button tag={Link} to="../add-knowledge" color='primary' className='ms-auto'>Add New Knowledge</Button>
        </div>
        <div className="section-body">
        <Row>
            {!isLoading ? 
            <Col className='text-center'>
                <Spinner color='primary'/>
            </Col> : 
            (knowledge.length === 0 ? 
            <Col className='text-center'>
                There is nothing added yet !!
            </Col> :
            knowledge.map((kno, id)=>(
            <Col xxl="2" xl="3" lg="4" sm="6" className='mb-3' key={kno.id}>
                <Card className='border-dashed'>
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <p className='mb-0'>{kno.data.knowledge}</p>
                            <FiTrash2 onClick={()=>deleteKnowledge(kno.id)} className='ms-auto action-btn delete' style={{cursor: 'pointer', fontSize: '16px'}}/>
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

export default KnowledgeList