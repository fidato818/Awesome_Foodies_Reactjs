import React from "react";
import { LinearProgress, DialogTitle, DialogActions, InputLabel, MenuItem, Select, Slide, Card, CardActions, CardContent, Grid, Typography, TextField, Button, Dialog, DialogContent, } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import firebase from "../../config/Firebase";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AdminNavbar from "../../config/adminNavbar";
import "typeface-roboto";
import PropTypes from "prop-types";
// import landingPageData from "../landingPageData";
import { update_user_Resturant, remove_user_Resturant } from '../../store/action';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import SideBar from "../../config/Sidebar";
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
        // marginTop: theme.spacing(13),
        // marginBottom: theme.spacing(4),
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
    appContent: theme.mixins.gutters({
        backgroundColor: '#e0e0e0',
        flex: "1 1 100%", // https://github.com/philipwalton/flexbugs#flexbug-17
        maxWidth: "100%", // https://github.com/philipwalton/flexbugs#flexbug-17
        paddingTop: 80,
        margin: "0 auto",

        [theme.breakpoints.up("lg")]: {
            maxWidth: theme.breakpoints.values.lg
        }
    }),
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
    },
});


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
class AddandEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            scroll: 'paper',
            foodName: '',
            foodCategory: 'Pizza',
            foodDescription: '',
            foodPrice: '',
            arr: [],
            currentUser: '',
            currentUserInLocal: '',
            onTog: false,
            loading: false,
            tg: false

        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClickOpen = (scrollType) => {
        this.setState({
            open: true,
            scroll: scrollType,
            foodName: "",
            foodCategory: "",
            foodDescription: "",
            foodPrice: "",
            tg: false,

        });

    };
    handleClick = (scrollType, id, c) => {
        this.setState({ onTog: true, scroll: scrollType, foodID: id, foodname: c });
        console.log(c)
    };

    handleClose = () => {
        this.setState({ open: false, onTog: false, });
    };

    async componentDidMount() {
        /* Cause your component to request data from Firebase when
           component first mounted */
        await this.getData();
        // this.authListener();

        const user = JSON.parse(localStorage.getItem('authUser'));
        this.setState({ currentUserInLocal: user });


    }


    addFood = () => {
        const { foodName,
            foodCategory,
            foodDescription,
            foodPrice } = this.state

        var currentUserId = firebase.auth().currentUser.uid
        var newPostKey = firebase.database().ref().child('foodData').push().key;
        this.setState({
            loading: true
        });
        var database = firebase.database()
        var obj = {
            foodName,
            foodCategory,
            foodDescription,
            foodPrice, currentUserId, newPostKey
        }
        database.ref("foodData/" + currentUserId + "/" + newPostKey).set(obj).then((success) => {
            this.setState({

                foodName: "",
                foodCategory: "",
                foodDescription: "",
                foodPrice: "",
                loading: false,
                open: false, onTog: false,
            })

        }).catch((e) => {
            console.log('Error: ', e)
        })

    }



    getData() {
        const { user } = this.props

        // var messagesRef = firebase.database().ref('foodData').orderByChild('currentUserId')
        var messagesRef = firebase.database().ref('foodData/' + user.userResturant.user.uid)


        messagesRef.on("value", snapshot => {
            /* Update React itemName when message is added at Firebase Database */
            let message = snapshot.val();

            let newArr = [];
            for (let word in message) {

                newArr.push({
                    foodName: message[word].foodName,
                    foodCategory: message[word].foodCategory,
                    foodDescription: message[word].foodDescription,
                    foodPrice: message[word].foodPrice,
                    currentUserId: message[word].currentUserId,
                    newPostKey: message[word].newPostKey

                });
            }
            this.setState({ arr: newArr });
        });
    }

    deleteFoodItem = (id) => {
        const { foodID } = this.state
        const { user } = this.props
        this.setState({ loading: true });

        firebase.database().ref('foodData/' + user.userResturant.user.uid + '/' + foodID).remove().then(() => {

            this.setState({ open: false, onTog: false, loading: false });
        }).catch((error) => {
            console.log('Error: ', error)
        })
    }

    editData = () => {
        const { foodName,
            foodCategory,
            foodDescription,
            foodPrice, newPostKey } = this.state
        const { user } = this.props
        this.setState({
            loading: true
        });
        var database = firebase.database()
        var obj = {
            foodName,
            foodCategory,
            foodDescription,
            foodPrice, newPostKey
        }
        database.ref('foodData/' + user.userResturant.user.uid + '/' + newPostKey).update(obj).then((success) => {
            this.setState({
                foodName: "",
                foodCategory: "",
                foodDescription: "",
                foodPrice: "",
                loading: false,
                open: false, onTog: false,
            })

        }).catch((e) => {
            console.log('Error: ', e)
        })
    }
    handleClickUpdateData = (scrollType, fName, fCategory, fDescription, fPrice, newPostKey) => {
        this.setState({
            open: true,
            scroll: scrollType,
            foodName: fName,
            foodCategory: fCategory,
            foodDescription: fDescription,
            foodPrice: fPrice,
            newPostKey: newPostKey,
            tg: true
        });

    };

    render() {
        const { classes, user } = this.props
        const { arr, tg } = this.state   
        console.log(user.userResturant)
        return (

            <MuiThemeProvider>
                <React.Fragment>

                    <AdminNavbar />
                    <div className={classes.root}>
                        <SideBar />

                        <main className={classes.appContent}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography component="h1" variant="h5" style={{ fontSize: 30 }}>
                                    <b>{user.userResturant.user.displayName || user.userResturant.user.email}'s</b> Food Items
                        </Typography>
                                <div style={{ justifyContent: 'flex-end' }}>
                                    {/* <Button
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        style={{ marginRight: 5 }}
                                    >
                                        Edit Cover Photo
                        </Button> */}
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color="primary"

                                        onClick={() => this.handleClickOpen('paper')}>
                                        Add Food
                        </Button>
                                </div>


                            </div>
                            <div>
                                <br />
                                <div >
                                    <Grid
                                        container
                                        spacing={2}
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="flex-start"
                                    >
                                        {arr.map(image => (
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                key={image.newPostKey}
                                            >
                                                { <Card>
                                                    <CardContent>
                                                        <Typography variant="h5" component="h2">
                                                            Food Name: {image.foodName}
                                                        </Typography>
                                                        <Typography className={classes.title} color="textSecondary" >
                                                            Food Category: {image.foodCategory}
                                                        </Typography>
                                                        <Typography className={classes.pos} color="textSecondary" >
                                                            Description: {image.foodDescription}
                                                        </Typography>
                                                        <Typography variant="body2" component="p" style={{ textAlign: 'right' }}>
                                                            Food Price: <b> Rs. {image.foodPrice}/- </b>
                                                            <br />

                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Button size="small" variant="outlined" onClick={() => this.handleClickUpdateData('paper', image.foodName, image.foodCategory, image.foodDescription, image.foodPrice, image.newPostKey)} color="primary">Edit</Button>
                                                        <Button size="small" variant="outlined" onClick={() => this.handleClick('body', image.newPostKey, image.foodName)} color="secondary">Delete</Button>
                                                    </CardActions>
                                                </Card>}
                                                <div>
                                                    <Dialog
                                                        open={this.state.onTog}
                                                        onClose={this.handleClose}
                                                        scroll={this.state.scroll}
                                                        aria-labelledby="form-dialog-title"
                                                        aria-describedby="scroll-dialog-description"
                                                        TransitionComponent={Transition}
                                                        keepMounted
                                                    >
                                                        {this.state.loading && <LinearProgress />}
                                                        <DialogTitle id="form-dialog-title">818' The Foodist
</DialogTitle>
                                                        <DialogContent dividers={this.state.scroll === 'body'}>
                                                            <Typography component="h1" variant="h5">
                                                                Are your sure want to Delete  {this.state.foodname} ?
                                    </Typography>

                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={this.handleClose} color="primary" variant="outlined">
                                                                Cancel
          </Button>
                                                            <Button onClick={() => this.deleteFoodItem(image.newPostKey)} color="secondary" variant="outlined">
                                                                Delete
                                                    </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </div>
                                            </Grid>

                                        ))}
                                    </Grid>
                                </div>
                            </div>
                            <div>
                                <Dialog
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    scroll={this.state.scroll}
                                    aria-labelledby="scroll-dialog-title"
                                    aria-describedby="scroll-dialog-description"
                                    TransitionComponent={Transition}
                                    keepMounted
                                >
                                    {this.state.loading && <LinearProgress />}
                                    <DialogContent dividers={this.state.scroll === 'paper'}>

                                        <Typography component="h1" variant="h5">
                                            {tg === false ? 'Add Food Item' : 'Update Food Item'}
                                        </Typography>
                                        <form

                                            className={classes.form}
                                        >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        name="foodName"
                                                        label="Food Name"
                                                        type="text"
                                                        value={this.state.foodName}
                                                        fullWidth
                                                        autoComplete=""
                                                        onChange={this.handleChange}
                                                    />

                                                </Grid>
                                                <Grid item xs={12}>
                                                    <InputLabel id="demo-simple-select-label">Food Category</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        name="foodCategory"
                                                        value={this.state.foodCategory}
                                                        fullWidth
                                                        onChange={this.handleChange}
                                                    >
                                                        <MenuItem value={'B.B.Q'}>B.B.Q</MenuItem>
                                                        <MenuItem value={'Pizza'}>Pizza</MenuItem>
                                                        <MenuItem value={'Burgers'}>Burgers</MenuItem>
                                                        <MenuItem value={'Chinese'}>Chinese</MenuItem>
                                                    </Select>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        multiline
                                                        rows="4"
                                                        name="foodDescription"
                                                        label="Food Description"
                                                        value={this.state.foodDescription}
                                                        type="text"
                                                        fullWidth
                                                        autoComplete=""
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        name="foodPrice"
                                                        label="Price"
                                                        value={this.state.foodPrice}
                                                        type="number"

                                                        fullWidth
                                                        autoComplete=""
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>

                                            </Grid>
                                            {tg === false ? (<Button

                                                fullWidth
                                                variant="outlined"
                                                color="primary"
                                                className={classes.submit}
                                                onClick={() => this.addFood()}
                                            >
                                                Add Food
                </Button>) : (
                                                    <Button

                                                        fullWidth
                                                        variant="outlined"
                                                        color="primary"
                                                        className={classes.submit}
                                                        onClick={() => this.editData()}
                                                    >
                                                        Update Food
                                                     </Button>)}
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </main>
                    </div>
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

AddandEdit.protoTypes = {
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddandEdit)));
