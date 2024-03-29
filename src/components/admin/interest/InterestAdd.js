import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React, { useMemo, useState } from 'react'
import { Button, Col, Form, FormGroup, Label, Row, Spinner } from 'reactstrap'
import { db } from '../../../config/firebase-config'
import Select from 'react-select'
import interestList from '../../../api/InterestSelect'
import { useNavigate } from 'react-router-dom'

const InterestAdd = () => {
    const initialValues = {
        interest: "",
    }
    const [formValues, setFormValues] = useState(initialValues)
    const [selectValue, setSelectValue] = useState('')
    const [isLoading, setIsloading] = useState(false);

    const options = useMemo(()=>interestList().getData(), []);
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsloading(true);
      
        try {
          const skillCollectionRef = collection(db, 'interest');
          await addDoc(skillCollectionRef, { 
            ...formValues, 
            createdAt: serverTimestamp() 
          });
          setIsloading(false);
          navigate(-1);
        } catch (error) {
          console.log(error.message);
          setIsloading(false);
        }
    };

    const handleCancel = () => {
        navigate(-1)
    }

    return (
        <div>
            <div className="section-header">
                <h4 className='section-title'>Add Interest</h4>
            </div>
            <div className="section-body">
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xl="4" sm="6">
                            <FormGroup>
                                <Label>
                                    Interest
                                </Label>
                                <Select
                                    options={options}
                                    menuPlacement="auto"
                                    placeholder="Select interest"
                                    className='selectpicker'
                                    onChange={(selectedValue) => {
                                        setSelectValue(selectValue)
                                        setFormValues({...formValues, interest: selectedValue.label})
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <div className='form-action'>
                    <Button onClick={handleCancel} color='secondary' outline className='me-3'>Cancel</Button>
                        <Button type='submit' color='primary' className='d-flex align-items-center'>Add Interest 
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

export default InterestAdd