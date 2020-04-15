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

} from "@material-ui/core";
import { connect } from "react-redux";
import { Link, } from "react-router-dom";
import { withRouter } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { update_user_Customer, remove_user_Customer, remove_with_fb } from '../store/action';
import firebase from "firebase";


// const StyledMenuItem = withStyles(theme => ({
//   root: {
//     "&:focus": {
//       backgroundColor: theme.palette.primary.main,
//       "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
//         color: theme.palette.common.white
//       }
//     }
//   }
// }))(MenuItem);
// const StyledMenu = withStyles({
//   paper: {
//     border: "1px solid #d3d4d5"
//   }
// })(props => (
//   <Menu
//     elevation={0}
//     getContentAnchorEl={null}
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "center"
//     }}
//     transformOrigin={{
//       vertical: "top",
//       horizontal: "center"
//     }}
//     {...props}
//   />
// ));


const drawerWidth = 240;
const styles = theme => ({
  drawerPaper: {
    width: drawerWidth
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textDecoration: "None",
    color: "black"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  buttonCollapse: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    },
    margin: "10px",
    boxShadow: "none"
  },
  rootResponsive: {
    // position: "absolute",
    right: 0
  },
  buttonBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    // [theme.breakpoints.down("lg")]: {
    //   display: "block"
    // },
    margin: "10px",
    paddingLeft: "16px",
    display: 'flex',
    // right: 0,
    // position: "relative",
    // width: "100%",
    background: "transparent"
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
      id: '',
      open: false
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

  handleMenuRes = event => {
    this.setState({ anchorEl: event.currentTarget });
    // console.log(event.currentTarget)
  };

  handleCloseRes = () => {
    this.setState({ anchorEl: null });
  };
  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorElR: event.currentTarget });
    // console.log(event.currentTarget)
  };

  handleCloseMenu = () => {
    this.setState({ anchorElR: null });
  };

  /*================================================================= */
  handleMenuRequest = event => {
    this.setState({ toggle: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ toggle: null });
  };
  // /*================================================================= */



  async componentDidMount() {
    await this.authListener();
    // if (user.user.user.uid === userId) {
    // this.props.user.user && this.getDataResturantOwner()
    // this.props.user.user && this.selfId()


    // console.log(this.props)
  }
  // authListener() {
  //   const { history } = this.props
  //   this.authSubscription =   firebase.auth().onAuthStateChanged(user => {
  //     // console.log(user)
  //     if (user.emailVerified === false) {     
  //         history.push('/emailverification')      
  //       // this.setState({
  //       //   displayEmail: user.email,
  //       // });     
  //     } else {
  //       // No user is signed in.
  //              history.push("/");
  //              this.setState({
  //         displayEmail: user.email,
  //       });  
  //     }
  //   });
  // }


  handleDrawerClick() {
    if (this.state.open === false) this.setState({ open: true });
    else this.setState({ open: false });
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


  signoutFirebase = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.logout_user()
        this.props.logout_user_fb()
        this.props.history.push("/Login");

        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
        console.log(`${error}`);
      });
    // history.push("/Login");
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    const { classes, user, userfb, userR } = this.props;
    const { anchorEl, displayEmail, anchorElR } = this.state;
    const open = Boolean(anchorElR);
    const openRes = Boolean(anchorEl);
    var asd = user.userfb && userfb.userfb.uid
    var qwe = user.user && user.user.user.uid
    var currentId = user.userfb ? asd : qwe
    // console.log(user.user.user.uid)
    // console.log(userR.userResturant)
    var resID = userR.userResturant && userR.userResturant.user.email
    return (
      <div onClick={this.handleDrawerClick.bind(this)}>
        <AppBar style={{ background: 'rgba(249, 0, 11, 0.85)' }} color="primary" position="fixed" className={classes.appBar}>

          <Toolbar>
            {/* <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleDrawerClick.bind(this)}
            >
              <MenuIcon />
            </IconButton> */}

            <Typography variant="h6" className={classes.title}>
              <Link style={{ color: 'white' }} to="/" className={classes.title}>
                818's The Foodist
              </Link>
            </Typography>




            {/* {!this.state.user && (

              <Button color="inherit">
                <Link to="/login" className={classes.title} >
                  Login
                  </Link>
              </Button>

            )} */}

            {/* <Button color="inherit">
                <Link to="/MyRequests/">MyRequests</Link>
              </Button> */}
            <div className={classes.buttonBar} id="appbar-collapse">
              <Button color="inherit" onClick={this.props.handleClick}>
                Famous Resturant
            </Button>
              {this.props.user.user || this.props.user.userfb || resID ? (
                <div>
                  <IconButton
                    aria-owns={open ? "menu-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElR}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={open}
                    onClose={this.handleCloseMenu}
                  >
                    <MenuItem>{displayEmail}</MenuItem>
                    {/* <MenuItem onClick={this.handleClose}>Profile</MenuItem> */}
                    {user ? (<Link style={{ textDecoration: 'none', color: 'black' }} to={`/User/MyOrders/${currentId}`} >  <MenuItem >My Orders</MenuItem></Link>) : ""}
                    {userR.userResturant ? "" : <MenuItem onClick={() => this.signoutFirebase()}>Logout</MenuItem>}
                  </Menu>
                </div>
              ) : (<Button color="inherit">
                <Link to="/login" style={{
                  flexGrow: 1,
                  textDecoration: "None",
                  color: "white"
                }}>
                  Login
              </Link>
              </Button>)}
            </div>
            <div className={classes.buttonCollapse}>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenuRes}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={openRes}
                onClose={this.handleCloseRes}
              >
                <div className={classes.rootResponsive}>
                  {/* <ButtonAppBarCollapse> */}
                  <MenuItem><Button color="inherit" onClick={this.props.handleClick}>
                    Famous Resturant
            </Button></MenuItem>
                  <MenuItem>{this.props.user.user || this.props.user.userfb || resID ? (
                    <div>
                      <IconButton
                        aria-owns={open ? "menu-appbar" : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorElR}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right"
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right"
                        }}
                        open={open}
                        onClose={this.handleCloseMenu}
                      >
                        <MenuItem>{displayEmail}</MenuItem>
                        {/* <MenuItem onClick={this.handleClose}>Profile</MenuItem> */}
                        {user ? (<Link style={{ textDecoration: 'none', color: 'black' }} to={`/User/MyOrders/${currentId}`} >  <MenuItem >My Orders</MenuItem></Link>) : ""}
                        {userR.userResturant ? "" : <MenuItem onClick={() => this.signoutFirebase()}>Logout</MenuItem>}
                      </Menu>
                    </div>
                  ) : (<Button color="inherit">
                    <Link to="/login" className={classes.title} >
                      Login
              </Link>
                  </Button>)}</MenuItem>
                </div>
              </Menu>
            </div>
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
  // console.log(state.user.userResturant)
  return {
    user: state.user,
    userfb: state.user,
    userR: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    store_user: (userlogin) => dispatch(update_user_Customer(userlogin)),
    logout_user: () => dispatch(remove_user_Customer()),
    logout_user_fb: () => dispatch(remove_with_fb()),
  }
}
// export default withStyles(styles)(Login);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar)));
