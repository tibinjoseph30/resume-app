import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { Document, Page, Text, View, StyleSheet, pdf, Font, Image } from '@react-pdf/renderer';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { calculateTotalExperience } from '../utils/experienceUtils';
import { FiArrowDown } from 'react-icons/fi';

// Register font
Font.register({ family: 'Poppins', src: '../../fonts/Poppins-Regular.ttf' });
Font.register({ family: 'PoppinsSB', src: '../../fonts/Poppins-SemiBold.ttf' });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: '50px 100px 50px 100px',
    fontSize: '10px',
    color: '#444444',
    fontFamily: 'Poppins'
    
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
  avatar: {
    width: '40px',
    height: '40px',
    backgroundColor: '#e5e5e5',
    borderRadius: '100px',
    overflow: 'hidden',
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
    fontSize: '9px',
    letterSpacing: '1px'
  },
  underline: {
    height: '2px',
    width: '25px',
    backgroundColor: '#f3bc1b',
    marginTop: '3px'
  },
  title: {
    fontFamily: 'PoppinsSB',
    fontSize: '12px',
    letterSpacing: '1px'
  },
  skillBox: {
    backgroundColor: '#e5e5e5',
    padding: '3px 8px',
    marginRight: '5px',
    marginBottom: '5px',
    borderRadius: '2px',
  },
  textMuted: {
    color: '#818689'
  },
  fwMedium: {
    fontFamily: 'PoppinsSB',
  }
});

const Resume = () => {

  const [profile, setProfile] = useState(null)
  const [totalExperience, setTotalExperience] = useState(0);
  const [experience, setExperience] = useState(null)
  const [education, setEducation] = useState(null)
  const [skill, setSkill] = useState(null)
  const [language, setLanguage] = useState(null)
  const [hobbies, setHobbies] = useState(null)
  const [certification, setCertification] = useState(null)
  
  useEffect(()=> {
      getProfile()
      getExperience()
      getEducation()
      getSkills()
      getLanguage()
      getCertification()
      getHobbies()
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

  function getEducation() {
    const educationCollectionRef = collection(db, 'education');
      
      getDocs(query(educationCollectionRef, orderBy('createdAt', 'desc')))
      .then(response => {
          const getEdu = response.docs.map(doc => ({
              data: doc.data(),
              id: doc.id
          }));

          setEducation(getEdu);
      })
      .catch(error => console.log(error.message));
  }

  function getSkills() {
    const skillsCollectionRef = collection(db, 'skill')
    
    getDocs(query(skillsCollectionRef, orderBy('createdAt')))
    .then(response => {
        const getSki = response.docs.map(doc => ({
            data: doc.data(),
            id: doc.id,
        }))

        const groupedSkills = getSki.reduce((acc, skill) => {
            const { category } = skill.data;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(skill);
            return acc;
        }, {});

        setSkill(groupedSkills);
    })
    .catch(error => console.log(error.message))
  }

function getLanguage() {
  const languageCollectionRef = collection(db, 'language')

  getDocs(query(languageCollectionRef, orderBy('createdAt')))
  .then(response => {
      const getLan = response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
      }))
      setLanguage(getLan)
      console.log(getLan);
  })
  .catch(error => console.log(error.message))
}

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
  })
  .catch(error => console.log(error.message))
}

