import React from 'react'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import { Button } from 'reactstrap'
import { NavLink as Link } from 'react-router-dom'

const LanguageList = () => {
  return (
    <div className='admin-panel'>
        <Sidebar/>
        <div className="right-block">
            <Topbar/>
            <div className="section-panel">
                <div className="section-header">
                <h4 className='section-title'>Language</h4>
                    <Button tag={Link} to="/add-language" color='primary' className='ms-auto'>Add New Language</Button>
                </div>
                <div className="section-body"></div>
            </div>
        </div>
    </div>
  )
}

export default LanguageList