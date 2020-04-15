import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
// import clsx from 'clsx';
import { List, Collapse } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Link, } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { update_user_Resturant, remove_user_Resturant, toggleDrawer } from '../store/action';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {
  Drawer, Hidden,
} from "@material-ui/core";
import firebase from "../config/Firebase";
import AdminNavbar from '../config/adminNavbar'
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import LoopIcon from "@material-ui/icons/Loop";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import DashboardIcon from "@material-ui/icons/Dashboard";


const drawerWidth = 240;
const styles = theme => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    // display: "flex",
    // marginTop: theme.spacing(3),
    // marginLeft: theme.spacing(30),
    // // width: 500
    display: "flex",
    minHeight: "100vh",
    zIndex: 1,
    position: "relative",
    overflow: "hidden",
    backgroundColor: theme.palette.background.default
  },
  papers: {
    padding: theme.spacing(3, 6),
    marginLeft: theme.spacing(15)
  },
  paper: {
    marginTop: theme.spacing(13),
    // marginBottom: theme.spacing(4),
    // marginLeft: theme.spacing(20),
    // marginRight: theme.spacing(20),
    // margin: theme.spacing(10),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      // marginTop: theme.spacing(13),
      // marginBottom: theme.spacing(6),
      // padding: theme.spacing(3)
    }
  },

  /******************************/

  card: {
    minWidth: 275,
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "TEAL"
    // +   backgroundColor: theme.palette.primary.main
    // +   color: theme.palette.primary.contrastText
    // paddingBottom: 30
  },
  /******************************/
  detailCards: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },


  cardtitle: {
    fontWeight: 700
  },

  pos: {
    marginBottom: 12,
    float: "right"
  },
  /******************************/

  pape: {
    flexGrow: 1,
    padding: theme.spacing(3, 2)
  },

  drawer: {
    width: drawerWidth
  },
  // Styles for the `Paper` component rendered by `Drawer`.
  drawerPaper: {
    width: "inherit",
    paddingTop: 64 // equal to AppBar height
  },
  appContent: theme.mixins.gutters({
    backgroundColor: '#f5f5f5',
    flex: "1 1 100%", // https://github.com/philipwalton/flexbugs#flexbug-17
    maxWidth: "100%", // https://github.com/philipwalton/flexbugs#flexbug-17
    paddingTop: 80,
    margin: "0 auto",

    [theme.breakpoints.up("lg")]: {
      maxWidth: theme.breakpoints.values.lg
    }
  }),
  toolbar: theme.mixins.toolbar,
  active: {
    color: 'white',
    backgroundColor: 'rgb(63, 81, 181)',
    '&:hover': {
      background: "rgb(63, 81, 181)",
    }
  }
});

