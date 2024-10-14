import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Notifications from '@mui/icons-material/Notifications'; // Sử dụng biểu tượng Notifications
import { LogoutOutlined, Settings } from '@mui/icons-material';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const userMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} startIcon={<Settings />}>
        Settings
      </MenuItem>
      <MenuItem onClick={handleMenuClose} startIcon={<LogoutOutlined />}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static" style={{ background: '#4f98c3', color: '#000', zIndex: 100 }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo hoặc tên hệ thống */}
        <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '18px' }}>
          Admin Dashboard
        </Typography>

        {/* Menu phía bên phải */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Thông báo */}
          <IconButton>
            <Notifications style={{ fontSize: '20px', color: '#000' }} />
          </IconButton>

          {/* Avatar người dùng với Dropdown */}
          <IconButton onClick={handleMenuOpen}>
            <Avatar />
            <span style={{ marginLeft: '10px' }}>Admin</span>
          </IconButton>
          {userMenu}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
