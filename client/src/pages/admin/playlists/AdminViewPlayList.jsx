import React from 'react'
import Topbar from '../../../components/topbar/Topbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import ViewPlayList from '../../../components/viewPlayList/ViewPlayList'

export default function AdminViewPlayList() {
  return (
    <div>
        <Topbar />
        <div class="container">
            <Sidebar />
            <ViewPlayList/>
        </div>
      
    </div>
  )
}
