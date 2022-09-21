import { useState, useMemo } from 'react'
import { Col, Form, Row, FormGroup, Label, Input, Button, Alert } from 'reactstrap'
import Datepicker from "react-datepicker"
import countryList from '../../../api/countryList'
import Select from 'react-select'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import { db } from '../../../config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'

const ExperienceAdd = () => {
  const initialValues = {
    organization: "",
    designation: "",
    city: "",
    state: "",
    country: ""
  }
  const [formValues, setFormValues] = useState(initialValues);
  const [joiningDate, setJoiningDate] = useState('')
  const [relievingDate, setRelievingDate] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [status, setStatus] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
 
  const options = useMemo(()=>countryList().getData(), []);

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
    const experienceCollectionRef = collection(db, 'experience');
    addDoc(experienceCollectionRef, formValues)
    .then(response => {
      console.log(response)
      setStatus({ type: 'success' });
    })
    .catch(error => {
      console.log(error.message)
      setStatus({ type: 'error' });
    })
    setFormValues(initialValues)
    setAlertVisible(true)
    setTimeout(() => { 
        setAlertVisible(false)
    }, 5000);
  }
  

  return (
    <div className='admin-panel'>
        <Sidebar/>
        <div className="right-block">
            <Topbar/>
            <div className="section-panel">
              <div className="section-header">
                <h4 className='section-title'>Add Experience</h4>
              </div>
              <div className="section-body">
                <Form onSubmit={handleSubmit}>
                  <Row>
                      <Col xl="4" sm="6">
                        <FormGroup>
                          <Label>
                            Organization
                          </Label>
                          <Input
                            type="text"
                            name="organization"
                            value={formValues.organization}
                            placeholder="Enter the name of organization"
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col xl="4" sm="6">
                        <FormGroup>
                          <Label>
                            Designation
                          </Label>
                          <Input
                            type="text"
                            name="designation"
                            value={formValues.designation}
                            placeholder="Enter your designation"
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col xl="2" lg="3" sm="6">
                        <FormGroup>
                          <Label>
                            Year of Join
                          </Label>
                          <Datepicker 
                            selected={Date.parse(joiningDate)}
                            placeholderText='Select year' 
                            className='form-control'
                            showYearPicker
                            dateFormat="yyyy"
                            onChange={(date)=> {
                              setJoiningDate(date)
                              setFormValues({...formValues, joinYear: date.getFullYear()})
                            }}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col xl="2" lg="3" sm="6">
                        <FormGroup>
                          <Label>
                            Year of Relieve
                          </Label>
                          <Datepicker
                            selected={Date.parse(relievingDate)} 
                            placeholderText='Select year' 
                            className='form-control'
                            showYearPicker
                            dateFormat="yyyy"
                            onChange={(date)=> {
                              setRelievingDate(date)
                              setFormValues({...formValues, relieveYear: date.getFullYear()})
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
                  {status?.type === 'success' && (
                    <Alert color='success' isOpen={alertVisible}>
                      You are successfully added a new experience.
                    </Alert>
                  )}
                  {status?.type === 'error' && (
                    <Alert color='danger'>
                      Something goes wrong.
                    </Alert>
                  )}
                  <div className='form-action'>
                    <Button type='submit' color='primary' className=''>Add Experience</Button>
                  </div>
                </Form>
              </div>
          </div>
        </div>
    </div>
  )
}

export default ExperienceAdd