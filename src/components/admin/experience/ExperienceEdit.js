import { useState, useMemo } from 'react'
import { Col, Form, Row, FormGroup, Label, Input, Button, Alert } from 'reactstrap'
import Datepicker from "react-datepicker"
import countryList from '../../../api/countryList'
import Select from 'react-select'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import { db } from '../../../config/firebase-config'
import { doc, setDoc } from 'firebase/firestore'
import { useLocation } from "react-router-dom";

const ExperienceEdit = () => {

  const [selectValue, setSelectValue] = useState('')
  const [status, setStatus] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);

  const location = useLocation();
  const [newFormValues, setNewFormValues] = useState(location.state.state);
  const [newJoiningDate, setNewJoiningDate] = useState(newFormValues.joinYear)
  const [newRelievingDate, setNewRelievingDate] = useState(newFormValues.relieveYear)
  // console.log(location.state);
  // const state = location.state.state
  // console.log(state)
  console.log(newFormValues)
  const newId = location.state.id
  // console.log(newId)
 
  const options = useMemo(()=>countryList().getData(), []);

  const handleChange = (event) => {
    setNewFormValues({
      ...newFormValues,
      [event.target.name]: event.target.value,
    });
    console.log(event.target)
  };

  const handleSubmit= (event) => {
    event.preventDefault();
    const experienceCollectionRef = doc(db, 'experience', newId)
    setDoc(experienceCollectionRef, newFormValues)
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
        <div className="right-block">
            <Topbar/>
            <div className="section-panel">
              <div className="section-header">
                <h4 className='section-title'>Edit Experience</h4>
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
                              value={newFormValues.organization}
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
                              value={newFormValues.designation}
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
                              selected={Date.parse(newJoiningDate)}
                              placeholderText='Select year' 
                              className='form-control'
                              showYearPicker
                              dateFormat="yyyy"
                              onChange={(date)=> {
                                setNewJoiningDate(date)
                                setNewFormValues({...newFormValues, joinYear: date.getFullYear()})
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
                              selected={Date.parse(newRelievingDate)} 
                              placeholderText='Select year' 
                              className='form-control'
                              showYearPicker
                              dateFormat="yyyy"
                              onChange={(date)=> {
                                setNewRelievingDate(date)
                                setNewFormValues({...newFormValues, relieveYear: date.getFullYear()})
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
                              value={newFormValues.city}
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
                              value={newFormValues.state}
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
                              defaultInputValue={newFormValues.country}
                              options={options} 
                              menuPlacement="auto"
                              placeholder="Select country"
                              className='selectpicker'
                              onChange={(selectedValue) => {
                                setSelectValue(selectValue)
                                setNewFormValues({...newFormValues, country: selectedValue.label})
                              }}
                            />
                          </FormGroup>
                        </Col>
                    </Row>
                    {status?.type === 'success' && (
                      <Alert color='success' isOpen={alertVisible}>
                        You are successfully updated the experience.
                      </Alert>
                    )}
                    {status?.type === 'error' && (
                      <Alert color='danger'>
                        Something goes wrong.
                      </Alert>
                    )}
                    <div className='form-action'>
                      <Button type='submit' color='primary' className=''>Update Experience</Button>
                    </div>
                </Form>
              </div>
              
            </div>
        </div>
    </div>
  )
}

export default ExperienceEdit