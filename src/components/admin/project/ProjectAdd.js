import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../../../config/firebase-config';
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';

const ProjectAdd = () => {

    const initialValues = {
        project: "",
        client: "",
        url: ""
    }
    const [formValues, setFormValues] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        });
        console.log(event.target)
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
    
      try {
        const projectCollectionRef = collection(db, 'project');
        await addDoc(projectCollectionRef, { 
          ...formValues, 
          createdAt: serverTimestamp() 
        });
        setIsLoading(false);
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
          <h4 className='section-title'>Add Project</h4>
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
                      value={formValues.project}
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
                      value={formValues.client}
                      placeholder="Enter client name"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xl="4" sm="6">
                  <FormGroup>
                    <Label>
                      Webite Url
                    </Label>
                    <Input
                      type="text"
                      name="url"
                      value={formValues.url}
                      placeholder="Enter url"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
            </Row>
            <div className='form-action'>
            <Button onClick={handleCancel} color='secondary' outline className='me-3'>Cancel</Button>
              <Button type='submit' color='primary' className='d-flex align-items-center'>Add Project 
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

export default ProjectAdd