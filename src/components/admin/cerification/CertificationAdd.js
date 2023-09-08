import {useState, useMemo} from 'react'
import { Col, Form, FormGroup, Label, Row, Input, Button, Spinner } from 'reactstrap'
import Datepicker from "react-datepicker"
import countryList from '../../../api/CountrySelect'
import Select from 'react-select'
import { db } from '../../../config/firebase-config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const CertificationAdd = () => {

    const initialValues = {
        institute: "",
        course: "",
        courseType: "",
        city: "",
        state: "",
        country: ""
    }
    const courseTypeOptions = [
      { value: 'regular', label: 'Regular' },
      { value: 'distance', label: 'Distance' },
      { value: 'online', label: 'Online' }
    ]
    const [formValues, setFormValues] = useState(initialValues);
    const [joiningDate, setJoiningDate] = useState('')
    const [relievingDate, setRelievingDate] = useState('')
    const [selectValue, setSelectValue] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const options = useMemo(()=>countryList().getData(), []);
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
          const certificationCollectionRef = collection(db, 'certification');
          await addDoc(certificationCollectionRef, { 
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
          <h4 className='section-title'>Add Certification</h4>
        </div>
        <div className="section-body">
          <Form onSubmit={handleSubmit}>
            <Row>
                <Col xl="4" sm="6">
                    <FormGroup>
                        <Label>
                            Institute/Board
                        </Label>
                        <Input
                            type="text"
                            name="institute"
                            value={formValues.institute}
                            placeholder="Enter the name of institute"
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col xl="4" sm="6">
                    <FormGroup>
                        <Label>
                            Course
                        </Label>
                        <Input
                            type="text"
                            name="course"
                            value={formValues.course}
                            placeholder="Enter the name of Course"
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col xl="4" sm="6">
                  <FormGroup>
                    <Label>
                      Course Type
                    </Label>
                    <Select 
                      options={courseTypeOptions} 
                      menuPlacement="auto"
                      placeholder="Select course type"
                      className='selectpicker'
                      onChange={(selectedValue) => {
                        setSelectValue(selectValue)
                        setFormValues({...formValues, courseType: selectedValue.label})
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col xl="4" sm="6">
                <FormGroup>
                  <Label>
                    Date of Join
                  </Label>
                  <Datepicker 
                    selected={Date.parse(joiningDate)}
                    placeholderText='Select date' 
                    className='form-control'
                    dateFormat="dd-MM-yyyy"
                    onChange={(date)=> {
                      setJoiningDate(date)
                      setFormValues({...formValues, joinDate: date.toLocaleDateString()})
                    }}
                    required
                  />
                </FormGroup>
              </Col>
              <Col xl="4" sm="6">
                <FormGroup>
                  <Label>
                    Date of Relieve
                  </Label>
                  <Datepicker
                    selected={Date.parse(relievingDate)} 
                    placeholderText='Select date' 
                    className='form-control'
                    dateFormat="dd-MM-yyyy"
                    onChange={(date)=> {
                      setRelievingDate(date)
                      setFormValues({...formValues, relieveDate: date.toLocaleDateString()})
                    }} 
                    required
                  />
                </FormGroup>
              </Col>
              <Col xl="4" sm="6">
                <FormGroup>
                  <Label>
                    City
                  </Label>
                  <Input
                    type="text"
                    name="city"
                    value={formValues.city}
                    placeholder="Enter your city"
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col xl="4" sm="6">
                <FormGroup>
                  <Label>
                    State
                  </Label>
                  <Input
                    type="text"
                    name="state"
                    value={formValues.state}
                    placeholder="Enter your state"
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col xl="4" sm="6">
                <FormGroup>
                  <Label>
                    Country
                  </Label>
                  <Select 
                    options={options} 
                    menuPlacement="auto"
                    placeholder="Select country"
                    className='selectpicker'
                    onChange={(selectedValue) => {
                      setSelectValue(selectValue)
                      setFormValues({...formValues, country: selectedValue.label})
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className='form-action'>
            <Button onClick={handleCancel} color='secondary' outline className='me-3'>Cancel</Button>
              <Button type='submit' color='primary' className='d-flex align-items-center'>Add Certification 
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

export default CertificationAdd