import { useEffect, useState } from 'react'
import { Table, Button, Spinner } from 'reactstrap'
import { NavLink as Link, NavLink } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../../config/firebase-config'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const CertificationList = () => {

    const [certification, setCertification] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        getCertification()
    }, [])
    
    function getCertification() {
        const certificationCollectionRef = collection(db, 'certification')

        getDocs(query(certificationCollectionRef, orderBy('createdAt', 'desc')))
        .then(response => {
            const getCer = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            }))
            setCertification(getCer)
            console.log(getCer);
            setIsLoading(true)
        })
        .catch(error => console.log(error.message))
    }
    function deleteCertification(id) {
        const certificationDeleteRef = doc(db, 'certification', id)
        deleteDoc(certificationDeleteRef)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.message)
        })
        getCertification()
    }

  return (
    <div>
        <div className="section-header">
                <h4 className='section-title'>Certification</h4>
                <Button tag={Link} to="../add-certification" color='primary' className='ms-auto'>Add New Certification</Button>
            </div>
            <div className="section-body section-table">
                <div className='table-responsive'>
                    <Table className='align-middle'>
                        <thead>
                            <tr>
                                <th>Institute</th>
                                <th>Course</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Country</th>
                                <th className='actions'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isLoading ? 
                            <tr>
                                <td align='center' colSpan={100}>
                                    <Spinner color='primary'/>
                                </td>
                            </tr> :
                            (certification.length === 0 ? 
                                <tr>
                                    <td align='center' colSpan={100}>There is nothing added yet !!</td>
                                </tr>:
                                certification.map((cer, id) => (
                                    <tr key={cer.id}> 
                                        <td>
                                            <div>{cer.data.institute}</div>
                                        </td>
                                        <td>{cer.data.course}</td>
                                        <td>{cer.data.city}</td>
                                        <td>{cer.data.state}</td>
                                        <td>{cer.data.country}</td>
                                        <td className='actions'>
                                            <NavLink to={`../edit-certification/${id}`} state={{ state : cer.data, id : cer.id }}>
                                                <FiEdit2 size={18} className='action-btn edit' style={{cursor: 'pointer'}}/>
                                            </NavLink>
                                            <FiTrash2 onClick={()=>deleteCertification(cer.id)} size={18} className='action-btn delete' style={{cursor: 'pointer'}}/>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
    </div>
  )
}

export default CertificationList