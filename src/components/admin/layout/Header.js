import { FiMenu } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { 
    Nav, 
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, 
} from 'reactstrap'

function mobMenuClick() {
    document.body.classList.add('mob-menu-open')
}

const Header = () => {
  return (
    <div className="header">
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
                    <DropdownItem>Logout</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Nav>
    </div>
  )
}

export default Header