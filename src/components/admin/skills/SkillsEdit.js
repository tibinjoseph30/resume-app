import { useState } from 'react'
import { Col, Form, Row, FormGroup, Label, Input, Button, Alert } from 'reactstrap'
import Select from 'react-select'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import { db } from '../../../config/firebase-config'
import { doc, setDoc } from 'firebase/firestore'
import { useLocation } from "react-router-dom";

const SkillsEdit = () => {
    const initialValues = {
        skill: "",
        profficiency: "",
    }
    const options = [
        {value: "100", label: "100%"},
        {value: "90", label: "90%"},
        {value: "80", label: "80%"},
        {value: "70", label: "70%"},
        {value: "60", label: "60%"},
        {value: "50", label: "50%"},
        {value: "40", label: "40%"},
        {value: "30", label: "30%"},
        {value: "20", label: "20%"},
        {value: "10", label: "10%"},
    ]
    const [formValues, setFormValues] = useState(initialValues);
    const [selectValue, setSelectValue] = useState('')
    const [status, setStatus] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);

    const location = useLocation();
    const [newFormValues, setNewFormValues] = useState(location.state.state);
    // console.log(location.state);
    // const state = location.state.state
    // console.log(state)
    console.log(newFormValues)
    const newId = location.state.id
    // console.log(newId)

    const handleChange = (event) => {
        setNewFormValues({
          ...newFormValues,
          [event.target.name]: event.target.value,
        });
        console.log(event.target)
    };
    
    const handleSubmit= (event) => {
        event.preventDefault();
        const skillCollectionRef = doc(db, 'skill', newId)
        setDoc(skillCollectionRef, newFormValues)
        .then(response => {
            console.log(response)
            setStatus({ type: 'success' });
        })
        .catch(error => {
          console.log(error.message)
          setStatus({ type: 'error' });
        })
        console.log(newFormValues)
        setAlertVisible(true)
        setTimeout(() => { 
          setAlertVisible(false)
        }, 5000);
    }

    return (
    <div className='admin-panel'>
        <Sidebar/>
        <div className='right-block'>
            <Topbar/>
            <div className='section-panel'>
                <h4 className='section-head'>Edit Skill</h4>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xl="4" sm="6">
                            <FormGroup>
                                <Label>
                                    Skill
                                </Label>
                                <Input
                                    type="text"
                                    name="skill"
                                    value={newFormValues.skill}
                                    placeholder="Enter a skill"
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col xl="4" sm="6">
                            <FormGroup>
                                <Label>
                                    Profficiency
                                </Label>
                                <Select
                                    defaultInputValue={newFormValues.profficiency}
                                    options={options}
                                    menuPlacement="auto"
                                    placeholder="Selecct percentage"
                                    className='selectpicker'
                                    onChange={(selectedValue) => {
                                        setSelectValue(selectValue)
                                        setNewFormValues({...newFormValues, profficiency: selectedValue.label})
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    {status?.type === 'success' && (
                        <Alert color='success' isOpen={alertVisible}>
                        You are successfully updated the skill.
                        </Alert>
                    )}
                    {status?.type === 'error' && (
                        <Alert color='danger'>
                        Something goes wrong.
                        </Alert>
                    )}
                    <div className='form-action'>
                        <Button type='submit' color='primary' className=''>Update Skill</Button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
  )
}

export default SkillsEdit