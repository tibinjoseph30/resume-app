import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const mobMenuClick = () => {
      setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className='admin-panel'>
        <Sidebar isMenuOpen={isMenuOpen}/>
        <div className="right-block">
            <Header isMenuOpen={isMenuOpen} mobMenuClick={mobMenuClick}/>
            <div className="section-panel">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default AdminLayout