import { useState, useMemo } from 'react'
import { Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap'
import Datepicker from "react-datepicker"
import countryList from '../../../api/countryList'
import Select from 'react-select'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'

const ExperienceAdd = () => {
  const [joinDate, setJoinDate] = useState('');
  const [relieveDate, setRelieveDate] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const options = useMemo(()=>countryList().getData(), []);
  
  const changeHandler = selectValue => {
    setSelectValue(selectValue)
  }

  const initialValues = {
    organization: "",
    designation: "",
    dateOfJoin: "",
    dateOfRelieve: "",
    city: "",
    state: "",
    country: ""
  }

  const [formValues, setFormValues] = useState(initialValues)

  const handleChange = (e) => {
    console.log(e.target)
  }
  

  return (
    <div className='admin-panel'>
        <div className="left-block">
            <Sidebar/>
        </div>
        <div className="right-block">
            <Topbar/>
            <div className="section-panel">
              <h4 className='section-head'>Add Experience</h4>
              <Form>
                  <Row>
                      <Col lg="4">
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
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
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
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="2">
                        <FormGroup>
                          <Label>
                            Date of Join
                          </Label>
                          <Datepicker 
                            name='dateOfJoin' 
                            value={formValues.dateOfJoin}
                            selected={joinDate} 
                            placeholderText='Select date' 
                            className='form-control'
                            // onChange={(date) => setJoinDate(date)}
                            onChange={handleChange} 
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="2">
                        <FormGroup>
                          <Label>
                            Date of Relieve
                          </Label>
                          <Datepicker 
                            name='dateOfRelieve' 
                            value={formValues.dateOfRelieve} 
                            selected={relieveDate} 
                            placeholderText='Select date' 
                            className='form-control'
                            // onChange={(date) => setRelieveDate(date)} 
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
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
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
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
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <Label>
                            Country
                          </Label>
                          <Select
                            name='country' 
                            options={options} 
                            value={formValues.country} 
                            menuPlacement="auto"
                            placeholder="Select country"
                            className='selectpicker'
                            // onChange={changeHandler}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                  </Row>
              </Form>
              <div className="section-footer">
                  <Button color='primary'>Add Experience</Button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ExperienceAdd