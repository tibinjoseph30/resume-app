import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { NavLink as Link } from 'react-router-dom';
import { FiHome, FiBriefcase, FiAward, FiStar, FiUser, FiFlag, FiClock } from 'react-icons/fi' 

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="logo-block">
            <h3 className='logo'>My Admin</h3>
        </div>
        <Nav vertical>
            <NavItem>
                <NavLink tag={Link} to='/dashboard' activeclassname="active"><FiHome className='db-icon'/>Dashboard</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to='/experience' activeclassname="active"><FiBriefcase className='db-icon'/>Experience</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href=''><FiAward className='db-icon'/>Education</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href=''><FiStar className='db-icon'/>Skills</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href=''><FiUser className='db-icon'/>Personal Info</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href=''><FiFlag className='db-icon'/>Language</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href=''><FiClock className='db-icon'/>Interests</NavLink>
            </NavItem>
        </Nav>
    </div>
  )
}

export default Sidebar