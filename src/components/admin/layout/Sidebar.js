import {useRef, useEffect} from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { NavLink as Link } from 'react-router-dom';
import { FiHome, FiBriefcase, FiAward, FiStar, FiUser, FiFlag, FiClock } from 'react-icons/fi' 

function outsideClick() {
    document.body.classList.remove('mob-menu-open')
}
function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            outsideClick()
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
}
const Sidebar = () => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    return (
        <div className="left-block" ref={wrapperRef}>
            <div className="sidebar">
                <div className="logo-block">
                    <h3 className='logo'>My Admin</h3>
                </div>
                <Nav vertical>
                    <NavItem>
                        <NavLink tag={Link} to='/dashboard' activeclassname="active" onClick={outsideClick}><FiHome className='db-icon'/>Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/experience' activeclassname="active" onClick={outsideClick}><FiBriefcase className='db-icon'/>Experience</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/education' activeclassname="active" onClick={outsideClick}><FiAward className='db-icon'/>Education</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/skills' activeclassname="active" onClick={outsideClick}><FiStar className='db-icon'/>Skills</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href=''><FiUser className='db-icon'/>Personal Info</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/language' activeclassname="active" onClick={outsideClick}><FiFlag className='db-icon'/>Language</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/interest' activeclassname="active" onClick={outsideClick}><FiClock className='db-icon'/>Interests</NavLink>
                    </NavItem>
                </Nav>
            </div>
        </div>
    )
}

export default Sidebar