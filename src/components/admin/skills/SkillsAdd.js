import {useState} from 'react'
import Select from 'react-select'
import { Form, Row, Col, FormGroup, Label, Input, Button, Toast, ToastBody } from 'reactstrap'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import { db } from '../../../config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'

const SkillsAdd = () => {
    const initialValues = {
        skill: "",
        profficiency: ""
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
    const [show, setShow] = useState(true);

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
        const skillCollectionRef = collection(db, 'skill');
        addDoc(skillCollectionRef, formValues)
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
        <div className='right-block'>
            <Topbar/>
            <div className='section-panel'>
                <div className="section-header">
                    <h4 className='section-title'>Add Skill</h4>
                </div>
                <div className="section-body">
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
                                        value={formValues.skill}
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
                                        options={options}
                                        menuPlacement="auto"
                                        placeholder="Select percentage"
                                        className='selectpicker'
                                        onChange={(selectedValue) => {
                                            setSelectValue(selectValue)
                                            setFormValues({...formValues, profficiency: selectedValue.label})
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
                                You are successfully added a new skill.
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

export default SkillsAdd