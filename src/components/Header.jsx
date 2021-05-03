import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(15),
  },
  offset: theme.mixins.toolbar,
  decor: {
    textDecoration: 'none',
    color: 'white',
  },
  bttn: {
    marginLeft: theme.spacing(1),
  },
  inputRoot: {
    width: '15%',
    marginRight: 2,
  },
  searchIcon: {
    marginRight: 20,
  },
  margin: {
    margin: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          <Typography className={classes.title} variant='h4'>
            <Link className={classes.decor} to='/'>
              Cars
            </Link>
          </Typography>
          <Button  variant="outlined">
            <Link className={classes.decor} to='/newcar'>
              Add New Car
            </Link>
          </Button>

          {/* <TextField
            className={classes.margin}
            variant='outlined'
            placeholder='Search...'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
          /> */}

          
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </Fragment>
  );
};

export default Header;
