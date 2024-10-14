import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Biểu tượng cho Products
import PeopleIcon from '@mui/icons-material/People'; // Biểu tượng cho Users
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon sx={{ color: '#fff' }} />, path: '/' },
  { text: 'Products', icon: <ShoppingCartIcon sx={{ color: '#fff' }} />, path: '/products' }, // Biểu tượng cho Products
  { text: 'Users', icon: <PeopleIcon sx={{ color: '#fff' }} />, path: '/users' }, // Biểu tượng cho Users
  { text: 'Settings', icon: <SettingsIcon sx={{ color: '#fff' }} />, path: '/settings' },
  { text: 'Logout', icon: <ExitToAppIcon sx={{ color: '#fff' }} />, path: '/logout' },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      anchor="left"
      open={true}
      variant="permanent"
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: '#343a40',
          width: 300,
          boxSizing: 'border-box',
          color: '#fff',
          zIndex: 1
        },
      }}
    >
      <div style={{ marginTop: '64px' }} />
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} onClick={() => handleMenuItemClick(item.path)} sx={{ cursor: "pointer"}}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: '#fff' }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
