import {useState} from 'react'
import Select from 'react-select'
import { Form, Row, Col, FormGroup, Label, Input, Button, Spinner } from 'reactstrap'
import { db } from '../../../config/firebase-config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const SkillsAdd = () => {
    const initialValues = {
        skill: "",
        profficiency: ""
    }
    const options = [
        {value: "100", label: "100"},
        {value: "90", label: "90"},
        {value: "80", label: "80"},
        {value: "70", label: "70"},
        {value: "60", label: "60"},
        {value: "50", label: "50"},
        {value: "40", label: "40"},
        {value: "30", label: "30"},
        {value: "20", label: "20"},
        {value: "10", label: "10"},
    ]
    const [formValues, setFormValues] = useState(initialValues);
    const [selectValue, setSelectValue] = useState('')
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
          const skillCollectionRef = collection(db, 'skill');
          await addDoc(skillCollectionRef, { 
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
                        <Button onClick={handleCancel} color='secondary' outline className='me-3'>Cancel</Button>
                        <Button type='submit' color='primary' className='d-flex align-items-center'>Add Skill 
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

export default SkillsAdd