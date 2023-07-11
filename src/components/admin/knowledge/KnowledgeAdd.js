import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import { db } from '../../../config/firebase-config'

const KnowledgeAdd = () => {

    const initialValues = {
        knowledge: "",
    }
    const [formValues, setFormValues] = useState(initialValues)
    const [isLoading, setIsloading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormValues({
          ...formValues,
          [event.target.name]: event.target.value,
        });
        console.log(event.target)
    };
    
    const handleSubmit= (event) => {
        event.preventDefault();
        console.log(formValues);
        const knowledgeCollectionRef = collection(db, 'knowledge');
        addDoc(knowledgeCollectionRef, formValues)
        .then(response => {
          console.log(response);
          navigate('../knowledge');
        })
        .catch(error => {
          console.log(error.message)
        })
        setIsloading(true);
        setFormValues(initialValues)
    }

  return (
    <div>
        <div className="section-header">
            <h4 className='section-title'>Add Industry Knowledge</h4>
        </div>
        <div className="section-body">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xl="4" sm="6">
                        <FormGroup>
                            <Label>
                                Knowledge
                            </Label>
                            <Input
                                type="text"
                                name="knowledge"
                                value={formValues.knowledge}
                                placeholder="Enter a knowledge"
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <div className='form-action'>
                    <Button type='submit' color='primary' className='d-flex align-items-center'>Add Knowledge 
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

export default KnowledgeAdd