// const routes  = [
//   {
//     path: '/Dashboard/PendingOrders',
//     sidebarName: 'Home',
//     navbarName: 'Home',
//     icon: InboxIcon,
//     component: Pending
//   },
//   {
//     path: '/dashboard/profile',
//     sidebarName: 'Profile',
//     navbarName: 'Profile',
//     icon: InboxIcon,
//     component: Pending
//   }
// ];
class MyRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,

      getPendingArr: [],
      getProcessArr: [],
      getDeliveredArr: []
    };
    this.activeRoute = this.activeRoute.bind(this);
  }

  activeRoute(routeName) {
    // return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
    console.log(routeName)
  }
  componentDidMount() {
    const {
      user
    } = this.props;
    if (user !== undefined) {
      this.getPendingData();
      this.getProcessData();
      this.getDeliveredData();
    }
    else {
      this.props.history.push('/login')
    }


  }

  getPendingData() {
    let messagesRef = firebase.database().ref("Order");
    messagesRef.on("value", snapshot => {
      /* Update React itemName when message is added at Firebase Database */
      let message = snapshot.val();
      let newArr = [];
      for (let word in message) {

        newArr.push({
          // name: message[word].state,
          itemName: message[word].itemName,
          itemQuantity: message[word].itemQuantity,
          pushId: message[word].newPostKey,
          status: message[word].status
        });
      }

      this.setState({ getPendingArr: newArr });
    });
  }
  getProcessData() {
    let messagesRef = firebase.database().ref("OrderRecieve");

    messagesRef.on("value", snapshot => {
      /* Update React itemName when message is added at Firebase Database */
      let message = snapshot.val();
      let newArr = [];
      for (let word in message) {

        newArr.push({
          // name: message[word].state,
          itemName: message[word].itemName,
          itemQuantity: message[word].itemQuantity,
          pushId: message[word].newPostKey,
          status: message[word].status
        });
      }

      this.setState({ getProcessArr: newArr });
    });
  }

  getDeliveredData() {
    let messagesRef = firebase.database().ref("OrderDelivered");

    messagesRef.on("value", snapshot => {
      /* Update React itemName when message is added at Firebase Database */
      let message = snapshot.val();
      let newArr = [];
      for (let word in message) {

        newArr.push({
          // name: message[word].state,
          itemName: message[word].itemName,
          itemQuantity: message[word].itemQuantity,
          pushId: message[word].newPostKey,
          status: message[word].status
        });
      }

      this.setState({ getDeliveredArr: newArr });
    });
  }




  onItemClick = (title) => {
    // console.log(this.props.location.pathname.indexOf(title) > -1 ? true : false)
    // console.log(title)
    // return this.props.location.pathname.indexOf(title) > -1 ? true : false;
    //   setTitle(title);
    //   setDrawer(variant === 'temporary' ? false : drawer);
    //   setDrawer(!drawer);
  };

  onCloseDrawer = () => {
    const { mobileOpen } = this.state
    this.setState({ mobileOpen: this.state.mobileOpen });
    this.props.drawer_toggle(mobileOpen)
  }

  handleOpenSettings = () => {
    this.setState({
      openCollapse: !this.state.openCollapse
    })
  }

  render() {
    const { classes,
      theme, user
    } = this.props;
    // console.log(user.uid)
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AdminNavbar />
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.props.mobileOpen}
              onClose={this.onCloseDrawer}
              className={classes.drawer}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <List>
                <ListItem className={this.props.location.pathname === '/Dashboard' ? classes.active : 'notActive'} button component={Link} to="/Dashboard" onClick={() => this.onCloseDrawer()}>
                  <ListItemIcon className={this.props.location.pathname === '/Dashboard' ? classes.active : 'notActive'}>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button onClick={this.handleOpenSettings}>
                  <ListItemIcon >
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                  {this.state.openCollapse ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.openCollapse} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {/* <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <SendIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Starred" />
                    </ListItem> */}
                    <ListItem className={this.props.location.pathname === `/Admin/Pending/${user.userResturant.user.uid}` ? classes.active : 'notActive'} button component={Link} to={`/Admin/Pending/${user.userResturant.user.uid}`} onClick={() => this.onCloseDrawer()}>
                      <ListItemIcon className={this.props.location.pathname === `/Admin/Pending/${user.userResturant.user.uid}` ? classes.active : 'notActive'}>
                        <AccessTimeOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Pending Orders" />
                    </ListItem>

                    <ListItem className={this.props.location.pathname === `/Admin/InProcess/${user.userResturant.user.uid}` ? classes.active : 'notActive'} button component={Link} to={`/Admin/InProcess/${user.userResturant.user.uid}`} onClick={() => this.onCloseDrawer()}>
                      <ListItemIcon className={this.props.location.pathname === `/Admin/InProcess/${user.userResturant.user.uid}` ? classes.active : 'notActive'}>
                        <LoopIcon />
                      </ListItemIcon>
                      <ListItemText primary="Process Orders" />
                    </ListItem>

                    <ListItem className={this.props.location.pathname === `/Admin/Delivered/${user.userResturant.user.uid}` ? classes.active : 'notActive'} button component={Link} to={`/Admin/Delivered/${user.userResturant.user.uid}`} onClick={() => this.onCloseDrawer()}>
                      <ListItemIcon className={this.props.location.pathname === `/Admin/Delivered/${user.userResturant.user.uid}` ? classes.active : 'notActive'}>
                        <CheckCircleOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Delivered Orders" />
                    </ListItem>
                  </List>
                </Collapse>
                <ListItem className={this.props.location.pathname === '/Admin/FoodItems' ? classes.active : 'notActive'} button component={Link} to="/Admin/FoodItems" onClick={() => this.onCloseDrawer()}>
                  <ListItemIcon className={this.props.location.pathname === '/Admin/FoodItems' ? classes.active : 'notActive'}>
                    <FastfoodIcon />
                  </ListItemIcon>
                  <ListItemText primary="Food Items" />
                </ListItem>
                <ListItem className={this.props.location.pathname === `/Admin/Profile/${user.userResturant.user.uid}` ? classes.active : 'notActive'} button component={Link} to={`/Admin/Profile/${user.userResturant.user.uid}`} onClick={() => this.onItemClick('Profile')}>
                  <ListItemIcon className={this.props.location.pathname === `/Admin/Profile/${user.userResturant.user.uid}` ? classes.active : 'notActive'}>
                    <AccountBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </ListItem>
              </List>
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              className={classes.drawer}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <List>
                <ListItem className={this.props.location.pathname === '/Dashboard' ? classes.active : 'notActive'} button component={Link} to="/Dashboard" onClick={() => this.onItemClick('Dashboard')}>
                  <ListItemIcon className={this.props.location.pathname === '/Dashboard' ? classes.active : 'notActive'}>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button onClick={this.handleOpenSettings}>
                  <ListItemIcon >
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                  {this.state.openCollapse ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.openCollapse} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {/* <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <SendIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Starred" />
                    </ListItem> */}
                    <ListItem className={this.props.location.pathname === `/Admin/Pending/${user.userResturant.user.uid}` ? classes.active : 'notActive'} button component={Link} to={`/Admin/Pending/${user.userResturant.user.uid}`} onClick={() => this.onCloseDrawer()}>
                      <ListItemIcon className={this.props.location.pathname === `/Admin/Pending/${user.userResturant.user.uid}` ? classes.active : 'notActive'}>
                        <AccessTimeOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Pending Orders" />
                    </ListItem>

                    <ListItem className={this.props.location.pathname === `/Admin/InProcess/${user.userResturant.user.uid}` ? classes.active : 'notActive'} button component={Link} to={`/Admin/InProcess/${user.userResturant.user.uid}`} onClick={() => this.onCloseDrawer()}>
                      <ListItemIcon className={this.props.location.pathname === `/Admin/InProcess/${user.userResturant.user.uid}` ? classes.active : 'notActive'}>
                        <LoopIcon />
                      </ListItemIcon>
                      <ListItemText primary="Process Orders" />
                    </ListItem>

                    <ListItem className={this.props.location.pathname === `/Admin/Delivered/${user.userResturant.user.uid}` ? classes.active : 'notActive'} button component={Link} to={`/Admin/Delivered/${user.userResturant.user.uid}`} onClick={() => this.onCloseDrawer()}>
                      <ListItemIcon className={this.props.location.pathname === `/Admin/Delivered/${user.userResturant.user.uid}` ? classes.active : 'notActive'}>
                        <CheckCircleOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Delivered Orders" />
                    </ListItem>
                  </List>
                </Collapse>
                <ListItem className={this.props.location.pathname === '/Admin/FoodItems' ? classes.active : 'notActive'} button component={Link} to="/Admin/FoodItems" onClick={() => this.onCloseDrawer()}>
                  <ListItemIcon className={this.props.location.pathname === '/Admin/FoodItems' ? classes.active : 'notActive'}>
                    <FastfoodIcon />
                  </ListItemIcon>
                  <ListItemText primary="Food Items" />
                </ListItem>
                <ListItem className={this.props.location.pathname === `/Admin/Profile/${user.userResturant.user.uid}` ? classes.active : 'notActive'} button component={Link} to={`/Admin/Profile/${user.userResturant.user.uid}`} onClick={() => this.onItemClick('Profile')}>
                  <ListItemIcon className={this.props.location.pathname === `/Admin/Profile/${user.userResturant.user.uid}` ? classes.active : 'notActive'}>
                    <AccountBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </ListItem>
              </List>

              {/* {routes.map((prop, key) => {
              return (
                <Link to={prop.path} style={{ textDecoration: 'none' }} key={key}>
                  <MenuItem selected={this.activeRoute(prop.path)}>
                    <ListItemIcon>
                      <prop.icon />
                    </ListItemIcon>
                    <ListItemText primary={prop.sidebarName} />
                  </MenuItem>
                </Link>
              );
            })} */}
            </Drawer>
          </Hidden>
        </React.Fragment>
      </MuiThemeProvider >
    );
  }
}
MyRequests.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};


const mapStateToProps = state => {

  return {
    user: state.user,
    mobileOpen: state.cart.state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    store_user: (userlogin) => dispatch(update_user_Resturant(userlogin)),
    logout_user: () => dispatch(remove_user_Resturant()),
    drawer_toggle: (e) => dispatch(toggleDrawer(e)),

  }
}


// export default withStyles(styles)(Login);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(MyRequests)));
