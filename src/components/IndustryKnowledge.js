import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap'
import { db } from '../config/firebase-config';

const IndustryKnowledge = () => {

    const [knowledge, setKnowledge] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        getKnowledge()
    }, [])

    function getKnowledge() {
        const knowledgeCollectionRef = collection(db, 'knowledge')
        
        getDocs(query(knowledgeCollectionRef, orderBy('createdAt', 'desc')))
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

  return (
    <div className='section section-industry-knowledge'>
        <Card>
            <CardHeader>
                <h6>Industry Knowledge</h6>
            </CardHeader>
            <CardBody>
                <div className='knowledge-block'>
                    {!isLoading ? 
                    <div className='text-center'>
                        <Spinner color='primary'/>
                    </div> :
                    (knowledge.length === 0 ? 
                    <div className='text-center'>
                        There is nothing added yet !!
                    </div> : 
                    knowledge.map((kno, id)=> (
                        <span key={kno.id}>{kno.data.knowledge}</span>
                    )))}
                    
                </div>
            </CardBody>
        </Card>
    </div>
  )
}

export default IndustryKnowledge