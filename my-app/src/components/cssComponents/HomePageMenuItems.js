import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import Person3RoundedIcon from "@mui/icons-material/Person3Rounded";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";

const HomePageMenuItems = () => {
  return (
    <div>
      <ListItemButton>
        <ListItemIcon>
          <CameraAltRoundedIcon />
        </ListItemIcon>
        <Link style={{ textDecoration: "none" }} to="/image">
          {" "}
          <p>Upload Image</p>
        </Link>
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <Person3RoundedIcon />
        </ListItemIcon>
        <Link style={{ textDecoration: "none" }} to="/user">
          {" "}
          <p>Profile</p>
        </Link>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <MessageRoundedIcon />
        </ListItemIcon>
        <Link style={{ textDecoration: "none" }} to="/user">
          {" "}
          <p>Notifications</p>
        </Link>
      </ListItemButton>
    </div>
  );
};
export default HomePageMenuItems;
