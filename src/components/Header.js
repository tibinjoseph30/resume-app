import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBehance, faDribbble, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='section section-header'>
        <Card>
            <CardBody>
                <div className='d-flex align-items-center'>
                    <div className='avatar me-4'>
                        <img src="images/user.svg" alt="" />
                    </div>
                    <div>
                        <h3>John Doe</h3>
                        <div>UI Developer</div>
                    </div>
                    <button className='btn btn-primary rounded-pill ms-auto'>See Projects</button>
                </div>
                <div className='mt-4'>
                    <ul className='social-menu-list list-unstyled mb-0 d-flex align-items-center'>
                        <li>
                            <Link to="">
                                <FontAwesomeIcon icon={faTwitter} />
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <FontAwesomeIcon icon={faDribbble} />
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <FontAwesomeIcon icon={faBehance} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </CardBody>
        </Card>
    </div>
  )
}

export default Header