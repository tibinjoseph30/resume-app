import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap'
import { db } from '../config/firebase-config'

const Hobbies = () => {

    const [hobbies, setHobbies] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    
    useEffect(()=> {
        getHobbies()
    }, [])
    
    function getHobbies() {
        const hobbiesCollectionRef = collection(db, 'interest')
        
        getDocs(query(hobbiesCollectionRef, orderBy('createdAt')))
        .then(response => {
            const getHob = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,
            }))
            setHobbies(getHob)
            console.log(getHob);
            setIsLoading(true)
        })
        .catch(error => console.log(error.message))
    }

  return (
    <div className='section section-hobbies'>
        <Card>
            <CardHeader>
                <h6>Hobbies</h6>
            </CardHeader>
            <CardBody>
                {!isLoading ?
                    <div className="text-center">
                        <Spinner color='primary'/>
                    </div> :
                    (hobbies.length === 0 ?
                        <div className="text-center">
                            There is nothing added yet !!
                        </div> :
                        <ul className='hobbies-list list-unstyled mb-0'>
                            {hobbies.map((hob, id)=> (
                                <li className='text-capitalize' key={hob.id}>{hob.data.interest}</li>
                            ))}
                        </ul>
                    )
                }
            </CardBody>
        </Card>
    </div>
  )
}

export default Hobbies