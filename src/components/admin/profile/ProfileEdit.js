import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import Datepicker from "react-datepicker"
import Select from 'react-select'
import countryList from '../../../api/CountrySelect'
import { useLocation, useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { db, storage } from '../../../config/firebase-config'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { FiCamera } from 'react-icons/fi'

const ProfileEdit = () => {

    const location = useLocation();
    const newId = location.state.id;
    const navigate = useNavigate();

    const [newFormValues, setNewFormValues] = useState(location.state.state);
    const [newDob, setNewDob] = useState(newFormValues.dob)
    const [selectValue, setSelectValue] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null)
    const [percentage, setPercentage] = useState(null)

    console.log(newFormValues)
    console.log(newFormValues.dob)

    useEffect(()=> {
        setImage(image)
    }, [image])

    console.log(newFormValues)

    const options = useMemo(()=>countryList().getData(), [])
    const careerOptions = [
        { value: 'working', label: 'Currently Working' },
        { value: 'job-seeking', label: 'Seeking Job' }
      ]
    const freelanceOptions = [
        { value: 'available', label: 'Available' },
        { value: 'not-availbale', label: 'Not Available' }
      ]

    const handleChange = (event) => {
        setNewFormValues({
            ...newFormValues,
            [event.target.name]: event.target.value
        })
        console.log(newFormValues)
    }

    const handleSubmit = (event)=> {
        event.preventDefault();
        const profileCollectionRef = doc(db, 'profile', newId)
        setDoc(profileCollectionRef, newFormValues)
        .then(response=> {
            console.log(response);
            navigate('../profile');
        })
        .catch(error=> {
            console.log(error.message);
        })
        console.log(newFormValues);
        setIsLoading(true);

        const name = new Date().getTime() + image.name
        console.log(name)
        const imageRef = ref(storage, `profile/${+ image.name}`)
        const uploadFile = uploadBytesResumable(imageRef, image)

        uploadFile.on(
            (error)=> {
                console.log(error)
            }
        )
        
    }

  return (
    <div>
        <div className="section-header">
            <h4 className='section-title'>Edit Profile</h4>
        </div>
        <div className="section-body">
            <Form onSubmit={handleSubmit}>
                <div class="profile-pic mb-5">
                    <img src={image ? URL.createObjectURL(image) : newFormValues.avatar} alt="user" />
                    <div className="upload">
                        <FiCamera/>
                        <Input 
                            type='file'
                            id='file'
                            accept='image/jpeg, image/png'
                            onChange={(e)=> setImage(e.target.files[0])}
                        /> 
                    </div>
                </div>
                <Row className='mt-5'>
                    <Col lg="4" sm="6">
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
                    <Col lg="4" sm="6">
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
                    <Col lg="4" sm="6">
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
                    <Col lg="4" sm="6">
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
                    <Col lg="4" sm="6">
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
                    <Col lg="4" sm="6">
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
                    <Col lg="4" sm="6">
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
                    <Col lg="4" sm="6">
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={newFormValues.email}
                                placeholder="Enter email"
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="4" sm="6">
                        <FormGroup>
                            <Label>Date of Birth</Label>
                            <Datepicker
                                selected={new Date(newDob)}
                                placeholderText='Select date' 
                                className='form-control'
                                dateFormat="dd-MM-yyyy"
                                onChange={(date)=> {
                                    setNewDob(date)
                                    setNewFormValues({...newFormValues, dob: date.toLocaleDateString()})
                                }} 
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="4" sm="6">
                        <FormGroup>
                            <Label>Career Status</Label>
                            <Select
                                defaultInputValue={newFormValues.careerStatus}
                                options={careerOptions}
                                menuPlacement="auto"
                                placeholder="Select status"
                                className='selectpicker'
                                onChange={(selectedValue) => {
                                    setSelectValue(selectValue)
                                    setNewFormValues({...newFormValues, careerStatus: selectedValue.label})
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="4" sm="6">
                        <FormGroup>
                            <Label>Freelance</Label>
                            <Select
                                defaultInputValue={newFormValues.freelance}
                                options={freelanceOptions}
                                menuPlacement="auto"
                                placeholder="Select one"
                                className='selectpicker'
                                onChange={(selectedValue) => {
                                    setSelectValue(selectValue)
                                    setNewFormValues({...newFormValues, freelance: selectedValue.label})
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <div className='form-action'>
                    <Button type='submit' color='primary' className='d-flex align-items-center'>Update Profile 
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

export default ProfileEdit