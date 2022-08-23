import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'

const Topbar = () => {
  return (
    <div className="header">
        <div className='welcome-block'>
            <h4 className='text-light'>Hey, John Doe</h4>
            <p className='mb-0'>Welcome Back</p>
        </div>
        <Nav className='profile-block'>
            <NavItem>
                <NavLink href=''>
                    <div className="avatar">
                        <img src="../../../../images/user.jpg" alt="admin profile" />
                    </div>
                    <div className='name-block'>
                        <h6>John Doe</h6>
                        <p className='mb-0'>Business Analyst</p>
                    </div>
                </NavLink>
            </NavItem>
        </Nav>
    </div>
  )
}

export default Topbar