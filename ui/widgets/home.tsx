import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// import React from "react"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import { Habits } from "./habits"
import { TasksUI } from "./tasks"
import { AppBar, BottomNavigation, BottomNavigationAction, Box } from "@mui/material"
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from "react"

export function Main() {
  const [value, wValue] = useState(0)

  return (
    // <Box>
    //   <MenuAppBar></MenuAppBar>
      
    //   {/* <BottomNavigation
    //     showLabels
    //     value={value}
    //     color="blue"
    //     onChange={(_, newValue) => {
    //       wValue(newValue);
    //     }}
    //   >
    //     <BottomNavigationAction 
    //       label="Recents"

    //       // icon={<RestoreIcon />} 
    //     />
    //     <BottomNavigationAction 
    //       label="Favorites" 
    //       // icon={<FavoriteIcon />} 
    //     />
    //     <BottomNavigationAction 
    //       label="Nearby" 
    //       // icon={<LocationOnIcon />} 
    //     />
    //   </BottomNavigation> */}
    // </Box>

    // div.wrapper
    // <AppBar>

    // </AppBar>
    <Tabs
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="tasks" title="Tasks">
        <TasksUI />
      </Tab>

      <Tab eventKey="habits" title="Habits">
        <Habits />
      </Tab>
    </Tabs>
  )
}




function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}