import React from 'react'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'

const Dashboard = () => {
  return (
    <div className='admin-panel'>
        <Sidebar/>
        <div className="right-block">
            <Topbar/>
            <div className="section-panel">

            </div>
        </div>
    </div>
  )
}

export default Dashboard