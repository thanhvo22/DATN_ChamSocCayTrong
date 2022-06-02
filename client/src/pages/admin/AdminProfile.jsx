import React from 'react'
import Profile from '../../components/profile/Profile'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'

export default function AdminProfile() {
  return (
    <div>
      <Topbar/>
      <div className="container">
        <Sidebar />
        <Profile />
      </div>
    </div>
  )
}
