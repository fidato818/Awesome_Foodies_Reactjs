import React from "react";
import { LinearProgress, Avatar, CircularProgress, Snackbar, Typography, Checkbox, FormGroup, FormControlLabel, Paper, CardHeader, CardContent, CardActions, Divider, InputLabel, Input, IconButton, InputAdornment, Grid, TextField, Button, } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import firebase from "../../config/Firebase";
import "typeface-roboto";
import PropTypes from "prop-types";
import { update_user_Resturant, remove_user_Resturant } from '../../store/action';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import data from '../../data/countries+states.js'
import SideBar from "../../config/Sidebar";
import AdminNavbar from "../../config/adminNavbar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Alert from '@material-ui/lab/Alert';
var moment = require('moment');
moment().format();
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
        // position: "relative",
        overflow: "hidden",
        backgroundColor: theme.palette.background.default
    },
    roots: {
        minWidth: 275,
        textAlign: 'left',
    },
    paper: {
        margin: theme.spacing(25),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(13),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3)
        }
    },
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    // avatar: {
    //     margin: theme.spacing(1),
    //     backgroundColor: theme.palette.secondary.main
    // },
    form: {
        width: "100%",
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    appContent: theme.mixins.gutters({
        backgroundColor: '#e0e0e0',
        flex: "1 1 100%", // https://github.com/philipwalton/flexbugs#flexbug-17
        maxWidth: "100%", // https://github.com/philipwalton/flexbugs#flexbug-17
        paddingTop: 80,
        paddingBottom: 40,
        margin: "0 auto",

        [theme.breakpoints.up("lg")]: {
            maxWidth: theme.breakpoints.values.lg
        }
    }),

    details: {
        display: 'flex'
    }, famousHeading: {

        [theme.breakpoints.up("xs")]: {
          // display: "none",
          fontSize: "3rem"
        },
        [theme.breakpoints.up("sm")]: {
          // display: "none",
          fontSize: "6rem",
        },
        textAlign: "center",
        color: 'rgba(0, 0, 0, 0.54)',
        fontFamily: 'MyFont',
        // fontSize: 50
      },
    avatar: {
        marginLeft: 'auto',
        height: 110,
        width: 100,
        flexShrink: 0,
        flexGrow: 0
    },
    progress: {
        marginTop: theme.spacing(2)
    },
    uploadButton: {
        marginRight: theme.spacing(2)
    }
});

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false, tags: [],
            chinese: false,
            bbq: false,
            pizza: false,
            burgers: false,
            openSnack: false,
            progressValue: 0

        };
        this.handleChange = this.handleChange.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck(event) {
        // event.preventDefault();
        this.setState({
            [event.target.name]: event.target.checked
        })
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    /*************************************************/

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
    /*************************************************/

    async componentDidMount() {
        await this.getData();
        this.authListener();
        this.progressUpdate();
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    tick() {
        this.setState({
            time: moment().format('MMMM Do YYYY, h:mm:ss a')
        })
    }


    authListener() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // console.log("user changed..", user.email);
                this.setState({
                    displayEmail: user.email
                });
            } else {
                // No user is signed in.
                // browserHistory.push("/signin");
            }
        });
    }
    handleChangeCertificate = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
        }
    };
    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };


    getData() {
        const { user } = this.props
        // console.log(user.userResturant.user.uid)
        var messagesRef = firebase.database().ref("Resturant_Owner/" + user.userResturant.user.uid)
        messagesRef.on("value", snapshot => {
            let message = snapshot.val();
            if (message.userId === user.userResturant.user.uid) {
                this.setState({
                    email: message.email,
                    fullname: message.fullname,
                    password: message.password,
                    confirmPassword: message.confirmPassword,
                    userId: message.userId,
                    downloadURL: message.downloadURL,
                    region: message.region,
                    country: message.country,
                    resturantName: message.resturantName,
                    subTitle: message.subTitle,
                    resturantDescription: message.resturantDescription,
                    chinese: message.chinese,
                    bbq: message.bbq,
                    pizza: message.pizza,
                    burgers: message.burgers,
                });
            }
        });


    }




    handleSubmitAdmin = (event) => {
        // event.preventDefault()
        const { history, } = this.props;

        const {
            email,
            fullname,
            password,
            confirmPassword,
            region,
            country,
            image,
            resturantName, subTitle, resturantDescription, chinese, bbq, pizza, burgers
        } = this.state;
        this.setState({
            loaderToggle: !this.state.loaderToggle
        })
        if (image == null || image.name === undefined) {
            // alert('please add Image')
            this.setState({
                error: true,loaderToggle: false,
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
                    )
                    this.setState({ url: downloadURL })

                    // .then(res => {

                    var userId = firebase.auth().currentUser.uid
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
                        chinese, bbq, pizza, burgers,
                        subTitle, resturantDescription, updateAt: new Date().toLocaleString(),
                    }
                    firebase
                        .database()
                        .ref("Resturant_Owner/" + userId)
                        .update(obj)
                        .then(() => {
                            this.setState({
                                loaderToggle: !this.state.loaderToggle,
                                openSnack: true,
                            })

                            setTimeout(
                                function () {
                                    history.push("/Dashboard");
                                },
                                2000
                            );
                        })
                        .catch((error) => {
                            // var errorCode = error.code;
                            var errorMessage = error.message;
                            console.error("Error writing document: ", `${error}`);
                            // alert(error);
                            this.setState({
                                message: errorMessage
                            })
                        });
                });
            // });

        }
    }

    progressUpdate = () => {
        const { email,
            fullname,
            password,
            confirmPassword,
            downloadURL,
            region,
            country,
            resturantName,
            subTitle,
            resturantDescription,
            chinese,
            bbq,
            pizza,
            burgers, } = this.state
        if (email !== null) {
            this.setState(prevState => {
                return { progressValue: prevState.progressValue + 9 }
            })
        }
        if (fullname !== null) {
            this.setState(prevState => {
                return { progressValue: prevState.progressValue + 9 }
            })
        }
        if (password !== null) {
            this.setState(prevState => {
                return { progressValue: prevState.progressValue + 9 }
            })
        }
        if (confirmPassword !== null) {
            this.setState(prevState => {
                return { progressValue: prevState.progressValue + 9 }
            })
        }
        if (downloadURL !== null) {
            this.setState(prevState => {
                return { progressValue: prevState.progressValue + 9 }
            })
        }
        if (region !== null) {
            this.setState(prevState => {
                return { progressValue: prevState.progressValue + 9 }
            })
        }
        if (country !== null) {
            this.setState(prevState => {
                return { progressValue: prevState.progressValue + 9 }
            })
        }
        if (resturantName !== null) {
            this.setState(prevState => {
                return { progressValue: prevState.progressValue + 9 }
            })
        }
        if (subTitle !== null) {
            this.setState(prevState => {
                return { progressValue: prevState.progressValue + 9 }
            })
        }
        if (resturantDescription !== null) {
            this.setState(prevState => {
                return { progressValue: prevState.progressValue + 9 }
            })
        }
        if (chinese === true) {
            this.setState(prevState => {
                return { progressValue: prevState.progressValue + 2.5 }
            })
        }
        if (bbq === true) {
            this.setState(prevState => {
                return { progressValue: prevState.progressValue + 2.5 }
            })
        }
        if (pizza === true) {
            this.setState(prevState => {
                return { progressValue: prevState.progressValue + 2.5 }
            })
        }
        if (burgers === true) {
            this.setState(prevState => {
                return { progressValue: prevState.progressValue + 2.5 }
            })
        }

    }



    render() {
        const { classes } = this.props
        // const { progressValue } = this.state
        // console.log(parseInt(progressValue))
        let activityFields = data()


        return (

            <MuiThemeProvider>
                <React.Fragment>
                    <AdminNavbar />
                    <div className={classes.root}>
                        <SideBar />
                        <main className={classes.appContent}>
                            {this.state.message && <Alert variant="filled" severity="error">
                                {this.state.message}
                            </Alert>}
                            <Grid container spacing={4}>
                                <Grid item lg={4} md={6} xl={4} xs={12}>
                                    <Paper elevation={3}
                                    >
                                        <CardContent>
                                            <div className={classes.details}>
                                                <div>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h6"
                                                        component='p'
                                                        
                                                    >
                                                        {this.state.resturantName}
                                                    </Typography>
                                                    <Typography
                                                        className={classes.locationText}
                                                        color="textSecondary"
                                                        variant="body1"
                                                    >
                                                        {this.state.region}<br /> {this.state.country}
                                                    </Typography>
                                                    <Typography
                                                        className={classes.dateText}
                                                        color="textSecondary"
                                                        variant="body1"
                                                        id="datetime"
                                                    >
                                                        {/* {moment().format('hh:mm A')} ({user.timezone}) */}
                                                        {this.state.time}
                                                    </Typography>
                                                </div>
                                                <Avatar
                                                    className={classes.avatar}
                                                    src={this.state.downloadURL}
                                                />
                                            </div>
                                            <div className={classes.progress}>
                                                <Typography variant="body1">Profile Completeness: {this.state.progressValue}%</Typography>
                                                <LinearProgress
                                                    value={this.state.progressValue}
                                                    variant="determinate"
                                                />
                                            </div>
                                        </CardContent>
                                        <Divider />
                                        {/* <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button
                                                className={classes.uploadButton}
                                                color="primary"
                                                variant="text"
                                            >
                                                Update Cover Picture
        </Button>
                                            <Button variant="text">Remove picture</Button>
                                            {this.state.error ? <span style={{ color: 'red' }}>Please Add Image</span> : null}
                                        </CardActions> */}
                                    </Paper>
                                </Grid>
                                <Grid item lg={8} md={6} xl={8} xs={12}>
                                    <Paper elevation={3}

                                    >
                                        <form
                                            autoComplete="off"
                                            noValidate
                                        >
                                            <CardHeader
                                                subheader="The information can be edited"
                                                title="Profile"
                                            />
                                            <Divider />
                                            <CardContent>
                                                <Grid
                                                    container
                                                    spacing={3}
                                                >
                                                    <Grid
                                                        item
                                                        md={6}
                                                        xs={12}
                                                    >
                                                        <TextField
                                                            required
                                                            name="fullname"
                                                            label="Full Name"
                                                            type="text"
                                                            margin="dense"
                                                            value={this.state.fullname || ''}
                                                            fullWidth
                                                            autoComplete="fname"
                                                            onChange={this.handleChange}
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        md={6}
                                                        xs={12}
                                                    >
                                                        <TextField
                                                            disabled
                                                            required
                                                            id="email"
                                                            name="email"
                                                            label="Email"
                                                            type="email"
                                                            margin="dense"
                                                            value={this.state.email || ''}
                                                            onChange={this.handleChange}
                                                            fullWidth
                                                            autoComplete=""
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        md={6}
                                                        xs={12}
                                                    >
                                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                                        <Input
                                                            disabled
                                                            id="standard-password"
                                                            name="password"
                                                            fullWidth
                                                            type={this.state.showPassword ? 'text' : 'password'}
                                                            value={this.state.password || ''}
                                                            onChange={this.handleChange}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={this.handleClickShowPassword}
                                                                        onMouseDown={this.handleMouseDownPassword}
                                                                    >
                                                                        {/* {this.state.showPassword ? <Visibility /> : <VisibilityOff />} */}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        md={6}
                                                        xs={12}
                                                    >
                                                        <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                                                        <Input
                                                            disabled
                                                            id="standard-adornment-password"
                                                            name="confirmPassword"
                                                            fullWidth
                                                            type={this.state.showPassword ? 'text' : 'password'}
                                                            value={this.state.confirmPassword || ''}
                                                            onChange={this.handleChange}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={this.handleClickShowPassword}
                                                                        onMouseDown={this.handleMouseDownPassword}
                                                                    >
                                                                        {/* {this.state.showPassword ? <Visibility /> : <VisibilityOff />} */}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        md={6}
                                                        xs={12}
                                                    >
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
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        md={6}
                                                        xs={12}
                                                    >
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
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        md={6}
                                                        xs={12}
                                                    >
                                                        <TextField
                                                          disabled
                                                            required
                                                            id="restName"
                                                            name="resturantName"
                                                            label="Resturant Name"
                                                            type="text"
                                                            value={this.state.resturantName || ''}
                                                            onChange={this.handleChange}
                                                            fullWidth
                                                            autoComplete=""
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        md={6}
                                                        xs={12}
                                                    >
                                                        <TextField
                                                            required
                                                            id="subTitle"
                                                            name="subTitle"
                                                            label="Subtitle / Slogan"
                                                            multiline
                                                            type="text"
                                                            value={this.state.subTitle || ''}
                                                            onChange={this.handleChange}
                                                            fullWidth
                                                            autoComplete=""
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        md={6}
                                                        xs={12}
                                                    >
                                                        <TextField
                                                            required
                                                            id="resturantDescription"
                                                            name="resturantDescription"
                                                            label="Resturant Description"
                                                            multiline
                                                            type="text"
                                                            value={this.state.resturantDescription || ''}
                                                            onChange={this.handleChange}
                                                            fullWidth
                                                            autoComplete=""
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        md={6}
                                                        xs={12}
                                                    >
                                                        <TextField
                                                            id="address2"
                                                            name={this.state.image && this.state.image.name}
                                                            label="Upload Cover Picture"
                                                            type="file"

                                                            onChange={this.handleChangeCertificate}
                                                            helperText={this.state.error ? <span style={{ color: 'red' }}>Please Add Image</span> : null}
                                                            fullWidth

                                                        />
                                                          {/* {this.state.image === null && this.state.error ? <FormHelperText style={{ color: 'red' }}>Please Add Image</FormHelperText> : null} */}
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        md={12}
                                                        xs={12}
                                                    ><Typography
                                                        variant="h6"
                                                        component="h2"
                                                    // style={{ textAlign: "center" }}
                                                    >
                                                            Food Category:
                                                </Typography>
                                                        <FormGroup row>

                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        value={this.state.chinese || ''}
                                                                        name="chinese"
                                                                        color="primary"
                                                                        checked={this.state.chinese || ''}
                                                                        onChange={this.handleCheck}
                                                                    />
                                                                }
                                                                label="Chinese"
                                                            />
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        value={this.state.bbq || ''}
                                                                        name="bbq"
                                                                        color="primary"
                                                                        checked={this.state.bbq || ''}
                                                                        onChange={this.handleCheck}
                                                                    />
                                                                }
                                                                label="B.B.Q"
                                                            />
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        value={this.state.pizza || ''}
                                                                        name="pizza"
                                                                        color="primary"
                                                                        checked={this.state.pizza || ''}
                                                                        onChange={this.handleCheck}
                                                                    />
                                                                }
                                                                label="Pizza"
                                                            />
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        value={this.state.burgers || ''}
                                                                        name="burgers"
                                                                        color="primary"
                                                                        checked={this.state.burgers || ''}
                                                                        onChange={this.handleCheck}
                                                                    />
                                                                }
                                                                label="Burgers"
                                                            />



                                                        </FormGroup>
                                                    </Grid>


                                                </Grid>
                                            </CardContent>
                                            <Divider />
                                            <CardActions>
                                                <Button
                                                    // value="Submit"
                                                    variant="outlined"
                                                    color="primary"
                                                                        disabled={this.state.loaderToggle ? true : false}
                                                    className={classes.button}
                                                    onClick={() => this.handleSubmitAdmin()}
                                                >
                                                    Update
                      </Button>
                                                {this.state.loaderToggle && <CircularProgress />}
                                            </CardActions>

                                        </form>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </main>
                        <Snackbar
                            open={this.state.openSnack} autoHideDuration={1500} onClose={() => this.setState({ openSnack: false })} >
                            <Alert  variant="filled" severity="success">User Update Successfully</Alert>
                        </Snackbar>
                    </div>
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

Profile.protoTypes = {
    callback: PropTypes.func
};

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        store_user: (userlogin) => dispatch(update_user_Resturant(userlogin)),
        logout_user: () => dispatch(remove_user_Resturant()),
    }
}
// export default withStyles(styles)(Login);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile)));
