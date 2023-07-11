import { Nav, NavItem, NavLink } from 'reactstrap'
import { NavLink as Link } from 'react-router-dom';
import { FiHome, FiBriefcase, FiAward, FiStar, FiUser, FiFlag, FiHeart, FiBook } from 'react-icons/fi' 


const Sidebar = () => {
    return (
        <div className="left-block">
            <div className="sidebar">
                <div className="logo-block">
                    <h3 className='logo'>My Admin</h3>
                </div>
                <Nav vertical>
                    <NavItem>
                        <NavLink tag={Link} to='dashboard' activeClassName="active"><FiHome className='db-icon'/>Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='experience' activeClassName="active"><FiBriefcase className='db-icon'/>Experience</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='education' activeClassName="active"><FiAward className='db-icon'/>Education</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='skills' activeClassName="active"><FiStar className='db-icon'/>Skills</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='profile' activeClassName="active"><FiUser className='db-icon'/>Personal Info</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='language' activeClassName="active"><FiFlag className='db-icon'/>Language</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='interest' activeClassName="active"><FiHeart className='db-icon'/>Interests</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='knowledge' activeClassName="active"><FiBook className='db-icon'/>Knowledge</NavLink>
                    </NavItem>
                </Nav>
            </div>
        </div>
    )
}

export default Sidebar