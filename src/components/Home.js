import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './Header';
import Profile from './Profile';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Language from './Language';
import Projects from './Projects';
import CareerStatus from './CareerStatus';
import IndustryKnowledge from './IndustryKnowledge';
import Hobbies from './Hobbies';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const Home = () => {

  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  
  useEffect(()=> {
      getProfile()
  }, [])
  
  function getProfile() {
      const profileCollectionRef = collection(db, 'profile')
      getDocs(profileCollectionRef)
      .then(response => {
          const getPro = response.docs.map(doc => ({
              data: doc.data(),
              id: doc.id
          }))
          setProfile(getPro)
          console.log(getPro)
          setIsLoading(true)
      })
      .catch(error => console.log(error.message))
  }
  
  return (
    <main>
        <Container>
          <Row>
            <Col lg="8">
              <Header
                profile={profile} 
                isLoading={isLoading}
              />
              <Profile 
                profile={profile} 
                isLoading={isLoading}
              />
              <Experience/>
              <Education/>
              <Skills/>
              <Language/>
            </Col>
            <Col lg="4">
              <Projects/>
              <CareerStatus
                profile={profile} 
                isLoading={isLoading}
              />
              <IndustryKnowledge/>
              <Hobbies/>
            </Col>
          </Row>
        </Container>
      </main>
  )
}

export default Home