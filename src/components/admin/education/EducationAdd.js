import {useState, useMemo} from 'react'
import { Col, Form, FormGroup, Label, Row, Input, Alert, Button, Spinner } from 'reactstrap'
import Datepicker from "react-datepicker"
import countryList from '../../../api/CountrySelect'
import Select from 'react-select'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import { db } from '../../../config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const EducationAdd = () => {
    const initialValues = {
        university: "",
        course: "",
        city: "",
        state: "",
        country: ""
    }
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
    const handleSubmit= (event) => {
        event.preventDefault();
        console.log(formValues);
        const educationCollectionRef = collection(db, 'education');
        addDoc(educationCollectionRef, formValues)
        .then(response => {
          console.log(response);
          navigate('/education');
        })
        .catch(error => {
          console.log(error.message)
        })
        setFormValues(initialValues);
        setIsLoading(true);
      }

    return (
    <div className='admin-panel'>
        <Sidebar/>
        <div className='right-block'>
            <Topbar/>
            <div className='section-panel'>
              <div className="section-header">
                <h4 className='section-title'>Add Education</h4>
              </div>
              <div className="section-body">
                <Form onSubmit={handleSubmit}>
                  <Row>
                      <Col xl="4" sm="6">
                          <FormGroup>
                              <Label>
                                  University
                              </Label>
                              <Input
                                  type="text"
                                  name="university"
                                  value={formValues.university}
                                  placeholder="Enter the name of university"
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
                  <div className='form-action'>
                      <Button type='submit' color='primary'>Add Education {isLoading ? <Spinner size="sm" /> : ''}</Button>
                  </div>
                </Form>
              </div>
            </div>
        </div>
    </div>
  )
}

export default EducationAdd
