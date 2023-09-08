import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap'
import { db } from '../config/firebase-config'

const Certification = () => {

    const [certification, setCertification] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [joinMonth, setJoinMonth] = useState(null)
    const [relieveMonth, setRelieveMonth] = useState(null)
    const [joinYear, setJoinYear] = useState(null)
    const [relieveYear, setRelieveYear] = useState(null)
    
    useEffect(()=> {
        getCertification()
    }, [])
    
    function getCertification() {
        const certificationCollectionRef = collection(db, 'certification')
        getDocs(certificationCollectionRef)
        .then(response => {
            const getCer = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,
            }))
            setCertification(getCer)
            console.log(getCer);
            setIsLoading(true)

            for (const document of getCer) {
                const joinDate = document.data.joinDate;
                const relieveDate = document.data.relieveDate;

                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ];               
                const newJoinDate = new Date(joinDate);
                const newRelieveDate = new Date(relieveDate);
                setJoinMonth(monthNames[newJoinDate.getMonth()])
                setRelieveMonth(monthNames[newRelieveDate.getMonth()])
                setJoinYear(newJoinDate.getFullYear())
                setRelieveYear(newRelieveDate.getFullYear())

                console.log(joinMonth)
            }
        })
        .catch(error => console.log(error.message))
    }

  return (
    <div className='section section-education'>
        <Card>
            <CardHeader>
                <h5>Certification</h5>
            </CardHeader>
            <CardBody>
                {!isLoading ? 
                    <div className='text-center'>
                        <Spinner color='primary'/>
                    </div> :
                    (certification.length === 0 ?
                        <div className="text-center">
                            There is nothing added yet !!
                        </div> :
                        <ul className='education-list list-unstyled mb-0'>
                            {certification.map((cer, id)=> (
                                <li key={cer.id}>
                                    <div className='d-flex '>
                                        <div className='flex-fill'>
                                            <div className="d-flex align-items-center">
                                                <div className='fw-semibold text-capitalize'>{cer.data.course}</div>
                                                <div className='ms-auto'>
                                                    <span className="badge bg-light text-dark fw-normal">{cer.data.courseType}</span>
                                                </div>
                                            </div>
                                            <div className='mt-2 text-capitalize'>{cer.data.institute}, in  <span className='small'>{relieveYear}</span></div>
                                            <div className='small text-capitalize'>{cer.data.city}, {cer.data.state}, {cer.data.country}</div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                } 
            </CardBody>
        </Card>
    </div>
  )
}

export default Certification