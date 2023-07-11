import { useState, useMemo } from 'react'
import { Form, Row, Col, FormGroup, Label, Button, Spinner } from 'reactstrap'
import Select from 'react-select'
import { db } from '../../../config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import languageList from '../../../api/LanguageSelect.js'
import { useNavigate } from 'react-router-dom'

const LanguageAdd = () => {

    const initialValues = {
        language: "",
        level: ""
    }
    const languageOptions = [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' },
        { value: 'professional', label: 'Professional' },
        { value: 'native', label: 'Native' }
      ]
    const [formValues, setFormValues] = useState(initialValues)
    const [selectValue, setSelectValue] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const options = useMemo(()=>languageList().getData(), []);
    const navigate = useNavigate();
    
    const handleSubmit= (event) => {
        event.preventDefault();
        console.log(formValues);
        const languageCollectionRef = collection(db, 'language');
        addDoc(languageCollectionRef, formValues)
        .then(response => {
          console.log(response)
          navigate('../language');
        })
        .catch(error => {
          console.log(error.message)
        })
        setIsLoading(true);
        setFormValues(initialValues)
    }

    return (
        <div>
            <div className="section-header">
                <h4 className='section-title'>Add Language</h4>
            </div>
            <div className="section-body">
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xl="4" sm="6">
                            <FormGroup>
                                <Label>
                                    Language
                                </Label>
                                <Select
                                    options={options}
                                    menuPlacement="auto"
                                    placeholder="Select language"
                                    className='selectpicker'
                                    onChange={(selectedValue) => {
                                        setSelectValue(selectValue)
                                        setFormValues({...formValues, language: selectedValue.label})
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col xl="4" sm="6">
                            <FormGroup>
                                <Label>
                                    Level
                                </Label>
                                <Select
                                    options={languageOptions}
                                    menuPlacement="auto"
                                    placeholder="Select level"
                                    className='selectpicker'
                                    onChange={(selectedValue) => {
                                        setSelectValue(selectValue)
                                        setFormValues({...formValues, level: selectedValue.label})
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <div className='form-action'>
                        <Button type='submit' color='primary' className='d-flex align-items-center'>Add Language 
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

export default LanguageAdd