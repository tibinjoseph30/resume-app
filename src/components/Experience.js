import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap' 
import { db } from '../config/firebase-config'
import { calculateExperience, calculateTotalExperience } from '../utils/experienceCalculation'

const Experience = () => {

    const [experience, setExperience] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    
    useEffect(()=> {
        getExperience()
    }, [])
    
    function getExperience() {
        const experienceCollectionRef = collection(db, 'experience');
        
        getDocs(query(experienceCollectionRef, orderBy('createdAt', 'desc')))
        .then(response => {
            const getExp = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            }));
            
            setExperience(getExp);
            setIsLoading(true);
            console.log(getExp)
            
            const totalExperience = calculateTotalExperience(getExp);
            console.log('experience:', totalExperience);
        })
        .catch(error => console.log(error.message));
    }

    function getFormattedDate(dateString) {
        const options = { year: 'numeric', month: 'short' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
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
                                        {exp.data.logo ? (
                                            <img
                                                src={exp.data.logo}
                                                alt=""
                                                style={{ width: '100%' }}
                                            />
                                            ) : (
                                            <img
                                                src='https://firebasestorage.googleapis.com/v0/b/resume-app-c31bf.appspot.com/o/images%2Fno-image.svg?alt=media&token=2dd03c2f-43a4-4456-b3c8-8972b6370074'
                                                alt=""
                                                style={{ width: '100%' }}
                                            />
                                        )}
                                    </div>
                                    <div className='flex-fill'>
                                        <div className="d-flex align-items-center">
                                            <div className='fw-semibold text-capitalize'>{exp.data.organization}</div>
                                            <div className='small text-muted ms-auto'>
                                                {calculateExperience(exp.data.joinDate, exp.data.relieveDate).years > 0 ? (
                                                    <span>{calculateExperience(exp.data.joinDate, exp.data.relieveDate).years} Years, {calculateExperience(exp.data.joinDate, exp.data.relieveDate).months} Months</span>
                                                ) : (
                                                    <span>{calculateExperience(exp.data.joinDate, exp.data.relieveDate).months} Months</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className='mt-2 text-capitalize'>{exp.data.designation}</div>
                                        <div className="d-flex align-items-center mt-1">
                                            <div className='small text-muted'>
                                                {getFormattedDate(exp.data.joinDate)} <span className='mx-1'>-</span> {exp.data.relieveDate ? getFormattedDate(exp.data.relieveDate) : 'Present'} 
                                            </div>
                                        </div>
                                        <div className='small text-capitalize mt-3'>{exp.data.city}, {exp.data.state}</div>
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