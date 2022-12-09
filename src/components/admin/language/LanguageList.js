import {useState, useEffect} from 'react'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import { Button, Row, Col, Card, CardBody, Spinner } from 'reactstrap'
import { NavLink as Link } from 'react-router-dom'
import { FiTrash2 } from 'react-icons/fi'
import { MdStar } from 'react-icons/md'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'

const LanguageList = () => {

  const [language, setLanguage] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=> {
      getLanguage()
  }, [])

  function getLanguage() {
      const languageCollectionRef = collection(db, 'language')
      getDocs(languageCollectionRef)
      .then(response => {
          const getLan = response.docs.map(doc => ({
              data: doc.data(),
              id: doc.id
          }))
          setLanguage(getLan)
          console.log(getLan);
          setIsLoading(true)
      })
      .catch(error => console.log(error.message))
  }
  function deleteLanguage(id) {
      const languageDeleteRef = doc(db, 'language', id)
      deleteDoc(languageDeleteRef)
      .then(response => {
          console.log(response)
      })
      .catch(error => {
          console.log(error.message)
      })
      getLanguage()
  }

  return (
    <div className='admin-panel'>
        <Sidebar/>
        <div className="right-block">
            <Topbar/>
            <div className="section-panel">
                <div className="section-header">
                <h4 className='section-title'>Language</h4>
                    <Button tag={Link} to="/add-language" color='primary' className='ms-auto'>Add New Language</Button>
                </div>
                <div className="section-body">
                  <Row>
                    {!isLoading ? 
                    <Col className='text-center'>
                        <Spinner color='primary'/>
                    </Col> : 
                    (language.length === 0 ? 
                    <Col className='text-center'>
                        There is no skills added yet !!
                    </Col> :
                    language.map((lan, id)=>(
                      <Col xxl="2" xl="3" lg="4" sm="6" className='mb-3' key={lan.id}>
                        <Card className='border-dashed'>
                            <CardBody>
                                <div className="d-flex align-items-center">
                                    <p className='mb-0'>{lan.data.language}</p>
                                    <FiTrash2 onClick={()=>deleteLanguage(lan.id)} className='ms-auto action-btn delete' style={{cursor: 'pointer', fontSize: '16px'}}/>
                                </div>
                                <div className={'star-rating mt-2 ' + (lan.data.level==='Native' ? 'star-5' : lan.data.level==='Advanced' ? 'star-4' : lan.data.level==="Intermediate" ? 'star-3' : lan.data.level==="Elementary" ? 'star-2' : lan.data.level==="Beginner" ? 'star-1' : '')}>
                                    <MdStar className='star' fontSize={20}/>
                                    <MdStar className='star' fontSize={20}/>
                                    <MdStar className='star' fontSize={20}/>
                                    <MdStar className='star' fontSize={20}/>
                                    <MdStar className='star' fontSize={20}/>
                                </div>  
                            </CardBody>
                        </Card>
                      </Col>
                    ))
                    )}
                  </Row>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LanguageList