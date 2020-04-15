import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import clsx from 'clsx';
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { update_user_Resturant, remove_user_Resturant, } from '../../store/action';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import LoopIcon from "@material-ui/icons/Loop";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import {
  Typography,
  // CircularProgress,
  Card,
  CardContent,
  // CssBaseline,
  // Container,
  Grid, Avatar,
} from "@material-ui/core";
import firebase from "../../config/Firebase";
// import { Snackbar } from "material-ui";
import SideBar from "../../config/Sidebar";
import AdminNavbar from '../../config/adminNavbar'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}
const drawerWidth = 240;
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    // marginLeft: theme.spacing(30),
    // // width: 500
    display: "flex",
    minHeight: "100vh",
    zIndex: 1,
    // position: "relative",
    overflow: "hidden",
    backgroundColor: theme.palette.background.default
  }, // display: "flex",
  // marginTop: theme.spacing(3),

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
  avatar: {
    backgroundColor: " rgba(0, 0, 0, 0.54)",
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32,
    // color: " rgba(0, 0, 0, 0.54)"
  },
  difference: {
    marginTop: theme.spacing(5),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
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

  roots: {
    // marginTop: 30,
    // marginBottom: "130px",
    display: "flex",
    marginLeft: 20,
    marginRight: 20,
    fontFamily: "Roboto",
    flexWrap: "wrap",
    justifyContent: "center",
    // overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  // appContent: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3)
  // },
  drawer: {
    width: drawerWidth
  },
  // Styles for the `Paper` component rendered by `Drawer`.
  drawerPaper: {
    width: "inherit",
    paddingTop: 64 // equal to AppBar height
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
  toolbar: theme.mixins.toolbar
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
      mobileOpen: false,
      arrPending: [],
      arrProcess: [],
      arrDelivered: [],
      arrFoodData: []
    };
  }

  componentDidMount() {
    this.getPendingData();
    this.getProcessData();
    this.getDeliveredData();
    this.getFoodData();
  }

  getPendingData = () => {
    this.firebaseRef = firebase.database().ref("Order/");
    this.firebaseRef.on("value", snapshot => {
      let message = snapshot.val();
      let newArr = [];
      for (let word in message) {
        for (let word1 in message[word]) {
          for (let word2 in message[word][word1]) {
            newArr.push({
              id: message[word][word1][word2].id,
              name: message[word][word1][word2].name,
              category: message[word][word1][word2].category,
              price: message[word][word1][word2].price,
              quantity: message[word][word1][word2].quantity,
              date: message[word][word1][word2].date,
              status: message[word][word1][word2].status,
              userId: message[word][word1][word2].userId,
              userEmail: message[word][word1][word2].userEmail,
              resturantId: message[word][word1][word2].resturantId,
            });
          }
        }
      }
      this.setState({
        arrPending: newArr
      })
    });
  }

  getProcessData = () => {
    this.firebaseRef = firebase.database().ref("OrderRecieve/");
    this.firebaseRef.on("value", snapshot => {
      let message = snapshot.val();
      let newArr = [];
      for (let word in message) {
        for (let word1 in message[word]) {
          for (let word2 in message[word][word1]) {
            newArr.push({
              id: message[word][word1][word2].id,
              name: message[word][word1][word2].name,
              category: message[word][word1][word2].category,
              price: message[word][word1][word2].price,
              quantity: message[word][word1][word2].quantity,
              date: message[word][word1][word2].date,
              status: message[word][word1][word2].status,
              userId: message[word][word1][word2].userId,
              userEmail: message[word][word1][word2].userEmail,
              resturantId: message[word][word1][word2].resturantId,
            });
          }
        }
      }
      this.setState({
        arrProcess: newArr
      })
    });
  }

  getDeliveredData = () => {
    this.firebaseRef = firebase.database().ref("OrderDelivered/");
    this.firebaseRef.on("value", snapshot => {
      let message = snapshot.val();
      let newArr = [];
      for (let word in message) {
        for (let word1 in message[word]) {
          for (let word2 in message[word][word1]) {
            newArr.push({
              id: message[word][word1][word2].id,
              name: message[word][word1][word2].name,
              category: message[word][word1][word2].category,
              price: message[word][word1][word2].price,
              quantity: message[word][word1][word2].quantity,
              date: message[word][word1][word2].date,
              status: message[word][word1][word2].status,
              userId: message[word][word1][word2].userId,
              userEmail: message[word][word1][word2].userEmail,
              resturantId: message[word][word1][word2].resturantId,
            });
          }
        }
      }
      this.setState({
        arrDelivered: newArr
      })
    });
  }
  getFoodData = () => {
    const { user } = this.props
    this.firebaseRef = firebase.database().ref("foodData/" + user.userResturant.user.uid);
    this.firebaseRef.on('value', (snapshot) => {
      var newArr = []
      snapshot.forEach((data) => {
        var childData = data.val();
        newArr.push(childData)
      });
      this.setState({
        arrFoodData: newArr
      });
    })

  }


  render() {
    const { classes, user,
      theme, className, ...rest
    } = this.props;
    const { arrPending, arrProcess, arrDelivered, arrFoodData } = this.state;
    const arrPendingLength = arrPending.filter((asd) => asd.resturantId === user.userResturant.user.uid)
    const arrProcessLength = arrProcess.filter((asd) => asd.resturantId === user.userResturant.user.uid)
    const arrDeliveredLength = arrDelivered.filter((asd) => asd.resturantId === user.userResturant.user.uid)
    // console.log(arrPending)
    if (!user)
    return <Redirect to="/Login" />
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AdminNavbar />
          <div className={classes.root}>
            <SideBar />
            <main className={classes.appContent}>
              <div style={{ display: 'flex' }}>
                <Grid container
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start">
                  <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <Card
                      {...rest}
                      className={clsx(classes.detailCards, className)}
                      style={{ backgroundColor: "rgb(216, 91, 82)", color: 'white', marginRight: 10 }}
                    >
                      <CardContent>
                        <Grid
                          container
                          justify="space-between"
                        >
                          <Grid item>
                            <Typography
                              className={classes.cardtitle}
                              // color="textSecondary"
                              gutterBottom
                              variant="body2"
                            >
                              Pending Orders
            </Typography>
                            <Typography variant="h5">{arrPendingLength.length ? arrPendingLength.length : 0}</Typography>
                          </Grid>
                          <Grid item>
                            <Avatar className={classes.avatar}>
                              <AccessTimeOutlinedIcon className={classes.icon} />
                            </Avatar>
                          </Grid>
                        </Grid>
                        <div className={classes.difference}>
                          {/* <ArrowDownwardIcon className={classes.differenceIcon} />
                          <Typography
                            className={classes.differenceValue}
                            variant="body2"
                          >
                            12%
          </Typography>
                          <Typography
                            className={classes.caption}
                            variant="caption"
                          >
                            Since last month
          </Typography> */}
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                  {/* </Grid> */}
                  <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <Card
                      {...rest}
                      className={clsx(classes.detailCards, className)}
                      style={{ backgroundColor: "rgb(86, 135, 146)", color: 'white', marginRight: 10 }}
                    >
                      <CardContent>
                        <Grid
                          container
                          justify="space-between"
                        >
                          <Grid item>
                            <Typography
                              className={classes.cardtitle}
                              // color="textSecondary"
                              gutterBottom
                              variant="body2"
                            >
                              Process Orders
            </Typography>
                            <Typography variant="h5">{arrProcessLength.length ? arrProcessLength.length : 0}</Typography>
                          </Grid>
                          <Grid item>
                            <Avatar className={classes.avatar}>
                              <LoopIcon className={classes.icon} />
                            </Avatar>
                          </Grid>
                        </Grid>
                        <div className={classes.difference}>
                          {/* <ArrowDownwardIcon className={classes.differenceIcon} />
                          <Typography
                            className={classes.differenceValue}
                            variant="body2"
                          >
                            12%
          </Typography>
                          <Typography
                            className={classes.caption}
                            variant="caption"
                          >
                            Since last month
          </Typography> */}
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <Card
                      {...rest}
                      className={clsx(classes.detailCards, className)}
                      style={{ backgroundColor: "rgb(53, 165, 93)", color: 'white', marginRight: 10 }}
                    >
                      <CardContent>
                        <Grid
                          container
                          justify="space-between"
                        >
                          <Grid item>
                            <Typography
                              className={classes.cardtitle}
                              // color="textSecondary"
                              gutterBottom
                              variant="body2"
                            >
                              Delivered Orders
            </Typography>
                            <Typography variant="h5">{arrDeliveredLength.length ? arrDeliveredLength.length : 0}</Typography>
                          </Grid>
                          <Grid item>
                            <Avatar className={classes.avatar}>
                              <CheckCircleOutlinedIcon className={classes.icon} />
                            </Avatar>
                          </Grid>
                        </Grid>
                        <div className={classes.difference}>
                          {/* <ArrowDownwardIcon className={classes.differenceIcon} />
                          <Typography
                            className={classes.differenceValue}
                            variant="body2"
                          >
                            12%
          </Typography>
                          <Typography
                            className={classes.caption}
                            variant="caption"
                          >
                            Since last month
          </Typography> */}
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <Card
                      {...rest}
                      className={clsx(classes.detailCards, className)}
                      style={{ backgroundColor: "rgb(87, 103, 193)", color: 'white', marginRight: 10 }}
                    >
                      <CardContent>
                        <Grid
                          container
                          justify="space-between"
                        >
                          <Grid item>
                            <Typography
                              className={classes.cardtitle}
                              // color="textSecondary"
                              gutterBottom
                              variant="body2"
                            >
                              Food Items
            </Typography>
                            <Typography variant="h5">{arrFoodData ? arrFoodData.length : 0}</Typography>
                          </Grid>
                          <Grid item>
                            <Avatar className={classes.avatar}>
                              <FastfoodIcon className={classes.icon} />
                            </Avatar>
                          </Grid>
                        </Grid>
                        <div className={classes.difference}>
                          {/* <ArrowDownwardIcon className={classes.differenceIcon} />
                          <Typography
                            className={classes.differenceValue}
                            variant="body2"
                          >
                            12%
          </Typography>
                          <Typography
                            className={classes.caption}
                            variant="caption"
                          >
                            Since last month
          </Typography> */}
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </div>

            </main>
          </div>
        </React.Fragment>
      </MuiThemeProvider >
    );
  }
}
MyRequests.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};



// export default withStyles(styles, { withTheme: true })(Pending);
const mapStateToProps = state => {

  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    store_user: (userlogin) => dispatch(update_user_Resturant(userlogin)),
    logout_user: () => dispatch(remove_user_Resturant()),
  }
}
// export default withStyles(styles)(Login);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(MyRequests)))
