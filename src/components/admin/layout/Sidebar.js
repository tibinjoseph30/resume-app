import { Nav, NavItem, NavLink } from 'reactstrap'
import { NavLink as Link } from 'react-router-dom';
import { FiHome, FiBriefcase, FiAward, FiStar, FiFlag, FiHeart, FiBook, FiFolder } from 'react-icons/fi' 


const Sidebar = () => {
    return (
        <div className="left-block">
            <div className="sidebar">
                <div className="logo-block">
                    <h3 className='logo'>My Admin</h3>
                </div>
                <Nav vertical>
                    <NavItem>
                        <NavLink tag={Link} to='dashboard' activeclassname="active"><FiHome className='db-icon'/>Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='experience' activeclassname="active"><FiBriefcase className='db-icon'/>Experience</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='education' activeclassname="active"><FiAward className='db-icon'/>Education</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='project' activeclassname="active"><FiFolder className='db-icon'/>Project</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='skills' activeclassname="active"><FiStar className='db-icon'/>Skills</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='language' activeclassname="active"><FiFlag className='db-icon'/>Language</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='interest' activeclassname="active"><FiHeart className='db-icon'/>Interests</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='knowledge' activeclassname="active"><FiBook className='db-icon'/>Knowledge</NavLink>
                    </NavItem>
                </Nav>
            </div>
        </div>
    )
}

export default Sidebar