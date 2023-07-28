import { useState, useMemo, useEffect } from 'react'
import { Col, Form, Row, FormGroup, Label, Input, Button, Alert, Spinner } from 'reactstrap'
import Datepicker from "react-datepicker"
import countryList from '../../../api/CountrySelect'
import Select from 'react-select'
import { db, storage } from '../../../config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

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
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null)
  const [per, setPerc] = useState(null)
 
  const options = useMemo(()=>countryList().getData(), []);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
      const storageRef = ref(storage, `experience/${+ file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
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
            setFormValues((prev) => ({ ...prev, logo: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

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
      console.log(response);
      navigate(-1);
    })
    .catch(error => {
      console.log(error.message)
    })
    setFormValues(initialValues);
    setIsLoading(true);
  }
  

  return (
    <div>
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
                <Col xl="4" sm="6">
                <FormGroup>
                  <Label>
                    Logo
                  </Label>
                  <div className="file-uploader">
                    <Input
                      type="file"
                      id='file'
                      accept='image/jpeg, image/png'
                      onChange={(e)=> setFile(e.target.files[0])}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <div className='form-action'>
              <Button type='submit' color='primary' className='d-flex align-items-center'>Add Experience 
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

export default ExperienceAdd