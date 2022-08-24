import { useState, useMemo } from 'react'
import { Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap'
import Datepicker from "react-datepicker"
import countryList from '../../../api/countryList'
import Select from 'react-select'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'

const ExperienceAdd = () => {
  const [relieveDate, setRelieveDate] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const options = useMemo(()=>countryList().getData(), []);
  
  const changeHandler = selectValue => {
    setSelectValue(selectValue)
  }

  const [joiningDate, setJoiningDate] = useState('')
  const [relievingDate, setRelievingDate] = useState('')



  const initialValues = {
    organization: "",
    designation: "",
    dateOfRelieve: "",
    city: "",
    state: "",
    country: ""
  }

  const [formValues, setFormValues] = useState(initialValues)

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
              <Form onSubmit={handleSubmit}>
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
                            selected={joiningDate}
                            placeholderText='Select date' 
                            className='form-control'
                            dateFormat="yyyy"
                            showYearPicker
                            onChange={(date)=> {
                              setJoiningDate(date)
                              setFormValues({...formValues, joinDate: date.getFullYear()})
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="2">
                        <FormGroup>
                          <Label>
                            Date of Relieve
                          </Label>
                          <Datepicker
                            selected={relievingDate} 
                            placeholderText='Select date' 
                            className='form-control'
                            onChange={(date)=> {
                              setRelievingDate(date)
                              setFormValues({...formValues, relieveDate: date})
                            }} 
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
                            menuPlacement="auto"
                            placeholder="Select country"
                            className='selectpicker'
                            onChange={changeHandler}
                          />
                        </FormGroup>
                      </Col>
                  </Row>
                  <Button type='submit' color='primary'>Add Experience</Button>
              </Form>
            </div>
        </div>
    </div>
  )
}

export default ExperienceAdd