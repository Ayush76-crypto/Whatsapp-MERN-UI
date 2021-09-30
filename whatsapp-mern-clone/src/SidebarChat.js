import { Avatar } from '@material-ui/core'
import React from 'react'
import './SidebarChat.css'

function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat__info">
                <h2>Professor</h2>
                <p>Class starts in 15 minutes!</p>
            </div>
        </div>
    )
}

export default SidebarChat
