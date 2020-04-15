import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Button, LinearProgress, Snackbar, } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
import FacebookIcon from '@material-ui/icons/Facebook';
import firebase from "../../config/Firebase";
import "typeface-roboto";
import PropTypes from "prop-types";
import { update_user_Customer, update_user_Resturant, Login_with_fb } from '../../store/action';
import { connect } from 'react-redux';
import { withRouter, Redirect } from "react-router";
import Alert from '@material-ui/lab/Alert';
import '../../App.css';
import './Home.css';
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    fontFamily: 'MyFont',
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100vh',
    width: '45vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundImage: 'url(' + require('../../assets/baking-background-8.jpg') + ')',
    backgroundImage: `url(${require('../../assets/ecopetit.cat-food-wallpaper-63019.png')})`,
    // backgroundSize: 'contain',

    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    // flexBasis: '600px'
  },
  quoteText: {
    backgroundColor: "hsla(0, 52%, 20%, 0.65)",
    borderRadius: '100%',
    padding: 130,
    // margin: 30,
    color: 'white',
    fontWeight: 300,
    fontFamily: 'MyFont',

  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3), 
    fontFamily: 'MyFont',
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
});



class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      toggle: false,
      restaurantOwr: [],
      customerUser: [],
      loaderToggle: false,
      openSnack: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    //  this.state.displayEmail && this.getResturantUserData()
    // this.authListener()
    this.getResturantUserData()
    this.getCustomertUserData()
  }

  authListener() {
    // const { history } = this.props
    firebase.auth().onAuthStateChanged(user => {
      // console.log(user)
      if (user) {
        // history.push("/Login");
        // history.push("/");
        this.setState({
          displayEmail: user.email,
        });
      } else {
        // No user is signed in.
        //       history.push("/Login");
        // history.push('/emailverification')
      }
    });
  }

  /*************************************************/
  getResturantUserData = () => {
    this.firebaseRef = firebase.database().ref("Resturant_Owner")
    this.firebaseRef.on('value', (snapshot) => {
      var asd = []
      snapshot.forEach((data) => {
        var childData = data.val();
        asd.push(childData)
      });
      this.setState({
        restaurantOwr: asd
      })
    });
  }
  getCustomertUserData = () => {
    this.firebaseRef = firebase.database().ref("Users")
    this.firebaseRef.on('value', (snapshot) => {
      var asd = []
      snapshot.forEach((data) => {
        var childData = data.val();
        asd.push(childData)

      });
      this.setState({
        customerUser: asd
      })
    });
  }
  /*************************************************/
  handleSubmit = (event) => {
  
    this.setState({
      loaderToggle: !this.state.loaderToggle
    })
    const { history } = this.props;

    const { email, password, restaurantOwr, customerUser } = this.state;
    const loginResturantData = restaurantOwr.filter((item) => item.email === email);
    const loginCustomerData = customerUser.filter((item) => item.email === email);
   
    if (loginResturantData.length !== 0) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {         
          this.setState({
            openSnack: true,
            loaderToggle: !this.state.loaderToggle
          })
          this.props.store_user_R(user);
          setTimeout(
            function () {
              history.push("/Dashboard");
            },
            2000
          );
          // }


        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/invalid-email') {
            this.setState({
              openSnackError: true, message: errorMessage, loaderToggle: !this.state.loaderToggle
            })
          }
          if (errorCode === 'auth/wrong-password') {
            this.setState({
              openSnackError: true, message: errorMessage, loaderToggle: !this.state.loaderToggle
            })
          }
          if (errorCode === 'auth/user-not-found') {
            this.setState({
              openSnackError: true, message: errorMessage, loaderToggle: !this.state.loaderToggle

            })

          }

          console.error("Error writing document: ", error);
        });
    }
    else if (loginCustomerData.length !== 0) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {        
          this.setState({
            openSnack: true,
            loaderToggle: !this.state.loaderToggle
          })
          this.props.store_user_C(user);
          setTimeout(
            function () {
              history.push("/");
            },
            2000
          )
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/invalid-email') {
            this.setState({
              openSnackError: true, message: errorMessage, loaderToggle: !this.state.loaderToggle
            })
          }
          if (errorCode === 'auth/wrong-password') {
            this.setState({
              openSnackError: true, message: errorMessage, loaderToggle: !this.state.loaderToggle
            })
          }
          if (errorCode === 'auth/user-not-found') {
            this.setState({
              openSnackError: true, message: errorMessage, loaderToggle: !this.state.loaderToggle
            })
          }
          console.error("Error writing document: ", error);
        });
    }
    else {
      this.setState({
        openSnackError: true,
        message: 'There is no user registered as Resturant Owner / Customer',
        loaderToggle: false
      })
      // alert('There is no user registered as Resturant Owner / Customer')
    }
  }
  /*************************************************/

  loginwithFb = () => {

    const { history, store_user_fb } = this.props;
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      'display': 'popup'
    });
    firebase.auth().signInWithPopup(provider).then(function (result) {


      // var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      var displayname = user.displayName;
      var email = user.email;
      var phoneNumber = user.phoneNumber;
      var photoURL = user.photoURL;
      var uid = user.uid;

      var userObj = {
        displayname,
        email,
        phoneNumber,
        photoURL,
        createTime: new Date().toLocaleString(),
        uid
      }
      if (user !== null) {
        firebase
          .database()
          .ref("Users/" + userObj.uid)
          .set(userObj)
          .then((e) => {
            store_user_fb(user)
            setTimeout(
              function () {
                history.push("/");
              },
              2000
            );
          })
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === "auth/network-request-failed") {
              this.setState({
                openSnackError: true,
                message: "A network error (such as timeout, interrupted connection or unreachable host) has occurred.",
                // loaderToggle: false
              })
            }
            console.log(error)
            console.log(errorMessage)
            // The email of the user's account used.
            var email = error.email;
            console.log(email)
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(credential)
            // ...
          });
      }

    });
  }

  handleKeyPress = (e) => {
    // if (event.charCode == 13) {
    //     this.submitLogin()
    // }
    if (e.charCode === 13) {
      this.handleSubmit()
    }
    // if (e.keyCode === 13) {
    //   alert('Enter... (KeyDown, use keyCode)');
  // }
//   if(e.key === 'Enter') {
//   console.log('Enter key pressed');
// }
  }
