import React from 'react'
import PlayLists from '../../components/playlists/PlayLists'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'

export default function AdminPlayLists() {
  return (
    <div>
        <Topbar />
        <div class="container">
            <Sidebar/>
            <PlayLists/>            
        </div>
    </div>
  )
}
