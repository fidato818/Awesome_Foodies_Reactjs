import React from "react";
import { Grid, Container, Button, Typography, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import firebase from "../../config/Firebase";
import "typeface-roboto";
import PropTypes from "prop-types";
// import { update_user, remove_user } from '../../store/action';
// import { connect } from 'react-redux';
// import { withRouter } from "react-router";
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
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
      padding: theme.spacing(3)
    }
  },
  // paper: {
  //   // marginTop: theme.spacing(13),
  //   // marginBottom: theme.spacing(4),
  //   margin: theme.spacing(25),
  //   padding: theme.spacing(2),
  //   [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
  //     marginTop: theme.spacing(13),
  //     marginBottom: theme.spacing(6),
  //     padding: theme.spacing(3)
  //   }
  // },
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  // paper: {
  //   marginTop: theme.spacing(8),
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center"
  // },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }

  // root: {
  //   flexGrow: 1,
  //   backgroundColor: theme.palette.background.paper
  // }
});
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailUser: "",
      passwordUser: "",
      emailRestaurant: "",
      passwordRestaurant: "",
      toggle: false
    };
  }

  componentDidMount() {
    this.authListener();
  }


  /*************************************************/
  authListener() {
    const { history } = this.props
    firebase.auth().onAuthStateChanged(user => {
      if (user.emailVerified === false) {
        // console.log("user changed..", user);       
          // history.push("/");
          history.push('/emailverification')
      } else {
        // No user is signed in.
         history.push('/Login')
      }
    });
  }
  /*************************************************/
  emailVerification = (event) => {
    // event.preventDefault();
    // const { emailUser, passwordUser } = this.state;



    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then((r) => {
      alert("Sent Email Verification Check your Email")
      console.log('Success: ', `${r}`)
      // Email sent.
    }).catch(function (error) {
      // An error happened.
      console.log('Error: ', `${error}`)
    });

  }
  /*************************************************/

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Container component="main" maxWidth="xs">

          <Paper elevation={3} className={classes.paper}>
            <br />
            <br />
            <Typography style={{ textAlign: 'center' }} component="h1" variant="h5">
              Email Confirmation
              </Typography>
            <form

              className={classes.form}
            >
              <Typography style={{ textAlign: 'center' }}>
                You're almost ready to start the services,
                Simply Click the "Sent Email Verification" button
                below to verify your email Address

              </Typography>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                className={classes.submit}
                onClick={() => this.emailVerification()}
              >
                Sent Email Verification
                </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <div href="#" variant="body2">
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{ cursor: "pointer" }}

                    >
                      Refresh Page if you verified Email Address
                          </Typography>
                  </div>
                </Grid>
              </Grid>
            </form>
          </Paper>

        </Container>
      </React.Fragment>
    );
  }
}

Login.protoTypes = {
  callback: PropTypes.func
};

// const mapStateToProps = state => {
//   return {
//     user: state.user
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     store_user: (userlogin) => dispatch(update_user(userlogin)),
//     logout_user: () => dispatch(remove_user()),
//   }
// }
export default withStyles(styles)(Login);
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login)));
