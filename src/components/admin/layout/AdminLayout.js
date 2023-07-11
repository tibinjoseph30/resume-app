import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='admin-panel'>
        <Sidebar/>
        <div className="right-block">
            <Header/>
            <div className="section-panel">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default AdminLayout