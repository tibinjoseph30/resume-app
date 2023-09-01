import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBehance, faDribbble, faFacebookF, faGithub, faInstagram, faLinkedinIn, faPinterestP, faSkype, faSnapchat, faTwitter, faVimeoV, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Button, Card, CardBody, NavLink, Spinner } from 'reactstrap'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import { Link } from 'react-router-dom'

const Header = ({profile, isLoading}) => {

    const [social, setSocial] = useState(null)
    const [onLoading, setOnLoading] = useState(null)
    
    useEffect(()=> {
        getSocial()
    }, [])
    
    function getSocial() {
        const socialCollectionRef = collection(db, 'social')
        getDocs(query(socialCollectionRef, orderBy('createdAt')))
        .then(response => {
            const getHob = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,
            }))
            setSocial(getHob)
            console.log(getHob);
            setOnLoading(true)
        })
        .catch(error => console.log(error.message))
    }

  return (
    <div className='section section-header'>
        <Card>
            <CardBody>
                {!isLoading ?
                    <div className="text-center">
                        <Spinner color='primary'/>
                    </div> :
                    <div>
                        <div>
                            {profile.map((prof, id)=> (
                                <div className='d-flex align-items-center' key={prof.id}>
                                    <div className='avatar me-4'>
                                        <img src={profile ? prof.data.avatar : 'https://firebasestorage.googleapis.com/v0/b/resume-app-c31bf.appspot.com/o/images%2Fuser.svg?alt=media&token=713af566-6e07-411a-8872-16fbfabc8fca'} alt="" />
                                    </div>
                                    <div>
                                        <h3 className='text-capitalize'>{prof.data.firstName} {prof.data.lastName}</h3>
                                        <div className='text-capitalize'>{prof.data.designation}</div>
                                    </div>
                                    <Button tag={Link} to="/resume" color='primary' className='rounded-pill ms-auto'>View Resume</Button>
                                </div>
                            ))}
                        </div> 
                        <div>
                            {social.length === 0 ?
                                '' :
                                <div className='mt-4'>
                                    <ul className='social-menu-list list-unstyled mb-0 d-flex align-items-center'>
                                        {social.map((soc, id)=> (
                                            <li key={soc.id}>
                                                <NavLink href={soc.data.url}>
                                                    <FontAwesomeIcon icon={
                                                        soc.data.code === 'tw' ? faTwitter :
                                                        soc.data.code === 'fb' ? faFacebookF :
                                                        soc.data.code === 'li' ? faLinkedinIn :
                                                        soc.data.code === 'ig' ? faInstagram :
                                                        soc.data.code === 'yt' ? faYoutube :
                                                        soc.data.code === 'pi' ? faPinterestP :
                                                        soc.data.code === 'gi' ? faGithub :
                                                        soc.data.code === 'be' ? faBehance :
                                                        soc.data.code === 'dr' ? faDribbble :
                                                        soc.data.code === 'sk' ? faSkype :
                                                        soc.data.code === 'vi' ? faVimeoV :
                                                        soc.data.code === 'fb' ? faSnapchat :
                                                        ''
                                                    } /> 
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                }
                
            </CardBody>
        </Card>
    </div>
  )
}

export default Header