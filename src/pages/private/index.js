import React from 'react';
import clsx from 'clsx';
import {
  Drawer,
  AppBar,
  Typography,
  Divider,
  IconButton,
  List,
  Container,
  Toolbar,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import useStyles from './styles';
import {useFirebase} from '../../Components/FirebaseProvider';
import User from './User';
// import Post from './PostsComp';
import PostDetailComponent from './PostDetailComp';

export default function Private() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const {auth} = useFirebase();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogOut = (e) => {
    if (window.confirm('Are you sure to Logout?')) auth.signOut();
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <Switch>
              <Route path="/users" children="Users" />
              {/* <Route path="/posts" children="Posts" /> */}
              <Route children="Home" />
            </Switch>
          </Typography>
          <IconButton color="inherit" onClick={(e) => handleLogOut(e)}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Route
            path="/"
            exact
            children={({match, history}) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push('/');
                  }}
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="home" />
                </ListItem>
              );
            }}
          />

          <Route
            path="/users"
            exact
            children={({match, history}) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push('/users');
                  }}
                >
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="users" />
                </ListItem>
              );
            }}
          />
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route path="/users" component={User} />
            <Route component={Home} />
          </Switch>
        </Container>
      </main>
    </div>
  );
}
