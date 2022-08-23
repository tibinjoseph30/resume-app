import React from 'react';
import {Row, Col} from "reactstrap";

const Profile = () => {
  return (
    <div className='section profile'>
        <h3 className='section-title'>Profile</h3>
        <Row className='align-items-center'>
            <Col lg="3">
                <div className="profile-pic">
                    <img src="../../images/user.jpg" alt="profile" />
                </div>
            </Col>
            <Col lg="9">
                <div className="profile-summary">
                    <p className='mb-0 text-muted'>Senior UI developer with 5+ years experience and specialization in Web app development. Designed applications that increased user satisfaction by 20% and resolved persistent browser compatibility issues for Firefox users whilst rigorously adhering to project deadlines. Looking to leverage my skills to produce seamless and profitable UI for Semtex Systems.</p>
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default Profile