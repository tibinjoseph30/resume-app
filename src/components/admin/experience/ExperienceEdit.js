import { useState, useMemo, useEffect } from 'react'
import { Col, Form, Row, FormGroup, Label, Input, Button, Spinner } from 'reactstrap'
import Datepicker from "react-datepicker"
import countryList from '../../../api/CountrySelect'
import Select from 'react-select'
import { db, storage } from '../../../config/firebase-config'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useLocation, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { FiCamera } from 'react-icons/fi'

const ExperienceEdit = () => {

  const [selectValue, setSelectValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const [newFormValues, setNewFormValues] = useState(location.state.state);
  const [newJoiningDate, setNewJoiningDate] = useState(newFormValues.joinDate)
  const [newRelievingDate, setNewRelievingDate] = useState(newFormValues.relieveDate)
  const [file, setFile] = useState(null)
  const [isChecked, setIsChecked] = useState(newFormValues.working)

  console.log(newFormValues)
  const newId = location.state.id

  useEffect(() => {
        
  }, [file]);
 
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
      const experienceCollectionRef = doc(db, 'experience', newId);
  
      // Retrieve the existing experience data from Firestore
      const existingExperience = (await getDoc(experienceCollectionRef)).data();
  
      // Update the array field in the fetched document
      const updatedFormValues = { ...newFormValues };
      delete updatedFormValues.logo;
  
      // Update the document with the new data (excluding the logo field)
      await setDoc(experienceCollectionRef, updatedFormValues);
  
      // Check if a new file was selected before proceeding with file upload
      if (file) {
        const name = new Date().getTime() + file.name;
        console.log(name);
        const storageRef = ref(storage, `experience/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            //   setPerc(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // Update the 'logo' field in the Firestore document
              setDoc(experienceCollectionRef, { ...newFormValues, logo: downloadURL, createdAt: existingExperience.createdAt });
  
              // Update the state with the updated 'logo' field and original 'createdAt' value
              setNewFormValues((prev) => ({ ...prev, logo: downloadURL, createdAt: existingExperience.createdAt }));
  
              setIsLoading(false);
              navigate(-1);
            });
          }
        );
      } else {
        // If no new file was selected, preserve the existing logo URL in the document
        updatedFormValues.logo = newFormValues.logo;
  
        // Update the document with the updated data, including the logo field
        await setDoc(experienceCollectionRef, { ...updatedFormValues, createdAt: existingExperience.createdAt });
  
        // Update the state with the updated data, including the logo field and original 'createdAt' value
        setNewFormValues((prev) => ({ ...prev, createdAt: existingExperience.createdAt }));
  
        setIsLoading(false);
        navigate(-1);
      }
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      navigate(-1);
    }
  };
  
  const handleCancel = () => {
    navigate(-1)
  } 
  

  return (
    <div>
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
                <Col xl="4" sm="6" style={newFormValues.relieveDate ? {'display':'none'} : {'display': 'block'}}>
                  <FormGroup>
                    <Label>
                      Currently Working Here
                    </Label>
                    <div className="d-flex">
                      <div className="form-checkbox">
                        <Input 
                          type='checkbox' 
                          id='currentlyWork'
                          checked={isChecked}
                          onChange={() => {
                              setIsChecked(!isChecked)
                              setNewFormValues({...newFormValues, working: isChecked})
                          }}
                        />
                        <Label htmlFor='currentlyWork'></Label>
                      </div>
                    </div>
                  </FormGroup>
                </Col>
                <Col xl="4" sm="6" style={isChecked ? {'display': 'none'}: {'display': 'block'}}>
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
                      required={isChecked}
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
                <Col xl="4" sm="6">
                  <FormGroup>
                    <Label>
                        Logo
                    </Label>
                    <div class="file-preview-box">
                    <img src={file ? URL.createObjectURL(file) : newFormValues.logo || 'https://firebasestorage.googleapis.com/v0/b/resume-app-c31bf.appspot.com/o/images%2Fno-image.svg?alt=media&token=2dd03c2f-43a4-4456-b3c8-8972b6370074'} alt="user" />
                        <div className="upload">
                            <FiCamera/>
                            <Input
                                type="file"
                                name="logo"
                                accept='image/jpeg, image/png'
                                onChange={(e)=> setFile(e.target.files[0])}
                            />
                        </div>
                    </div>
                  </FormGroup>
                </Col>
            </Row>
            <div className='form-action'>
            <Button onClick={handleCancel} color='secondary' outline className='me-3'>Cancel</Button>
              <Button type='submit' color='primary' className='d-flex align-items-center'>Update Experience 
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

export default ExperienceEdit