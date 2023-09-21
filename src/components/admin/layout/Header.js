import React, { useContext } from 'react'
import { FiMenu } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { 
    Nav, 
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, 
} from 'reactstrap'
import { AuthContext } from '../../../context/AuthContext'
import { auth } from '../../../config/firebase-config'
import { signOut } from 'firebase/auth'

const Header = ({isMenuOpen, mobMenuClick}) => {

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogout = () => {
        signOut(auth)
        .then(()=> {
            dispatch({type: 'LOGOUT'})
            navigate('/login')
        })
        .catch((error)=> {
            console.error(error);
        })
    }

  return (
    <div>
        <header className="header">
            <FiMenu size={21} className='mob-menu' onClick={mobMenuClick}/>
            <Nav className="profile-block">
                <UncontrolledDropdown>
                    <DropdownToggle nav>
                        <div className='d-flex align-items-center'>
                            <div className="avatar">
                                <img src="https://firebasestorage.googleapis.com/v0/b/resume-app-c31bf.appspot.com/o/images%2Fuser.svg?alt=media&token=713af566-6e07-411a-8872-16fbfabc8fca" alt="admin profile" />
                            </div>
                            <div className='name-block'>
                                <h6>John Doe</h6>
                                <p className='mb-0'>Business Analyst</p>
                            </div>
                        </div>
                    </DropdownToggle>
                    <DropdownMenu dark>
                        <DropdownItem tag={Link} to="profile">My Profile</DropdownItem>
                        <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </header>
        <div className={`overlay ${isMenuOpen ? 'open' : ''}`} onClick={mobMenuClick}></div>
    </div>
  )
}

export default Header