function getHobbies() {
  const hobbiesCollectionRef = collection(db, 'interest')
  
  getDocs(query(hobbiesCollectionRef, orderBy('createdAt')))
  .then(response => {
      const getHob = response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
      }))
      setHobbies(getHob)
  })
  .catch(error => console.log(error.message))
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
                  {prof.data.url ? 
                  <View style={styles.avatar}>
                    <Image src={prof.data.url} alt="" />
                  </View> : 
                  <View style={styles.brand}>
                    <Text>{prof.data.firstName.substring(0, 1)}</Text>
                    <Text>{prof.data.lastName.substring(0, 1)}</Text>
                  </View>
                  }
                </View> 
                <Text style={styles.user}>{prof.data.firstName} {prof.data.lastName}</Text>
                <View style={{marginTop: '20px'}}>
                  <Text>{prof.data.designation}</Text>
                </View>
                <View>
                  <Text>{prof.data.email} | +{prof.data.phoneCode} {prof.data.phone}</Text>
                  <Text>{prof.data.city}, {prof.data.state} | <Text><a href={prof.data.weburl}><Text>{prof.data.weburl.replace(/^https:\/\//, '')}</Text></a></Text></Text>
                </View>
                <View style={{marginTop: '10px'}}>
                  <Text style={styles.textMuted}>
                    Creative task-driven Web Developer with over {totalExperience.years} years of experience in web design and development. Proficient with HTML, CSS and JS Frameworks, with extensive knowledge of UI/UX interface designing and user psychology. Received 90%+ experience scores on every web application built for Softwares.
                  </Text>
                </View>
              </View>
            ))}
            <View>
              <View style={styles.heading}>
                <Text >Work Experience</Text>
                <div style={styles.underline}></div>
              </View>
              {experience.map((exp, id)=> (
                <View key={exp.id} style={{marginBottom: '20px'}}>
                  <Text><Text style={[styles.title, {textTransform: 'uppercase'}]}>{exp.data.organization}</Text> <Text style={{fontSize: '10px'}}>/ {exp.data.designation}</Text></Text>
                  <Text style={{textTransform: 'capitalize'}}>{exp.data.city}, {exp.data.state}, {getFormattedDate(exp.data.joinDate)} - {exp.data.relieveDate ? getFormattedDate(exp.data.relieveDate) : 'Present'}</Text>
                  <View>
                    <ul style={{marginTop: '8px'}}>
                      {exp.data.roles.map((role, index)=> (
                        <li key={index}>
                          <View style={{flexDirection: "column"}}>
                            <View style={{ flexDirection: "row"}}>
                              <Text style={{ marginRight: 8 }}>•</Text>
                              <Text>{role}</Text>
                            </View>
                          </View>
                        </li>
                      ))}
                    </ul>
                  </View>
                </View>
              ))}
            </View>
            <View>
              <View style={styles.heading}>
                <Text >Skills</Text>
                <div style={styles.underline}></div>
              </View>
              <View style={{marginBottom: '20px'}}>
                {Object.keys(skill).map(category => (
                  <View key={category} style={{ flexDirection: "row", flexWrap: 'wrap', marginBottom: '5px' }}>
                    <View style={{width: '40%'}}>
                      <Text style={[styles.fwMedium, {textTransform: 'capitalize'}]}>{category}:</Text>
                    </View>
                    <View style={{width: '60%'}}>
                      <Text>
                      {skill[category].map((ski, id)=> (
                        <Text key={ski.id} style={{textTransform: 'capitalize'}}>{ski.data.skill}{id !== skill[category].length - 1 ? ', ' : ''}</Text>
                      ))}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View>
              <View style={styles.heading}>
                <Text >Certification</Text>
                <div style={styles.underline}></div>
              </View>
              {certification.map((cer, id)=> (
                <View key={cer.id} style={{marginBottom: '20px'}}>
                  <Text style={styles.title}>{cer.data.course}</Text>
                  <Text>{cer.data.institute} | {getFormattedDate(cer.data.relieveDate)}</Text>
                  <Text style={{textTransform: 'capitalize'}}>{cer.data.city}, {cer.data.state}</Text>
                </View>
              ))}
            </View>
            <View>
              <View style={styles.heading}>
                <Text >Education</Text>
                <div style={styles.underline}></div>
              </View>
              {education.map((edu, id)=> (
                <View key={edu.id} style={{marginBottom: '20px'}}>
                  <Text style={styles.title}>{edu.data.university}</Text>
                  <Text>{edu.data.course} | {getFormattedDate(edu.data.relieveDate)}</Text>
                  <Text style={{textTransform: 'capitalize'}}>{edu.data.city}, {edu.data.state}</Text>
                </View>
              ))}
            </View>
            <View>
              <View style={styles.heading}>
                <Text >Language</Text>
                <div style={styles.underline}></div>
              </View>
              <View>
                <ul style={{marginTop: '5px'}}>
                  {language.map((lan, id)=> (
                    <li key={lan.id}>
                      <View style={{flexDirection: "column"}}>
                        <View style={{ flexDirection: "row"}}>
                          <Text style={{ marginRight: 8 }}>•</Text>
                          <Text>{lan.data.language}</Text>
                        </View>
                      </View>
                    </li>
                  ))}
                </ul>
              </View>
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

  return(
    <Button 
      color='primary' 
      className='rounded-pill ms-auto d-flex align-items-center' 
      onClick={generatePDF}
    >
      Resume <FiArrowDown className='ms-1'/>
    </Button>
  );
};

export default Resume;
