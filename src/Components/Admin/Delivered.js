import React from "react";
import Typography from "@material-ui/core/Typography";
import {
  // Table,
  // TableHead,
  // TableCell,
  // TableRow, 
  TextField,
  // TableBody, Paper, TablePagination,
  Grid, Card, CardActions, CardContent,
} from "@material-ui/core";
import { Flipper, Flipped } from 'react-flip-toolkit';
import SideBar from "../../config/Sidebar";
import AdminNavbar from "../../config/adminNavbar";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { update_user_Resturant, remove_user_Resturant } from '../../store/action';
import firebase from "../../config/Firebase";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

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
    flexGrow: 1
  },
  paper: {
    // marginTop: theme.spacing(13),
    // marginBottom: theme.spacing(4),
    // marginLeft: theme.spacing(20),
    // marginRight: theme.spacing(20),
    // margin: theme.spacing(10),
    padding: theme.spacing(0),

    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      // marginTop: theme.spacing(13),
      // marginBottom: theme.spacing(6),
      // padding: theme.spacing(3)
    }
  },

  asd: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  chip: {
    marginRight: theme.spacing(1)
  },
  circle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  },
  table: {
    minWidth: 900,


  },
  content: {
    backgroundColor: 'teal'
  },
  margin: {
    marginRight: 10
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
});
class Delivered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      items: "",
      page: 0,
      rowsPerPage: 5
    };
  }
  /*************************************************/
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  /*************************************************/

  /*************************************************/
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  /*************************************************/
  /*************************************************/
  search = (e) => {
    const { arr } = this.state;
    const textSearch = e.target.value;
    console.log(textSearch)
    const result = arr.filter(elem => {
      // return elem.name.substring(0, textSearch.length).toUpperCase() == textSearch.toUpperCase()
      return elem.userEmail.toLowerCase().indexOf(textSearch) >= 0;
      // console.log(elem)

    });
    this.setState({
      result,
      textSearch
    });
    console.log(result)
  }
  /*************************************************/
  componentDidMount() {
    this.getMyStory();
  }
  /*************************************************/

  getMyStory = () => {
    this.firebaseRef = firebase.database().ref("OrderDelivered");
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
      this.setState({ arr: newArr });
    });
  }


  deliveredItem = (id, name, price, quantity, userId, userEmail) => {
    const { match: { params }
    } = this.props;
    var resturantId = params.id
    const itemRef = firebase.database().ref('OrderDelivered/' + userId + '/' + params.id + '/' + id)
    itemRef
      .update({
        status: "Order Delivered"
      })
      .then(function () {
        // alert("order Delivered success");
      })
      .catch(function (error) {
        console.log("Remove failed: " + error.message);
      });
    firebase.database().ref('allOrders/' + id).set({
      id,
      name,
      price,
      quantity,
      userId,
      userEmail,
      status: "Order Delivered",
      date: new Date().toLocaleString(), resturantId
    })
  }

  deleteOrder = (id, name, price, quantity, userId, userEmail) => {
    const { match: { params }
    } = this.props;
    let messagesRef = firebase.database().ref('OrderDelivered/' + userId + '/' + params.id + '/' + id)
    messagesRef
      .remove()
      .then(function () {
        // alert("Order Transcation Delete Successfully");
        console.log("Remove succeeded.");
      })
      .catch(function (error) {
        console.log("Remove failed: " + error.message);
      });

  }

  render() {
    const { classes, user } = this.props;
    const { arr,
      // rowsPerPage, page, 
      textSearch, result, } = this.state;
    const loginResturantData = arr.filter((item) => item.resturantId === user.userResturant.user.uid);
    const asd = textSearch ? result : loginResturantData;
    // const emptyRows =
    //   rowsPerPage - Math.min(rowsPerPage, asd.length - page * rowsPerPage);

    return (
      <MuiThemeProvider>
        <React.Fragment>

          <AdminNavbar />
          <div className={classes.root}>
            <SideBar />

            <main className={classes.appContent}>

              {!asd ? (
                <div
                  style={{
                    // position: "absolute",
                    // left: "50%",
                    // top: "50%",
                    // transform: "translate(-50%, -50%)"
                    // display: 'flex',  
                    // alignItems:"center",
                    // justifyContent: 'center',
                    height: '80vh',
                  }}
                >
                  <Typography variant="h5" color="textSecondary">
                    Nothing Any Order Add in Delivered

                        </Typography>
                </div>
              ) : (
                  <div className={classes.roots}>
                    <h1 style={{ textAlign: 'center', paddingTop: 20, marginTop: 20 }}>Delivered Orders
                    </h1>
                    <TextField
                      id="standard-full-width"
                      label="Search By Customer Name"
                      style={{ marginRight: 7 }}
                      placeholder="Adnan Ahmed, M. Azeem..."
                      helperText=""
                      onChange={this.search.bind(this)}
                      fullWidth
                      margin="normal"
                    />
                    {/* <Paper className={classes.paper}>
                      <Table component={Paper} elevation={3} className={classes.table} aria-label="customized table" fixedHeader={false} style={{ tableLayout: "auto" }} >
                        <TableHead>
                          <TableRow>
                            <TableCell >S#</TableCell>
                            <TableCell >Order Name</TableCell>
                            <TableCell align="center" >Resturant Name</TableCell>
                            <TableCell align="center" >Categories</TableCell>
                            <TableCell align="center" >Order Status</TableCell>
                            <TableCell align="center" >Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {asd
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((e, index) => {
                              return (
                                e.resturantId === user.userResturant.user.uid ? (
                                  <TableRow index={index + 1} id={e.pushId}>
                                    <TableCell component="th" scope="row">
                                      {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                      {e.name}
                                    </TableCell>
                                    <TableCell align="center">{e.userEmail}</TableCell>
                                    <TableCell align="center">{e.date}</TableCell>
                                    <TableCell align="center">{e.quantity}</TableCell>
                                    <TableCell align="center">
                                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                        {e.status === "Delivered" ? (
                                          <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            className={classes.margin}
                                            onClick={() =>
                                              this.deliveredItem(
                                                e.id, e.name, e.price,
                                                e.quantity, e.userId, e.userEmail
                                              )
                                            }
                                          // onClick={() => this.rem(e.pushId)}
                                          >
                                            Delivered
                          </Button>
                                        ) : (
                                            <Button
                                              variant="contained"
                                              size="small"
                                              color="primary"
                                              className={classes.margin}
                                              disabled
                                              onClick={() =>
                                                this.deliveredItem(
                                                  e.id, e.name, e.price,
                                                  e.quantity, e.userId, e.userEmail
                                                )
                                              }
                                            // onClick={() => this.rem(e.pushId)}
                                            >
                                              Delivered
                          </Button>
                                          )}
                                        {e.status === "Order Delivered" ? (
                                          <Button
                                            variant="contained"
                                            size="small"
                                            color="secondary"
                                            className={classes.margin}
                                            onClick={() => this.deleteOrder(e.id, e.name, e.price,
                                              e.quantity, e.userId, e.userEmail)}
                                          // onClick={() => this.rem(e.pushId)}
                                          >
                                            Delete Order
                          </Button>
                                        ) : (
                                            <Button
                                              variant="contained"
                                              size="small"
                                              color="secondary"
                                              className={classes.margin}
                                              disabled
                                              onClick={() => this.deleteOrder(e.id, e.name, e.price,
                                                e.quantity, e.userId, e.userEmail)}
                                            // onClick={() => this.rem(e.pushId)}
                                            >
                                              Delete Order
                          </Button>
                                          )}
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ) : (

                                    <TableRow >
                                      <TableCell colSpan={6} rowSpan={5}> <Typography variant="h5" color="textSecondary" style={{ display: 'flex', justifyContent: 'center' }}>
                                        Nothing Any Order Add in My Orders
                                      </Typography></TableCell>
                                    </TableRow>)
                              );
                            })}

                          {emptyRows > 0 && (
                            <TableRow style={{ height: 49 * emptyRows }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                        <TablePagination
                          rowsPerPageOptions={[5, 10]}
                          // component="div"
                          count={arr.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onChangePage={this.handleChangePage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}

                        />




                      </Table>

                    </Paper> */}


                  </div>
                )}

              <Flipper flipKey={textSearch}>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  {asd.map((elem, i) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      key={i + 1}
                    >


                      <Flipped key={elem.userEmail} flipId={elem.userEmail} id={elem.userEmail}>
                        {/* <Card className={classes.card} style={{
                          backgroundColor: 'white',
                        }} > */}
                        {elem.resturantId === user.userResturant.user.uid && < Card class='card' style={{ height: '35vh', }} >
                          <CardContent>
                            <Typography variant="h6" component="h6" color="textSecondary" gutterBottom style={{ fontFamily: 'MyFont', }}>
                              {elem.name}
                            </Typography>
                            {/* <Typography variant="h5" component="h2" style={{ fontFamily: 'MyFont', }}>
                          Category: {image.foodCategory}
                        </Typography> */}
                            <Typography variant="body2" component="p" className={classes.pos} color="textSecondary" style={{ fontFamily: 'MyFont', }}>
                              User Email: {elem.userEmail}
                            </Typography>
                            <Typography variant="body2" component="p" style={{ textAlign: 'right', fontFamily: 'MyFont' }}>
                              Order Date: {elem.date}
                            </Typography>
                            <Typography variant="body2" component="p" style={{ textAlign: 'right', fontFamily: 'MyFont' }}>
                              Order Quantity: {elem.quantity}
                            </Typography>
                          </CardContent>
                          <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>

                            {elem.status === "Delivered" ? (
                              <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                // className={classes.margin}
                                onClick={() =>
                                  this.deliveredItem(
                                    elem.id, elem.name, elem.price,
                                    elem.quantity, elem.userId, elem.userEmail
                                  )
                                }
                              // onClick={() => this.rem(e.pushId)}
                              >
                                Delivered
                          </Button>
                            ) : (
                                <Button
                                  variant="contained"
                                  size="small"
                                  color="primary"
                                  // className={classes.margin}
                                  disabled
                                  onClick={() =>
                                    this.deliveredItem(
                                      elem.id, elem.name, elem.price,
                                      elem.quantity, elem.userId, elem.userEmail
                                    )
                                  }
                                // onClick={() => this.rem(e.pushId)}
                                >
                                  Delivered
                          </Button>
                              )}
                            {elem.status === "Order Delivered" ? (
                              <Button
                                variant="contained"
                                size="small"
                                color="secondary"
                                // className={classes.margin}
                                onClick={() => this.deleteOrder(elem.id, elem.name, elem.price,
                                  elem.quantity, elem.userId, elem.userEmail)}
                              // onClick={() => this.rem(e.pushId)}
                              >
                                Delete Item
                          </Button>
                            ) : (
                                <Button
                                  variant="contained"
                                  size="small"
                                  color="secondary"
                                  // className={classes.margin}
                                  disabled
                                  onClick={() => this.deleteOrder(elem.id, elem.name, elem.price,
                                    elem.quantity, elem.userId, elem.userEmail)}
                                // onClick={() => this.rem(e.pushId)}
                                >
                                  Delete Item
                          </Button>
                              )}

                          </CardActions>
                        </Card>}
                      </Flipped>
                    </Grid>
                  ))}
                </Grid>
              </Flipper>
            </main>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}
Delivered.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

// export default withStyles(styles, { withTheme: true })(Delivered);
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Delivered)))
