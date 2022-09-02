import {useState, useEffect} from 'react'
import { FiMenu } from 'react-icons/fi'
import { 
    Nav, 
    NavItem, 
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, 
} from 'reactstrap'

function mobMenuClick() {
    document.body.classList.add('mob-menu-open')
}

const Topbar = () => {
  return (
    <div className="header">
        <FiMenu size={21} className='mob-menu' onClick={mobMenuClick}/>
        <div className='welcome-block'>
            <h4 className='text-light'>Hey, John Doe</h4>
            <p className='mb-0'>Welcome Back</p>
        </div>
        <Nav className="profile-block">
            <UncontrolledDropdown>
                <DropdownToggle nav>
                    <div className='d-flex align-items-center'>
                        <div className="avatar">
                            <img src="../../../../images/user.jpg" alt="admin profile" />
                        </div>
                        <div className='name-block'>
                            <h6>John Doe</h6>
                            <p className='mb-0'>Business Analyst</p>
                        </div>
                    </div>
                </DropdownToggle>
                <DropdownMenu dark>
                    <DropdownItem>My Profile</DropdownItem>
                    <DropdownItem>Logout</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Nav>
    </div>
  )
}

export default Topbar