import React from 'react';
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
import Resume from './Resume';
import Hobbies from './Hobbies';

const Home = () => {
  return (
    <main>
        <Container>
          <Row>
            <Col lg="8">
              <Header/>
              <Profile/>
              <Experience/>
              <Education/>
              <Skills/>
              <Language/>
            </Col>
            <Col lg="4">
              <Projects/>
              <CareerStatus/>
              <IndustryKnowledge/>
              <Resume/>
              <Hobbies/>
            </Col>
          </Row>
        </Container>
      </main>
  )
}

export default Home