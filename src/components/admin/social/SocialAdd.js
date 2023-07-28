import React, { useMemo, useState } from 'react'
import socialMediaList from '../../../api/SocialMediaSelect'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import Select from 'react-select/dist/declarations/src/Select'

const SocialAdd = () => {

    const initialValues = {
        media: "",
        code: "",
        url: ""
    }
    const [formValues, setFormValues] = useState(initialValues)
    const [selectValue, setSelectValue] = useState('')
    const [isLoading, setIsloading] = useState(false);

    const socialOptions = useMemo(()=>socialMediaList().getData(), []);
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
        const socialCollectionRef = collection(db, 'social');
        addDoc(socialCollectionRef, formValues)
        .then(response => {
          console.log(response);
          navigate(-1);
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
            <h4 className='section-title'>Add Social Media</h4>
        </div>
        <div className="section-body">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xl="4" sm="6">
                        <FormGroup>
                            <Label>
                                Media
                            </Label>
                            <Select
                                options={socialOptions}
                                menuPlacement="auto"
                                placeholder="Select media"
                                className='selectpicker'
                                onChange={(selectedValue) => {
                                    setSelectValue(selectValue)
                                    setFormValues({...formValues, media: selectedValue.label, code: selectedValue.code})
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col xl="4" sm="6">
                            <FormGroup>
                                <Label>
                                    Url
                                </Label>
                                <Input
                                    type="text"
                                    name="url"
                                    value={formValues.url}
                                    placeholder="Enter a url"
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </Col>
                </Row>
                <div className='form-action'>
                    <Button type='submit' color='primary' className='d-flex align-items-center'>Add Media 
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

export default SocialAdd