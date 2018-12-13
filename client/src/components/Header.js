import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Header = () => {
  return(
    <AppBar style={{ backgroundColor: '#2196f3' }} position="static">
      <Toolbar>
          <Typography variant="title" color="textSecondary">
            <Link className='noDecoration' to='/dashboard'>Dashboard</Link>
          </Typography>        
      </Toolbar>
    </AppBar>
  )
};

export default Header;