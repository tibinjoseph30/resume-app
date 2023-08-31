import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Container } from 'reactstrap';
import { Document, Page, Text, View, StyleSheet, pdf, Font } from '@react-pdf/renderer';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { calculateTotalExperience } from '../utils/experienceUtils';

// Register font
Font.register({ family: 'Poppins', src: '../../fonts/Poppins-Regular.ttf' });
Font.register({ family: 'PoppinsSB', src: '../../fonts/Poppins-SemiBold.ttf' });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: '50px 50px 50px 100px',
    fontSize: '10px',
    color: '#323336',
    fontFamily: 'Poppins',
  },
  brand: {
    borderColor: '#3b6bda',
    borderStyle: 'solid',
    borderWidth: '1px',
    fontWeight: 'bold',
    fontSize: '12px',
    textTransform: 'uppercase',
    color: '#3b6bda',
    width: '30px',
    height: '40px',
    marginRight: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'PoppinsSB',
    position: 'absolute',
    left: '-55px'
  },
  user: {
    fontSize: '20px',
    textTransform: 'uppercase',
    marginTop: '7px',
    fontFamily: 'PoppinsSB',
    letterSpacing: '1px'
  },
  heading: {
    textTransform: 'uppercase',
    marginTop: '30px',
    marginBottom: '20px',
    fontFamily: 'PoppinsSB',
    color: '#3b6bda',
    fontSize: '9px',
    letterSpacing: '1px'
  },
  title: {
    textTransform: 'uppercase',
    marginBottom: '5px',
    fontFamily: 'PoppinsSB',
    fontSize: '12px',
    letterSpacing: '1px'
  },
  textMuted: {
    color: '#818689'
  }
});

const Resume = () => {

  const [profile, setProfile] = useState(null)
  const [totalExperience, setTotalExperience] = useState(0);
  const [experience, setExperience] = useState(null)
  
  useEffect(()=> {
      getProfile()
      getExperience()
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
          // setIsLoading(true)
      })
      .catch(error => console.log(error.message))
  }

  function getExperience() {
    const experienceCollectionRef = collection(db, 'experience');
      
      getDocs(query(experienceCollectionRef, orderBy('createdAt', 'desc')))
      .then(response => {
          const getExp = response.docs.map(doc => ({
              data: doc.data(),
              id: doc.id
          }));

          setExperience(getExp);
  
          const calculatedTotalExperience = calculateTotalExperience(getExp);
          setTotalExperience(calculatedTotalExperience);
      })
      .catch(error => console.log(error.message));
  }

  function getFormattedDate(dateString) {
    const options = { year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  const generatePDF = async () => {
    // Define your PDF content
    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            {profile.map((prof, id)=> (
              <View key={prof.id}>
                <View>
                  <View style={styles.brand}>
                    <Text>{prof.data.firstName.substring(0, 1)}</Text>
                    <Text>{prof.data.lastName.substring(0, 1)}</Text>
                  </View>
                </View> 
                <Text style={styles.user}>{prof.data.firstName} {prof.data.lastName}</Text>
                <View style={{marginTop: '20px'}}>
                  <Text>{prof.data.designation}</Text>
                </View>
                <View style={{marginTop: '5px'}}>
                  <Text style={styles.textMuted}>{prof.data.email} | {prof.data.phone}</Text>
                  <Text style={styles.textMuted}>{prof.data.city}, {prof.data.state} | www.johndoe.com</Text>
                </View>
                <View style={{marginTop: '5px'}}>
                  <Text style={styles.textMuted}>Creative task-driven Web Developer with over {totalExperience.years} years of experience in web design and development. Equipped with knowledge in HTML, CSS, JavaScript and other programming languages apart from expertise in testing, UI/UX interface designing, market research, and troubleshooting complex issues. Received 90%+ experience scores on every web application built for Softwares.</Text>
                </View>
              </View>
            ))}
            <View>
              <Text style={styles.heading}>Work Experience</Text>
              {experience.map((exp, id)=> (
                <View key={exp.id} style={{marginBottom: '20px'}}>
                  <Text style={styles.title}>{exp.data.organization}</Text>
                  <Text style={styles.textMuted}>{exp.data.designation} | {getFormattedDate(exp.data.joinDate)} - {exp.data.relieveDate ? getFormattedDate(exp.data.relieveDate) : 'Present'}</Text>
                  <Text style={{marginTop: '5px'}}>Leading the future Creation tools on YouTube Shorts</Text>
                </View>
              ))}
            </View>
          </View>              
        </Page>
      </Document>
    );

    // Render and save the PDF
    const blob = await pdf(MyDocument).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'example.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main>
      <Container>
        <div className='section section-resume'>
          <Card>
            <CardBody>
              <Button color='primary' className='mt-5' onClick={generatePDF}>
                Download
              </Button>
            </CardBody>
          </Card>
        </div>
      </Container>
    </main>
  );
};

export default Resume;
