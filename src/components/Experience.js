import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap' 
import { db } from '../config/firebase-config'

const Experience = () => {

    const [experience, setExperience] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [joinMonth, setJoinMonth] = useState(null)
    const [relieveMonth, setRelieveMonth] = useState(null)
    const [joinYear, setJoinYear] = useState(null)
    const [relieveYear, setRelieveYear] = useState(null)
    const [totalExperience, setTotalExperience] = useState(null)
    
    useEffect(()=> {
        getExperience()
    }, [])
    
    function getExperience() {
        const experienceCollectionRef = collection(db, 'experience')
        getDocs(experienceCollectionRef)
        .then(response => {
            const getExp = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,
            }))
            setExperience(getExp)
            console.log(getExp);
            setIsLoading(true)

            for (const document of getExp) {
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

                const diffDate = new Date(
                    newRelieveDate.getFullYear()-newJoinDate.getFullYear(), 
                    newRelieveDate.getMonth()-newJoinDate.getMonth(), 
                    newRelieveDate.getDate()-newJoinDate.getDate()
                );

                const diffYears = diffDate.getYear() + ' Year'
                const diffMonths = diffDate.getMonth() + ' Month'

                

                const sumExp = diffYears + ' ' + diffMonths

                setTotalExperience(sumExp)
                console.log(totalExperience)
            }
        })
        .catch(error => console.log(error.message))
    }
    
  return (
    <div className='section section-experience'>
        <Card>
            <CardHeader>
                <h5>All Experiences</h5>
            </CardHeader>
            <CardBody>
                {!isLoading ? 
                    <div className='text-center'>
                        <Spinner color='primary'/>
                    </div> :
                    (experience.length === 0 ?
                    <div className="text-center">
                        There is nothing added yet !!
                    </div> :
                    <ul className='experience-list list-unstyled mb-0'>
                        {experience.map((exp, id)=>(
                            <li key={exp.id}>
                                <div className='d-flex '>
                                    <div className='brand-box me-3'>
                                        <img src={exp.data.logo ? exp.data.logo : 'https://firebasestorage.googleapis.com/v0/b/resume-app-c31bf.appspot.com/o/images%2Fno-image.svg?alt=media&token=2dd03c2f-43a4-4456-b3c8-8972b6370074'} style={{width : '100%'}} alt="logo" />
                                    </div>
                                    <div className='flex-fill'>
                                        <div className="d-flex align-items-center">
                                            <div className='fw-semibold'>{exp.data.organization}</div>
                                            <div className='small text-muted ms-auto'>{totalExperience}</div>
                                        </div>
                                        <div className='mt-2'>{exp.data.designation}</div>
                                        <div className="d-flex align-items-center mt-1">
                                            <div className='small text-muted'>
                                                {joinMonth} {joinYear} <span className='mx-1'>-</span> {relieveMonth} {relieveYear}
                                            </div>
                                        </div>
                                        <div className='small mt-3'>{exp.data.city}, {exp.data.state}</div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                  
            </CardBody>
        </Card>
    </div>
  )
}

export default Experience