import { useState, useMemo } from 'react'
import { Col, Form, Row, FormGroup, Label, Input, Button, Spinner } from 'reactstrap'
import Datepicker from "react-datepicker"
import countryList from '../../../api/CountrySelect'
import Select from 'react-select'
import { db } from '../../../config/firebase-config'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useLocation, useNavigate } from "react-router-dom";

const CertificationEdit = () => {

    const [selectValue, setSelectValue] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const [newFormValues, setNewFormValues] = useState(location.state.state);
    const [newJoiningDate, setNewJoiningDate] = useState(newFormValues.joinDate)
    const [newRelievingDate, setNewRelievingDate] = useState(newFormValues.relieveDate)

    console.log(newFormValues)
    const newId = location.state.id
    
    const options = useMemo(()=>countryList().getData(), []);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setNewFormValues({
          ...newFormValues,
          [event.target.name]: event.target.value,
        });
        console.log(event.target)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
      
        try {
          const certificationCollectionRef = doc(db, 'certification', newId);
          
          // Retrieve the existing certification data from Firestore
          const existingCertification = (await getDoc(certificationCollectionRef)).data();
  
          // Update fields in the Firestore document
          setDoc(certificationCollectionRef, { ...newFormValues, createdAt: existingCertification.createdAt });
    
          // Update the state with the updated fields and original 'createdAt' value
          setNewFormValues((prev) => ({ ...prev, createdAt: existingCertification.createdAt }));
      
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
                <h4 className='section-title'>Edit Certification</h4>
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
                                    value={newFormValues.institute}
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
                                    value={newFormValues.course}
                                    placeholder="Enter the name of Course"
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col xl="4" sm="6">
                            <FormGroup>
                            <Label>
                                Date of Join
                            </Label>
                            <Datepicker 
                                selected={Date.parse(newJoiningDate)}
                                placeholderText='Select date' 
                                className='form-control'
                                dateFormat="dd-MM-yyyy"
                                onChange={(date)=> {
                                  setNewJoiningDate(date)
                                  setNewFormValues({...newFormValues, joinDate: date.toLocaleDateString()})
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
                                selected={Date.parse(newRelievingDate)} 
                                placeholderText='Select date' 
                                className='form-control'
                                dateFormat="dd-MM-yyyy"
                                onChange={(date)=> {
                                    setNewRelievingDate(date)
                                    setNewFormValues({...newFormValues, relieveDate: date.toLocaleDateString()})
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
                    <div className='form-action'>
                    <Button onClick={handleCancel} color='secondary' outline className='me-3'>Cancel</Button>
                        <Button type='submit' color='primary' className='d-flex align-items-center'>Update Certification 
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

export default CertificationEdit