import React from "react";
import {
  Typography,
  TextField,
  Grid,
  // AppBar,
  // Tabs,
  // Tab,
  FormLabel,
  RadioGroup,
  FormControl,
  Radio,
  Button, Snackbar,
  FormControlLabel, InputLabel, Input, IconButton, InputAdornment, Select, MenuItem, FormHelperText, CircularProgress
} from "@material-ui/core";
import data from '../../data/countries+states.js'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import { Snackbar } from "material-ui";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { BrowserRouter as Router, } from "react-router-dom";
import Autocomplete from '@material-ui/lab/Autocomplete';
// import SwipeableViews from "react-swipeable-views";
import { Alert } from '@material-ui/lab';
// import {
//   CountryDropdown,
//   RegionDropdown,
// } from "react-country-region-selector";
import { green } from '@material-ui/core/colors';
import firebase from "../../config/Firebase";
import '../../App.css';
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
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
    paddingBottom: theme.spacing(2),
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
    // paddingBottom: 125,
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
  },

  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },

  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      age: "",
      value: 0,
      resturantName: "",
      file: "",
      country: "",
      region: "",
      image: null,
      url: "",
      openSnack: false,
      select: 'Resturant-Owner',
      resturantValid: [],
      tags: [],
      chinese: false,
      bbq: false,
      pizza: false,
      burgers: false,

    };
    this.handleChange = this.handleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
  }

  onTagsChange = (event, values) => {
    if (values === null) {
      console.log('')
    }
    else {
      this.setState({
        tags: values,
        country: values.name,
        // errorC: this.state.errorC,
        // errorTextC: ''
      }, () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.tags);
      });
    }

  }
  onTagsRegion = (event, values) => {

    if (values === null) {
      console.log('')
    }
    else {
      this.setState({    //     
        region: values,
      }, () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.region);
      });
    }

  }
  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }


  handleChangeCertificate = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  componentDidMount() {
    this.getResturantValidation()

  }

  getResturantValidation = () => {
    this.firebaseRef = firebase.database().ref("Resturant_Owner")
    this.firebaseRef.on('value', (snapshot) => {
      var asd = []
      snapshot.forEach((data) => {
        var childData = data.val();
        asd.push(childData)
        // console.log(childData)
      });
      this.setState({
        resturantValid: asd
      })
    });
  }


  /*************************************************/
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
  /*************************************************/
  handleSubmit = (event) => {
    const { history } = this.props;
    const {
      gender,
      email,
      fullname,
      password,
      confirmPassword,
      age, region,
      country, select,
      resturantName, image, } = this.state;
    this.setState({ loading: !this.state.loading })
    var cartData = this.state.resturantValid.filter((item) => item.resturantName === this.state.resturantName)
    if (select === 'Customer') {
      if (fullname === "") {
        this.setState({
          errorfullname: !this.state.errorfullname, loading: false
        });
      } else
        if (email === '' || email === null) {
          this.setState({
            errorE: !this.state.errorE, loading: false
          });
        } else
          if (password.length <= 5 || password === '') {
            this.setState({
              errorP: !this.state.errorP, loading: false
            });
          } else
            if (confirmPassword === '' || confirmPassword !== password) {
              this.setState({
                errorCP: !this.state.errorCP, loading: false
              });
            } else
              if (country === '') {
                this.setState({
                  errorC: !this.state.errorC, loading: false
                });
              } else
                if (region === '') {
                  this.setState({
                    errorR: !this.state.errorR, loading: false
                  });
                } else
                  if (gender === '') {
                    this.setState({
                      errorG: !this.state.errorG, loading: false
                      // errorfullnamehelperText: "",
                    });
                  } else if (age === '') {
                    this.setState({
                      errorAge: !this.state.errorAge, loading: false
                      // errorfullnamehelperText: "",
                    });
                  }
                  else {
                    firebase
                      .auth()
                      .createUserWithEmailAndPassword(email, password)
                      .then(res => {
                        var userId = firebase.auth().currentUser.uid;
                        firebase
                          .database()
                          .ref("Users/" + userId)
                          .set({
                            gender,
                            email,
                            fullname,
                            password,
                            confirmPassword,
                            age,
                            region,
                            country,
                            userId,
                            createAt: new Date().toLocaleString()
                          })
                          .then(() => {
                            console.log("Document successfully written!");
                            this.setState({ openSnack: true, loading: !this.state.loading })
                            // alert("Successfully Register");
                            setTimeout(
                              function () {
                                history.push("/Login");
                                // history.push('/emailverification')
                              },
                              2000
                            );
                          })
                          .catch((error) => {
                            console.log("Error writing document: ", `${error}`);
                          });
                      }).catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode === 'auth/invalid-email') {
                          this.setState({
                            openSnackError: true,
                            message: errorMessage, loading: false
                          })
                        }
                        if (errorCode === 'auth/wrong-password') {
                          this.setState({
                            openSnackError: true,
                            message: errorMessage, loading: false
                          })
                        }
                        if (errorCode === 'auth/user-not-found') {
                          this.setState({
                            openSnackError: true,
                            message: errorMessage, loading: false
                          })
                        }
                        if (errorCode === 'auth/email-already-in-use') {
                          this.setState({
                            openSnackError: true,
                            message: errorMessage, loading: false
                          })
                        }

                        console.log("Error writing document: ", `${error}`);
                        // alert('Error: ', errorMessage)
                      });
                  }

    } else
      if (select === 'Resturant-Owner') {
        if (fullname === "") {
          this.setState({
            errorfullname: !this.state.errorfullname, loading: false
          });
        } else
          if (email === '' || email === null) {
            this.setState({
              errorE: !this.state.errorE, loading: false
            });
          } else
            if (password.length <= 5 || password === '') {
              this.setState({
                errorP: !this.state.errorP, loading: false
              });
            } else
              if (confirmPassword === '' || confirmPassword !== password) {
                this.setState({
                  errorCP: !this.state.errorCP, loading: false
                });
              } else
                if (country === '') {
                  this.setState({
                    errorC: !this.state.errorC, loading: false
                  });
                } else
                  if (region === '') {
                    this.setState({
                      errorR: !this.state.errorR, loading: false
                    });
                  } else
                    if (resturantName === '') {
                      this.setState({
                        errorRE: !this.state.errorRE,
                        errorTextVaild: 'Please Fill Resturant Field', loading: false
                      })
                    } else
                      // if (cartData.length !== 0) {
                      //   this.setState({
                      //     // errorRE: !this.state.errorRE,
                      //     errorTextVaild: ''
                      //   })
                      // } else
                      if (cartData.length) {
                        this.setState({
                          errorRE: !this.state.errorRE,
                          errorTextVaild: 'This Resturant is Already Exist',
                          loading: false
                        })
                      } else
                        // if (image === undefined) {
                        if (image === null) {
                          // alert('please add Image')
                          this.setState({
                            errorIM: !this.state.errorIM, loading: false
                          })
                        } else {
                          firebase
                            .storage()
                            .ref(`Restaurant_Certificate/${image.name}`)
                            .put(image)
                            .then(snapshot => {
                              return snapshot.ref.getDownloadURL(); // Will return a promise with the download link
                            })
                            .then(downloadURL => {
                              console.log(
                                `Successfully uploaded file and got download link - ${downloadURL}`
                              );
                              this.setState({ url: downloadURL });
                              firebase
                                .auth()
                                .createUserWithEmailAndPassword(email, password)
                                .then(res => {
                                  var userId = firebase.auth().currentUser.uid;
                                  var obj = {
                                    email,
                                    fullname,
                                    password,
                                    confirmPassword,
                                    userId,
                                    downloadURL,
                                    region,
                                    country,
                                    resturantName,
                                    createAt: new Date().toLocaleString(), chinese: false,
                                    bbq: false,
                                    pizza: false,
                                    burgers: false,

                                  }
                                  firebase
                                    .database()
                                    .ref("Resturant_Owner/" + userId)
                                    .set(obj)
                                    .then(() => {
                                      console.log("Document successfully written!");
                                      this.setState({ openSnack: true, loading: !this.state.loading })
                                      // alert("Successfully Register");
                                      setTimeout(
                                        function () {
                                          history.push("/Login");
                                        },
                                        2000
                                      );
                                    })
                                    .catch((error) => {
                                      console.error("Error writing document: ", error);
                                    });
                                })
                                .catch((error) => {
                                  var errorCode = error.code;
                                  var errorMessage = error.message;
                                  if (errorCode === 'auth/invalid-email') {
                                    this.setState({
                                      openSnackError: true,
                                      message: errorMessage, loading: false
                                    })
                                  }
                                  if (errorCode === 'auth/wrong-password') {
                                    this.setState({
                                      openSnackError: true,
                                      message: errorMessage, loading: false
                                    })
                                  }
                                  if (errorCode === 'auth/user-not-found') {
                                    this.setState({
                                      openSnackError: true,
                                      message: errorMessage, loading: false
                                    })
                                  }
                                  if (errorCode === 'auth/email-already-in-use') {
                                    this.setState({
                                      openSnackError: true,
                                      message: errorMessage, loading: false
                                    })
                                  }
                                  console.error("Error writing document: ", error);
                                });
                            });
                        }
      }
      else {
        // alert()
        this.setState({
          openSnackError: true,
          message: 'something went Wrong', loading: false
        })

      }
  }




  render() {
    const { classes,
      //  theme, 
      history } = this.props;
    let activityFields = data()
    // const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var cartData = this.state.resturantValid.filter((item) => item.resturantName === this.state.resturantName)

    return (

      <MuiThemeProvider>
        <Router>
          <React.Fragment>
            <div className={classes.root}>
              <Grid className={classes.grid} container>
                <Grid className={classes.quoteContainer} item lg={5}>
                  <div className={classes.quote}>
                    <div className={classes.quoteInner}>
                      <Typography className={classes.quoteText} variant="h4">
                        818' The Foodist <br /><span style={{ fontSize: 18 }}> Hungry?
      Order Now!</span>
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid className={classes.content} item lg={7} xs={12}>
                  <div className={classes.content}>
                    <div className={classes.contentBody}>
                      <form className={classes.form} >
                        {/* {this.state.message && <Alert variant="filled" severity="error">
                          {this.state.message}
                        </Alert>} */}

                        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                          key={`${'top'},${'right'}`} open={this.state.openSnackError} autoHideDuration={2500} onClose={() => this.setState({ openSnackError: false })}>
                          <div style={{ width: '40vw', }}>
                            <Alert variant="filled" severity="error">
                              {this.state.message}
                            </Alert>
                          </div>
                        </Snackbar>
                        <Grid
                          container
                          spacing={0}
                          direction="column"
                          alignItems="center"
                          justify="center"
                          style={{ minHeight: "100vh" }}
                        >
                          <div className={classes.root}>
                            {/* <Navbar /> */}

                            {/* <Paper className={classes.paper}> */}
                            {/* <Typography variant="h4">Register</Typography> */}
                            <Typography className={classes.title} variant="h3" align="center" style={{ marginBottom: 10 }}>
                              Register
                </Typography>
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <TextField
                                  required
                                  id="firstName"
                                  name="fullname"
                                  label="Full Name"
                                  value={this.state.fullname}
                                  type="text"
                                  onChange={this.handleChange}
                                  fullWidth
                                // helpertext={!this.state.errorfullname ? <span style={{ color: 'red' }}>{this.state.errorfullnamehelperText}</span> : null}
                                />
                                {this.state.fullname === '' && this.state.errorfullname ? <FormHelperText style={{ color: 'red' }}>Please Fill Name Field</FormHelperText> : null}
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  required
                                  id="email"
                                  name="email"
                                  label="Email"
                                  value={this.state.email}
                                  type="email"
                                  onChange={this.handleChange}
                                  fullWidth
                                  autoComplete=""

                                />
                                {this.state.email === "" && this.state.errorE ? <FormHelperText style={{ color: 'red' }}>Please Fill Valid Email</FormHelperText> : null}
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input

                                  id="standard-adornment-password"
                                  name="password"
                                  type={this.state.showPassword ? 'text' : 'password'}
                                  value={this.state.password}
                                  helpertext="Incorrect entry."
                                  onChange={this.handleChange}

                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                      >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                                {this.state.password.length <= 5 || this.state.password === '' ? this.state.errorP && <FormHelperText style={{ color: 'red' }}>Please enter password (min 6 digits)</FormHelperText> : null}
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <InputLabel htmlFor="comfirm-password">Confirm Password</InputLabel>
                                <Input

                                  id="comfirm-password"
                                  name="confirmPassword"
                                  type={this.state.showPassword ? 'text' : 'password'}
                                  value={this.state.confirmPassword}
                                  onChange={this.handleChange}

                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                      >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                                {this.state.confirmPassword !== this.state.password && this.state.errorCP ? <FormHelperText style={{ color: 'red' }}>Please enter same as Password</FormHelperText> : null}
                              </Grid>
                              <Grid item xs={6}>
                                <Autocomplete
                                  // multiple
                                  options={activityFields.fields}
                                  getOptionLabel={option => option.name || ''}
                                  defaultValue={[activityFields.fields[0].name || '']}
                                  onChange={this.onTagsChange}
                                  renderInput={params => (
                                    <TextField
                                      {...params}
                                      variant="standard"
                                      label="Country"
                                      placeholder=""
                                      value={this.state.country}
                                      // margin="normal"
                                      fullWidth
                                    />
                                  )}
                                />
                                {this.state.country === "" && this.state.errorC ? <FormHelperText style={{ color: 'red' }}>Please Select Country</FormHelperText> : null}
                              </Grid>
                              <Grid item xs={6}>
                                <Autocomplete
                                  // multiple
                                  options={this.state.tags.states}
                                  getOptionLabel={region => region}
                                  // defaultValue={[activityFields.fields[13]]}
                                  onChange={this.onTagsRegion}
                                  renderInput={params => (
                                    <TextField
                                      {...params}
                                      variant="standard"
                                      label="Region"
                                      name='region'
                                      value={this.state.region}
                                      placeholder=""
                                      // margin="normal"
                                      fullWidth
                                    />
                                  )}
                                />

                                {this.state.region.length === 0 && this.state.errorR ? <FormHelperText style={{ color: 'red' }}>Please Select Region</FormHelperText> : null}

                              </Grid>
                              {/* <Grid item xs={6}>
                      <InputLabel id="demo-simple-select-label">Please State</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="state"
                        value={this.state.select}
                        onChange={this.handleChange}
                        fullWidth
                      >
                        {activityFields.fields.map((e, index) => {
                          return (
                            // <MenuItem key={index} value={e.states}>{e.states}</MenuItem>
                            e.states.map((e) => {
                              return (
                                <MenuItem key={index} value={e}>{e}</MenuItem>
                              )
                            })
                          )
                        })
                        }
                      </Select>
                    </Grid> */}
                              <Grid item xs={12}>
                                <InputLabel id="demo-simple-select-label">Please Select</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  name="select"
                                  value={this.state.select}
                                  onChange={this.handleChange}
                                  fullWidth
                                >
                                  <MenuItem value={'Customer'}>Customer</MenuItem>
                                  <MenuItem value={'Resturant-Owner'}>Resturant Owner</MenuItem>

                                </Select>
                              </Grid>
                              {this.state.select === 'Customer' ?
                                <Grid item xs={12} >
                                  <Grid item xs={12}>
                                    <FormControl
                                      component="fieldset"
                                      onChange={this.handleChange}
                                    >
                                      <FormLabel component="legend">Gender</FormLabel>
                                      <RadioGroup
                                        aria-label="position"
                                        name="position"
                                        row
                                      >
                                        <FormControlLabel
                                          value="Male"
                                          control={<Radio color="primary" />}
                                          label="Male"
                                          labelPlacement="end"
                                          name="gender"
                                        />
                                        <FormControlLabel
                                          value="Female"
                                          control={<Radio color="primary" />}
                                          label="Female"
                                          labelPlacement="end"
                                          name="gender"
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                    {this.state.gender.length === 0 && this.state.errorG ? <FormHelperText style={{ color: 'red' }}>Please Select Gender</FormHelperText> : null}
                                  </Grid>
                                  <Grid item sm={12} validate="true" >
                                    <TextField
                                      required
                                      id="date"
                                      name="age"
                                      label="Age"
                                      value={this.state.age}
                                      onKeyPress={this.handleKeyPress}
                                      onChange={this.handleChange}
                                      type="number" 
                                      fullWidth
                                      autoComplete=""

                                    />
                                    {this.state.age.length === 0 && this.state.errorAge ? <FormHelperText style={{ color: 'red' }}>Please Enter Age</FormHelperText> : null}

                                  </Grid>
                                </Grid> : this.state.select === 'Resturant-Owner' ?
                                  <Grid item xs={12} >
                                    <Grid item xs={12}>
                                      <TextField
                                        required
                                        id="restName"
                                        name="resturantName"
                                        label="Resturant Name"
                                        type="text"
                                        value={this.state.resturantName}
                                        onChange={this.handleChange}
                                        fullWidth
                                        autoComplete=""
                                      />
                                      {this.state.resturantName.length === 0 && this.state.errorRE ? <FormHelperText style={{ color: 'red' }}>{this.state.errorTextVaild}</FormHelperText>
                                        : cartData.length !== 0 && this.state.errorRE ? <FormHelperText style={{ color: 'red' }}>{this.state.errorTextVaild}</FormHelperText> : null}
                                    </Grid>
                                    <Grid item xs={12}>
                                      <TextField
                                        id="address2"
                                        name={this.state.image && this.state.image.name}
                                        label="Upload Cover Picture"
                                        type="file"
                                        onKeyPress={this.handleKeyPress}
                                        onChange={this.handleChangeCertificate}
                                        // helperText={this.state.errorIM ? <span style={{ color: 'red' }}>Please Add Image</span> : null}
                                        fullWidth
                                      />
                                      {this.state.image === null && this.state.errorIM ? <FormHelperText style={{ color: 'red' }}>Please Add Image</FormHelperText> : null}
                                    </Grid>

                                  </Grid> : null}

                              {/* <Button
                                value="Submit"
                                variant="outlined"
                                color="primary"
                                fullWidth
                                className={classes.button}
                                onClick={() => this.handleSubmit()}
                              >
                                Register
                        </Button> */}
                              <div className={classes.wrapper}>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  fullWidth
                                  className={classes.buttonClassname}
                                  disabled={this.state.loading}
                                  onClick={() => this.handleSubmit()}
                                >
                                  Register
        </Button>
                                {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                              </div>
                              <Grid container style={{ marginTop: 2, marginLeft: 10 }}>
                                <Grid item>
                                  <div href="#" variant="body2">
                                    <Typography
                                      variant="body1"
                                      color="textSecondary"
                                      display="block"
                                      gutterBottom
                                      style={{ cursor: "pointer", fontFamily: 'MyFont', }}
                                      onClick={() => {
                                        history.push("/Login");
                                      }}
                                    >
                                      Already have an account? Sign in
                              </Typography>
                                  </div>
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={this.state.openSnack} autoHideDuration={1500} onClose={() => this.setState({ openSnack: false })} >
                            <div style={{ width: '40vw', }}>
                              <Alert variant="filled" severity="success">Successfully Signup</Alert>
                            </div>
                          </Snackbar>
                        </Grid>
                      </form>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </React.Fragment>
        </Router>
      </MuiThemeProvider>
    );
  }
} 
Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Signup);

