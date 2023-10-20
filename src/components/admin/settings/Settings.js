import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import { db } from '../../../config/firebase-config';
import { useNavigate } from 'react-router-dom';

const Settings = () => {

const navigate = useNavigate();

const [formValues, setFormValues] = useState('')
const [settings, setSettings] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [isLoaded, setIsLoaded] = useState(false);
const [color, setColor] = useState('#000000');
const [initialPrimaryColor, setInitialPrimaryColor] = useState('');

useEffect(()=> {
    getSettings()
}, [])

const handleColorChange = (event) => {
    const newColor = event.target.value
    setFormValues({
        ...formValues,
        primaryColor: newColor
    });
    setColor(newColor)
}

function getSettings() {
    const settingsCollectionRef = collection(db, 'settings');
    getDocs(settingsCollectionRef)
      .then((response) => {
        const getSett = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setSettings(getSett);
  
        if (getSett.length > 0) {
          const initialPrimaryColor = getSett[0].data.primaryColor;
  
          // Initialize the formValues state with the initial primary color
          setFormValues({
            primaryColor: initialPrimaryColor,
          });
  
          // Set the initialPrimaryColor state
          setInitialPrimaryColor(initialPrimaryColor);
        }
  
        setIsLoading(true);
    })
    .catch((error) => {
    // Handle any errors that may occur during the Firestore fetch
    console.error('Error fetching settings:', error);
    });
}
  

const handleSubmit = (event) => {
    event.preventDefault();
  
    setIsLoaded(true)
    // Assuming you want to update the primaryColor field for all settings
    // Create an array of promises for all updates
    const updatePromises = settings.map((sett) => {
      const settingsDocRef = doc(db, 'settings', sett.id);
      return updateDoc(settingsDocRef, {
        primaryColor: formValues.primaryColor,
        // Add other fields you want to update here
      });
    });
  
    // Execute all update promises
    Promise.all(updatePromises)
      .then(() => {
        // Settings have been updated successfully
        console.log('Settings updated successfully');
        // navigate(-1);
        setTimeout(()=> {
            setIsLoaded(false)
        }, 2000)
      })
      .catch((error) => {
        // Handle any errors that occur during updates
        console.error('Error updating settings:', error);
        setIsLoaded(false)
      });
  };
  

  return (
    <div>
        <div className="section-header">
            <h4 className='section-title'>Settings</h4>
        </div>
        <div className="section-body">
            {!isLoading ? 
                <Col className='text-center'>
                    <Spinner color='primary'/>
                </Col>:
                <Form onSubmit={handleSubmit}>
                    {settings.map((sett, id)=> (
                        <Row key={sett.id}>
                            <Col xl="4" sm="6">
                                <FormGroup>
                                    <Label>
                                    Primary Color
                                    </Label>
                                    <div className="colorpicker">
                                        <Input
                                            type="text"
                                            name="primaryColor"
                                            value={formValues.primaryColor}
                                            onChange={handleColorChange}
                                            required
                                        />
                                        <div className="colorbox" style={{backgroundColor: formValues.primaryColor}}>
                                            <Input
                                                type="color"
                                                value={formValues.primaryColor}
                                                onChange={handleColorChange}
                                            />
                                        </div>
                                    </div>
                                    
                                </FormGroup>
                            </Col>
                        </Row>
                    ))}
                    <div className='form-action'>
                        <Button type='submit' color='primary' className='d-flex align-items-center'>Update Settings 
                            {isLoaded ? 
                            <Spinner size="sm" className='ms-2' 
                            style={{
                                height: '20px', 
                                width:'20px', 
                                borderWidth: '2px'
                            }}/> : null}
                        </Button>
                    </div>
                </Form>
            }
        </div>
    </div>
  )
}

export default Settings