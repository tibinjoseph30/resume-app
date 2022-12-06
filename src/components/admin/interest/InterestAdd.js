import { addDoc, collection } from 'firebase/firestore'
import React, { useMemo, useState } from 'react'
import { Button, Col, Form, FormGroup, Label, Row, Toast, ToastBody } from 'reactstrap'
import { db } from '../../../config/firebase-config'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import Select from 'react-select'
import interestList from '../../../api/InterestSelect'

const InterestAdd = () => {
    const initialValues = {
        interest: "",
    }
    const [formValues, setFormValues] = useState(initialValues)
    const [selectValue, setSelectValue] = useState('')
    const [status, setStatus] = useState(null)
    const [show, setShow] = useState(true)

    const options = useMemo(()=>interestList().getData(), [])
    
    const handleSubmit= (event) => {
        event.preventDefault();
        console.log(formValues);
        const interestCollectionRef = collection(db, 'interest');
        addDoc(interestCollectionRef, formValues)
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
                                <Button type='submit' color='primary' className=''>Add Interest</Button>
                            </div>
                            {status?.type === 'success' && (
                                <Toast isOpen={show} className='bg-success text-white position-absolute' style={{bottom: '10px', right: '10px'}}>
                                    <ToastBody>
                                    You are successfully added a new interest.
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

export default InterestAdd