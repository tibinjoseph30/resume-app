import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap'
import { db } from '../config/firebase-config'

const Education = () => {

    const [education, setEducation] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [joinMonth, setJoinMonth] = useState(null)
    const [relieveMonth, setRelieveMonth] = useState(null)
    const [joinYear, setJoinYear] = useState(null)
    const [relieveYear, setRelieveYear] = useState(null)
    
    useEffect(()=> {
        getEducation()
    }, [])
    
    function getEducation() {
        const educationCollectionRef = collection(db, 'education')
        getDocs(educationCollectionRef)
        .then(response => {
            const getEdu = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,
            }))
            setEducation(getEdu)
            console.log(getEdu);
            setIsLoading(true)

            for (const document of getEdu) {
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
                <h5>Education</h5>
            </CardHeader>
            <CardBody>
                {!isLoading ? 
                    <div className='text-center'>
                        <Spinner color='primary'/>
                    </div> :
                    (education.length === 0 ?
                        <div className="text-center">
                            There is nothing added yet !!
                        </div> :
                        <ul className='education-list list-unstyled mb-0'>
                            {education.map((edu, id)=> (
                                <li key={edu.id}>
                                    <div className='d-flex '>
                                        <div className='brand-box me-3'>
                                            <img src={edu.data.logo ? edu.data.logo : 'https://firebasestorage.googleapis.com/v0/b/resume-app-c31bf.appspot.com/o/images%2Fno-image.svg?alt=media&token=2dd03c2f-43a4-4456-b3c8-8972b6370074'} style={{width : '100%'}} alt="logo" />
                                        </div>
                                        <div className='flex-fill'>
                                            <div className="d-flex align-items-center">
                                                <div className='fw-semibold'>{edu.data.university}</div>
                                                <div className='ms-auto'>
                                                    <span className="badge bg-light text-dark fw-normal">{edu.data.courseType}</span>
                                                </div>
                                            </div>
                                            <div className='mt-2'>{edu.data.course}</div>
                                            <div className="d-flex align-items-center mt-1">
                                                <div className='small text-muted'>
                                                    {joinMonth} {joinYear} <span className='mx-1'>-</span> {relieveMonth} {relieveYear}                                                  
                                                </div>
                                            </div>
                                            <div className='small mt-3'>{edu.data.city}, {edu.data.state}, {edu.data.country}</div>
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

export default Education