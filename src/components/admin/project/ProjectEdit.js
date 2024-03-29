import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import { db } from '../../../config/firebase-config';

const ProjectEdit = () => {

    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const [newFormValues, setNewFormValues] = useState(location.state.state);
    console.log(newFormValues)
    const newId = location.state.id

    const navigate = useNavigate();

    const handleChange = (event) => {
        setNewFormValues({
        ...newFormValues,
        [event.target.name]: event.target.value,
        });
        console.log(event.target)
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
    
      try {
        const projectCollectionRef = doc(db, 'project', newId);
        
        // Retrieve the existing experience data from Firestore
        const existingProject = (await getDoc(projectCollectionRef)).data();

        // Update fields in the Firestore document
        setDoc(projectCollectionRef, { ...newFormValues, createdAt: existingProject.createdAt });
  
        // Update the state with the updated fields and original 'createdAt' value
        setNewFormValues((prev) => ({ ...prev, createdAt: existingProject.createdAt }));
    
        navigate(-1);

      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };

    const handleCancel = () => {
      navigate(-1)
  }

  return (
    <div>
      <div className="section-header">
        <h4 className='section-title'>Edit Experience</h4>
      </div>
      <div className="section-body">
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col xl="4" sm="6">
                  <FormGroup>
                    <Label>
                      Project
                    </Label>
                    <Input
                      type="text"
                      name="project"
                      value={newFormValues.project}
                      placeholder="Enter project name"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xl="4" sm="6">
                  <FormGroup>
                    <Label>
                      Client
                    </Label>
                    <Input
                      type="text"
                      name="client"
                      value={newFormValues.client}
                      placeholder="Enter client name"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xl="4" sm="6">
                  <FormGroup>
                    <Label>
                      Website Url
                    </Label>
                    <Input
                      type="text"
                      name="url"
                      value={newFormValues.url}
                      placeholder="Enter url"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
            </Row>
            <div className='form-action'>
            <Button onClick={handleCancel} color='secondary' outline className='me-3'>Cancel</Button>
              <Button type='submit' color='primary' className='d-flex align-items-center'>Update Project 
                  {isLoading ? 
                  <Spinner size="sm" className='ms-2' 
                  style={{
                      height: '20px', 
                      width:'20px', 
                      borderWidth: '2px'
                  }}/> : ''}
              </Button>
            </div>
        </Form>
      </div> 
    </div>
  )
}

export default ProjectEdit