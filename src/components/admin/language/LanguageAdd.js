import { useState, useMemo } from 'react'
import { Form, Row, Col, FormGroup, Label, Button, Spinner, Input } from 'reactstrap'
import Select from 'react-select'
import { db } from '../../../config/firebase-config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import languageList from '../../../api/LanguageSelect.js'
import { useNavigate } from 'react-router-dom'

const LanguageAdd = () => {

    const initialValues = {
        language: '',
        code: '',
        write: false,
        read: false,
        listen: false ,
        speak: false
    }

    const [formValues, setFormValues] = useState(initialValues)
    const [selectValue, setSelectValue] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [isWriteChecked, setIsWriteChecked] = useState(true);
    const [isReadChecked, setIsReadChecked] = useState(true);
    const [isListenChecked, setIsListenChecked] = useState(true);
    const [isSpeakChecked, setIsSpeakChecked] = useState(true);

    const options = useMemo(()=>languageList().getData(), []);
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
      
        try {
          const languageCollectionRef = collection(db, 'language');
          await addDoc(languageCollectionRef, { 
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
                                        setFormValues({...formValues, language: selectedValue.label, code: selectedValue.code})
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <h5 className='my-3'>Usage</h5>
                    <Row>
                        <Col lg="2">
                            <FormGroup>
                                <div className="form-checkbox">
                                    <Input 
                                        type='checkbox' 
                                        id="lan_write"
                                        checked={!isWriteChecked}
                                        onChange={() => {
                                            setIsWriteChecked(!isWriteChecked)
                                            setFormValues({...formValues, write: isWriteChecked})
                                        }}
                                    />
                                    <Label htmlFor="lan_write">Write</Label>
                                </div>
                            </FormGroup>
                        </Col>
                        <Col lg="2">
                            <FormGroup>
                                <div className="form-checkbox">
                                    <Input 
                                        type='checkbox' 
                                        id="lan_read"
                                        checked={!isReadChecked}
                                        onChange={() => {
                                            setIsReadChecked(!isReadChecked)
                                            setFormValues({...formValues, read: isReadChecked})
                                        }}
                                    />
                                    <Label htmlFor="lan_read">Read</Label>
                                </div>
                            </FormGroup>
                        </Col>
                        <Col lg="2">
                            <FormGroup>
                                <div className="form-checkbox">
                                    <Input 
                                        type='checkbox' 
                                        id='lan_listen'
                                        checked={!isListenChecked}
                                        onChange={() => {
                                            setIsListenChecked(!isListenChecked)
                                            setFormValues({...formValues, listen: isListenChecked})
                                        }}
                                    />
                                    <Label htmlFor="lan_listen">Listen</Label>
                                </div>
                            </FormGroup>
                        </Col>
                        <Col lg="2">
                            <FormGroup>
                                <div className="form-checkbox">
                                    <Input 
                                        type='checkbox' 
                                        id="lan_speak"
                                        checked={!isSpeakChecked}
                                        onChange={() => {
                                            setIsSpeakChecked(!isSpeakChecked)
                                            setFormValues({...formValues, speak: isSpeakChecked})
                                        }}
                                    />
                                    <Label htmlFor="lan_speak">Speak</Label>
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <div className='form-action'>
                    <Button onClick={handleCancel} color='secondary' outline className='me-3'>Cancel</Button>
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