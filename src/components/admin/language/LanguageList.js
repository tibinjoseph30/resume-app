import {useState, useEffect} from 'react'
import { Button, Row, Col, Card, CardBody, Spinner, Table } from 'reactstrap'
import { NavLink as Link } from 'react-router-dom'
import { FiBookOpen, FiCheck, FiEdit2, FiEye, FiHeadphones, FiMic, FiTrash2 } from 'react-icons/fi'
import { FaPencilAlt, FaRegEye } from 'react-icons/fa'
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
    <div>
        <div className="section-header">
            <h4 className='section-title'>Language</h4>
            <Button tag={Link} to="../add-language" color='primary' className='ms-auto'>Add New Language</Button>
        </div>
        <div className="section-body">
            <Row>
            {!isLoading ? 
            <Col className='text-center'>
                <Spinner color='primary'/>
            </Col> : 
            (language.length === 0 ? 
            <Col className='text-center'>
                There is nothing added yet !!
            </Col> :
            language.map((lan, id)=>(
                <Col xxl="2" xl="3" lg="4" sm="6" className='mb-3' key={lan.id}>
                <Card className='border-dashed'>
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <p className='mb-0'>{lan.data.language}</p>
                            <FiTrash2 onClick={()=>deleteLanguage(lan.id)} className='ms-auto action-btn delete' style={{cursor: 'pointer', fontSize: '16px'}}/>
                        </div>
                        <div className='text-muted small'>{lan.data.level}</div>
                        <Table className='lan-exp-table mt-3'>
                            <thead>
                                <tr>
                                    <th>R</th>
                                    <th>W</th>
                                    <th>L</th>
                                    <th>S</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <FiCheck style={lan.data.read === true ? {display: 'block'} : {display: 'none'}}/>
                                    </td>
                                    <td>
                                        <FiCheck style={lan.data.write === true ? {display: 'block'} : {display: 'none'}}/>
                                    </td>
                                    <td>
                                        <FiCheck style={lan.data.listen === true ? {display: 'block'} : {display: 'none'}}/>
                                    </td>
                                    <td>
                                        <FiCheck style={lan.data.speak === true ? {display: 'block'} : {display: 'none'}}/>
                                    </td>
                                </tr>
                            </tbody>
                        </Table> 
                    </CardBody>
                </Card>
                </Col>
            ))
            )}
            </Row>
        </div>
    </div>
  )
}

export default LanguageList