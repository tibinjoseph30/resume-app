import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { MdStarRate } from "react-icons/md";
import { Card, CardBody, CardHeader, Spinner, Table } from 'reactstrap'
import { db } from '../config/firebase-config';

const Skills = () => {

    const [skillsByCategory, setSkillsByCategory] = useState({});
    const [isLoading, setIsLoading] = useState(null)
    
    useEffect(()=> {
        getSkills()
    }, [])
    
    function getSkills() {
        const skillsCollectionRef = collection(db, 'skill')
        
        getDocs(query(skillsCollectionRef, orderBy('createdAt')))
        .then(response => {
            const getSki = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,
            }))
            // Group skills by category
            const groupedSkills = getSki.reduce((acc, skill) => {
                const { category } = skill.data;
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(skill);
                return acc;
            }, {});

            setSkillsByCategory(groupedSkills);
            // console.log(getSki);
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
                    (skillsByCategory.length === 0 ?
                        <div className="text-center">
                            There is nothing added yet !!
                        </div>: (
                            Object.keys(skillsByCategory).map(category => (
                                <div className='skillset' key={category}>
                                    <div className='text-capitalize fw-semibold mb-3'>{category}</div>
                                    <Table className='align-middle'>
                                        <tbody className='no-border'>
                                            {skillsByCategory[category].map((ski, id)=> (
                                                <tr key={ski.id}>
                                                    <td className='text-capitalize'>{ski.data.skill}</td>
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
                                </div>
                            ))
                        )
                    )
                }
            </CardBody>
        </Card>
    </div>
  )
}

export default Skills