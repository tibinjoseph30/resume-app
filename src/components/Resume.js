import React from 'react';
import { Button, Card, CardBody, Container } from 'reactstrap';
import { Document, Page, Text, View, StyleSheet, pdf, Font } from '@react-pdf/renderer';

// Register font
Font.register({ family: 'Poppins', src: '../../fonts/Poppins-Regular.ttf' });
Font.register({ family: 'PoppinsSB', src: '../../fonts/Poppins-SemiBold.ttf' });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: '30px 50px 30px 100px',
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
  const generatePDF = async () => {
    // Define your PDF content
    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <View style={styles.brand}>
              <Text>J</Text>
              <Text>D</Text>
            </View>
          </View> 
          <View>
            <Text style={styles.user}>John Doe</Text>
            <View style={{marginTop: '20px'}}>
              <Text>UI Developer</Text>
            </View>
            <View style={{marginTop: '5px'}}>
              <Text style={styles.textMuted}>johndoe@gmail.com | 8325785632</Text>
              <Text style={styles.textMuted}>Cochin, Kerala | www.johndoe.com</Text>
            </View>
            <View style={{marginTop: '5px'}}>
              <Text style={styles.textMuted}>Creative task-driven Web Developer with over 5 years of experience in web design and development. Equipped with knowledge in HTML, CSS, JavaScript and other programming languages apart from expertise in testing, UI/UX interface designing, market research, and troubleshooting complex issues. Received 90%+ experience scores on every web application built for Softwares.</Text>
            </View>
            <View>
              <Text style={styles.heading}>Work Experience</Text>
              <View style={{marginBottom: '20px'}}>
                <Text style={styles.title}>Alliance</Text>
                <Text style={styles.textMuted}>Senior UI Developer | Jul 2022 - Present</Text>
                <Text style={{marginTop: '5px'}}>Leading the future Creation tools on YouTube Shorts</Text>
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
