import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Toolbar,
  Button,
  IconButton,
  AppBar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { withRouter, Redirect } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from "@material-ui/icons/Dashboard";
import { Link, } from "react-router-dom";
import { connect } from 'react-redux';
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import firebase from "firebase";

import { update_user_Resturant, remove_user_Resturant, toggleDrawer } from '../store/action';

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

// const drawerWidth = 240;
const styles = theme => ({
  // drawerPaper: {
  //   width: drawerWidth
  // },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  // root: {
  //   flexGrow: 1
  // },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textDecoration: "None",
    color: "white", cursor: 'pointer'

  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
});

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
      auth: false,
      anchorEl: null,
      displayEmail: "",
      open: false,
      mobileOpen: false,
    };
    // this.dashData = this.dashData.bind(this);
    this.signoutFirebase = this.signoutFirebase.bind(this);
    this.handleDrawerClick = this.handleDrawerClick.bind(this);
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // return console.log("Router: ", nextProps);
  //   return console.log(
  //     "Router: prevState",
  //     prevState,
  //     "Router: nextProps",
  //     nextProps
  //   );
  // }
  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  /*================================================================= */
  handleMenuRequest = event => {
    this.setState({ toggle: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ toggle: null });
  };
  /*================================================================= */



  async componentDidMount() {
    // const { userId } = this.state
    // const { user } = this.props
    await this.authListener();
    // if (user.user.user.uid !== userId) {
    //   alert('Please Login as Resturant User or Register as Resturant')
    //   this.props.logout_user()
    //   this.props.history.push("/Login");
    // } else {
    //   this.props.user.user === userId && this.getDataResturantOwner()
    // }
  } 
  authListener() {
    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          displayEmail: user.email,
        });
        // this.props.store_user(user)
        // else if (user.uid !== this.props.user.user.user.uid) {
        //   alert('Please Login as Customer User or Register as Customer')
        //   this.signoutFirebase()
        // this.props.logout_user()
        // this.props.history.push("/Login");
      } else {
        // No user is signed in.
        // browserHistory.push("/signin");
      }
    });
  }

  handleDrawerClick() {
    if (this.state.open === false) this.setState({ open: true });
    else this.setState({ open: false });
  }
 
 

  signoutFirebase() {

    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.logout_user()
        this.props.history.push("/Login");
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
        console.log(`${error}`);
      });
    // history.push("/Login");
  }

  handleDrawerToggle = () => {
    const { mobileOpen } = this.state
    this.setState({ mobileOpen: true });
    this.props.drawer_toggle(mobileOpen)
  };




  getDataResturantOwner = () => {
    const { user } = this.props

    var firebaseRef = firebase.database().ref("Resturant_Owner/" + user.user.user.uid);
    firebaseRef.on('value', (snapshot) => {
      let message = snapshot.val();
      if (message.userId !== user.user.user.uid) {
        alert('You are Not Authorized')
        this.props.logout_user()
        this.props.history.push("/Login");
      } else
        if (message.userId === user.user.user.uid) {
          this.setState({
            userId: message.userId,
            resturantName: message.resturantName,
            downloadURL: message.downloadURL,
            foodName: message.foodName,
            foodPrice: message.foodPrice,
            newPostKey: message.newPostKey,
          })
        }
    });
  }
  render() {
    const { classes,user } = this.props;
    const { anchorEl, displayEmail, userId, } = this.state;
    const open = Boolean(anchorEl);
    console.log(user.userResturant.user.email)
    if (!user.userResturant)
    return <Redirect to="/login" />
    return (
      <div onClick={this.handleDrawerClick.bind(this)}>
        <AppBar color="primary" position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              // onClick={this.handleDrawerClick.bind(this)}
              // onClick={this.props.handleClick}
              onClick={this.handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>

              818' The Foodist | Admin

            </Typography>            
            {this.state.displayEmail ? (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={this.handleCloseMenu}
                >
                  <StyledMenuItem
                  >
                    <ListItemIcon>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={displayEmail} />
                  </StyledMenuItem>
                  <Link style={{ textDecoration: 'none' }} to={`/Admin/Profile/${userId}`} >
                    {/* <StyledMenuItem               
              >
                
                <ListItemIcon>
                  <LoopIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="My account" />
              </StyledMenuItem> */}
                  </Link>
                  <StyledMenuItem
                    onClick={this.signoutFirebase}
                  >
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </StyledMenuItem>
                </StyledMenu>
              </div>
            ) : (
                <Button color="inherit">
                  <Link to="/login" className={classes.title}>
                    Login
                </Link>
                </Button>
              )}
            {/* <Button color="inherit">
                <Link to="/MyRequests/">MyRequests</Link>
              </Button> */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default withRouter(Navbar)(withStyles(styles)(Navbar));
// export default withRouter(connect()(withStyles(styles)(Navbar)));
// export default connect()(withRouter(Navbar))(withStyles(styles)(Navbar))
// export default withStyles(styles)(Navbar);

// export default compose(
//   withRouter,
//   withStyles(styles)
// )(Navbar);
// export default withRouter(connect()(withStyles(styles)(Navbar)));
const mapStateToProps = state => {
  console.log(state)
  return {
    user: state.user,
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar)));
