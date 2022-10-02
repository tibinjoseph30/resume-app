import { useState, useMemo } from 'react'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import { Form, Row, Col, FormGroup, Label, Button, Toast, ToastBody, Input } from 'reactstrap'
import Select from 'react-select'
import { db } from '../../../config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import languageList from '../../../api/LanguageSelect.js'

const LanguageAdd = () => {

    const initialValues = {
        language: "",
        level: ""
    }
    const languageOptions = [
        {value: "native", label: "Native"},
        {value: "advanced", label: "Advanced"},
        {value: "intermediate", label: "Intermediate"},
        {value: "elementary", label: "Elementary"},
        {value: "beginner", label: "Beginner"},
        {value: "no_profficiency", label: "No Profficiency"},
    ]
    const [formValues, setFormValues] = useState(initialValues)
    const [selectValue, setSelectValue] = useState('')
    const [status, setStatus] = useState(null)
    const [show, setShow] = useState(true)

    const options = useMemo(()=>languageList().getData(), [])
    
    const handleSubmit= (event) => {
        event.preventDefault();
        console.log(formValues);
        const languageCollectionRef = collection(db, 'language');
        addDoc(languageCollectionRef, formValues)
        .then(response => {
          console.log(response)
          setStatus({ type: 'success' });
        })
        .catch(error => {
          console.log(error.message)
          setStatus({ type: 'error' });
        })
        setFormValues(initialValues)
        setTimeout(() => { 
            setShow(false)
        }, 5000);
    }

    return (
    <div className='admin-panel'>
        <Sidebar/>
        <div className="right-block">
            <Topbar/>
            <div className="section-panel">
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
                            <Button type='submit' color='primary' className=''>Add Skill</Button>
                        </div>
                        {status?.type === 'success' && (
                            <Toast isOpen={show} className='bg-success text-white position-absolute' style={{bottom: '10px', right: '10px'}}>
                                <ToastBody>
                                You are successfully added a new language.
                                </ToastBody>
                            </Toast>
                        )}
                        {status?.type === 'error' && (
                            <Toast isOpen={show} className='bg-danger text-white position-absolute' style={{bottom: '10px', right: '10px'}}>
                                <ToastBody>
                                Something goes wrong.
                                </ToastBody>
                            </Toast>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LanguageAdd