render() {
  const { classes, history, userR, user, userfb } = this.props;
  // console.log(customerUser)
  var asd = user.userfb && userfb.userfb.uid
  var qwe = user.user && user.user.user.uid
  var currentId = user.userfb ? asd : qwe
  if (currentId)
    return <Redirect to="/" />
  if (userR.userResturant)
    return <Redirect to="/Dashboard" />
  return (
    <React.Fragment >
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteContainer} item lg={5}>
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography className={classes.quoteText} variant="h4">
                  818' The Foodist <br /><span style={{ fontSize: 18 }}> Hungry?
        Order Now!</span>
                </Typography>
                <Typography style={{ color: "white", backgroundColor: "hsla(0, 0%, 0%, 0.66)", }} variant="body1">

                </Typography>
                <div className={classes.person}>

                  {/* <Typography className={classes.bio} variant="body2">
                    Manager at inVision
                </Typography> */}
                </div>
              </div>
            </div>
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>

            <div className={classes.content}>
              {/* <div className={classes.contentHeader}>
                <IconButton onClick={this.handleBack}>
                  <ArrowBackIcon />
                </IconButton>
              </div> */}

              <div className={classes.contentBody}>

                <form className={classes.form} >

                  <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={this.state.openSnackError} autoHideDuration={2500} onClose={() => this.setState({ openSnackError: false })} >
                    <div style={{ width: '40vw', }}>
                      {this.state.message && <Alert variant="filled" severity="error">
                        {this.state.message}
                      </Alert>}
                    </div>
                  </Snackbar>
                  {this.state.loaderToggle && <LinearProgress />}
                  <Typography className={classes.title} variant="h2" align="center" style={{ marginBottom: 10 }}>
                    Sign in
                </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        fullWidth
                        autoComplete=""
                        helperText={this.state.errorEmail ? <span style={{ color: 'red' }}>{this.state.errorEmail}</span> : null}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="Password"
                        name="password"
                        label="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        fullWidth
                        autoComplete=""
                        helperText={this.state.errorPassword ? <span style={{ color: 'red' }}>{this.state.errorPassword}</span> : null}
                      />
                    </Grid>
                  </Grid>
                  <br />
                  {this.state.email === "" || this.state.password === "" ? (<Button
                    disabled
                    fullWidth
                    variant="outlined"
                    color="primary"
                    className={classes.submit}
                 
                    onClick={() => this.handleSubmit()}
                  >
                    LOGIN
                </Button>) :
                    (<Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      className={classes.submit}
                      onClick={() => this.handleSubmit()}
                    >
                      LOGIN
                </Button>)}

                  <Button
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: '#3b5998', marginTop: 10, color: 'white' }}
                    // color="primary"
                    className={classes.submit}
                    onClick={() => this.loginwithFb()}
                    startIcon={<FacebookIcon />}
                  >
                    LOGIN with Facebook
                </Button>
                  <Grid container justify="space-between" style={{ marginTop: 5 }}>
                    <Grid item >
                      <div href="#" variant="body2">
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          display="block"
                          gutterBottom
                          style={{ cursor: "pointer", fontFamily: 'MyFont', }}
                          onClick={() => {
                            history.push("/");
                            // this.setState({
                            //   openSnack: true
                            // })
                          }}
                        >
                          Back to Home
                      </Typography>
                      </div>
                    </Grid>
                    <Grid item >
                      <div href="#" variant="body2">
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          display="block"
                          gutterBottom
                          style={{ cursor: "pointer", fontFamily: 'MyFont', }}
                          onClick={() => {
                            history.push("/Signup");
                          }}
                        >
                          Don't have an account? Sign up
                      </Typography>
                      </div>
                    </Grid>
                  </Grid>
                  <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={this.state.openSnack} autoHideDuration={1500} onClose={() => this.setState({ openSnack: false })} >
                    <div style={{ width: '40vw', }}>
                      <Alert variant="filled" severity="success">Login Successfully</Alert>
                    </div>
                  </Snackbar>
                </form>

              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment >
  );
}
}

Login.protoTypes = {
  callback: PropTypes.func
};

const mapStateToProps = state => {
  // console.log(state)
  return {
    userR: state.user,
    user: state.user,
    userfb: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    store_user_C: (userlogin) => dispatch(update_user_Customer(userlogin)),
    store_user_fb: (userlogin) => dispatch(Login_with_fb(userlogin)),
    store_user_R: (userlogin) => dispatch(update_user_Resturant(userlogin)),

  }
}
// export default withStyles(styles)(Login);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login)));
// finalized