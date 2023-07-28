import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { MdStarRate } from "react-icons/md";
import { Card, CardBody, CardHeader, Spinner, Table } from 'reactstrap'
import { db } from '../config/firebase-config';

const Skills = () => {

    const [skill, setSkill] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    
    useEffect(()=> {
        getSkills()
    }, [])
    
    function getSkills() {
        const skillsCollectionRef = collection(db, 'skill')
        getDocs(skillsCollectionRef)
        .then(response => {
            const getSki = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,
            }))
            setSkill(getSki)
            console.log(getSki);
            setIsLoading(true)
        })
        .catch(error => console.log(error.message))
    }

  return (
    <div className='section section-skill'>
        <Card>
            <CardHeader>
                <h5>Skills</h5>
            </CardHeader>
            <CardBody>
                {!isLoading ?
                    <div className="text-center">
                        <Spinner color='primary'/>
                    </div> :
                    (skill.length === 0 ?
                        <div className="text-center">
                            There is nothing added yet !!
                        </div>:
                        <Table className='align-middle'>
                            <tbody>
                                {skill.map((ski, id)=> (
                                    <tr key={ski.id}>
                                        <td>{ski.data.skill}</td>
                                        <td className='text-muted small'>{ski.data.skillType}</td>
                                        <td width="100">
                                            <div className={"rating "+ (
                                                ski.data.profficiency >=90 ? 'expert' :
                                                ski.data.profficiency >=70 ? 'professional' :
                                                ski.data.profficiency >=50 ? 'advanced' :
                                                ski.data.profficiency >=30 ? 'intermediate' : 'beginner'
                                            )}>
                                                <MdStarRate/>
                                                <MdStarRate/>
                                                <MdStarRate/>
                                                <MdStarRate/>
                                                <MdStarRate/>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
                }
            </CardBody>
        </Card>
    </div>
  )
}

export default Skills