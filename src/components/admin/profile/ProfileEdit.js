import React, { useMemo, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import Select from 'react-select'
import countryList from '../../../api/CountrySelect'
import { useLocation, useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'

const ProfileEdit = () => {

    const location = useLocation();
    const newId = location.state.id;
    const navigate = useNavigate();

    const [newFormValues, setNewFormValues] = useState(location.state.state);
    const [selectValue, setSelectValue] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    console.log(newFormValues)

    const options = useMemo(()=>countryList().getData(), [])

    const handleChange = (event) => {
        setNewFormValues({
            ...newFormValues,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event)=> {
        event.preventDefault();
        const profileCollectionRef = doc(db, 'profile', newId)
        setDoc(profileCollectionRef, newFormValues)
        .then(response=> {
            console.log(response);
            navigate('/profile');
        })
        .catch(error=> {
            console.log(error.message);
        })
        console.log(newFormValues);
        setIsLoading(true);
    }

  return (
    <div className='admin-panel'>
        <Sidebar/>
        <div className="right-block">
            <Topbar/>
            <div className="section-panel">
                <div className="section-header">
                    <h4 className='section-title'>Edit Profile</h4>
                </div>
                <div className="section-body">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xl="4" sm="6">
                                <FormGroup>
                                    <Label>First Name</Label>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        value={newFormValues.firstName}
                                        placeholder="Enter first name"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col xl="4" sm="6">
                                <FormGroup>
                                    <Label>Last Name</Label>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        value={newFormValues.lastName}
                                        placeholder="Enter last name"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col xl="4" sm="6">
                                <FormGroup>
                                    <Label>Designation</Label>
                                    <Input
                                        type="text"
                                        name="designation"
                                        value={newFormValues.designation}
                                        placeholder="Enter designation"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col xl="4" sm="6">
                                <FormGroup>
                                    <Label>City</Label>
                                    <Input
                                        type="text"
                                        name="city"
                                        value={newFormValues.city}
                                        placeholder="Enter city"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col xl="4" sm="6">
                                <FormGroup>
                                    <Label>State</Label>
                                    <Input
                                        type="text"
                                        name="state"
                                        value={newFormValues.state}
                                        placeholder="Enter state"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col xl="4" sm="6">
                                <FormGroup>
                                    <Label>Country</Label>
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
                            <Col xl="4" sm="6">
                                <FormGroup>
                                    <Label>Phone</Label>
                                    <Input
                                        type="text"
                                        name="phone"
                                        value={newFormValues.phone}
                                        placeholder="Enter phone number"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col xl="4" sm="6">
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        name="state"
                                        value={newFormValues.email}
                                        placeholder="Enter email"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <div className='form-action'>
                            <Button type='submit' color='primary' className=''>Update profile {isLoading ? <Spinner size="sm" /> : ''}</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileEdit