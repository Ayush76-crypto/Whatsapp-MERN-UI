import React from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import { DonutLarge, SearchOutlined } from "@material-ui/icons";
/* Using Meterial-UI v4.0.0 - [Promised versiom]
import  MoreVertIcon from '@mui/icons-material/MoreVert';
import  ChatIcon  from '@mui/icons-material/Chat'; */
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://wallpaperaccess.com/full/3036167.jpg" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start a new chat" type="text"/>
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>

    </div>
  );
}

export default Sidebar;
