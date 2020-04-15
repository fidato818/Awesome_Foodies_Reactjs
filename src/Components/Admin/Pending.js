import React from "react";
import {
  Typography,

  Button,
  // Paper,
  // Container,
  // CircularProgress,
  // TableRow,
  // TableHead,
  // TableCell,
  // TableBody,
  // Table,
  Grid, Card, CardActions, CardContent,
  // TablePagination, 
  TextField,
} from "@material-ui/core";
import { Flipper, Flipped } from 'react-flip-toolkit';
import { update_user_Resturant, remove_user_Resturant, addToCart, removeTOCart, } from '../../store/action';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import SideBar from "../../config/Sidebar";
import AdminNavbar from "../../config/adminNavbar";
import firebase from "../../config/Firebase";

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
    minWidth: 700,


  },
  content: {
    backgroundColor: 'teal'
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
  toolbar: theme.mixins.toolbar
});
class Pending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      cartArr: [],
      items: "", mobileOpen: false,
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

  handleChange = (event, value) => {
    this.setitemName({ value });
  };

  handleChangeIndex = index => {
    this.setitemName({ value: index });
  };

  /*************************************************/
  search = (e) => {
    const { arr } = this.state;
    const textSearch = e.target.value;
    console.log(textSearch)
    const result = arr.filter(elem => {
      // return elem.name.substring(0, textSearch.length).toUpperCase() == textSearch.toUpperCase()
      // return elem.userEmail.toLowerCase().indexOf(textSearch) >= 0;
      return elem.userEmail.toLowerCase().indexOf(textSearch) >= 0;
      // console.log(elem.userEmail)

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

  getMyStory = () => {
    this.firebaseRef = firebase.database().ref(`Order/`);
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

  processItem = (id, name, price, quantity, userId, userEmail) => {
    // console.log("Remove succeeded.", userId);
    const { match: { params }
    } = this.props;
    var resturantId = params.id
    const itemRef = firebase.database().ref('OrderRecieve/' + userId + '/' + params.id + '/' + id)
    itemRef
      .update({
        id,
        name,
        price,
        quantity,
        userId,
        userEmail, status: "Order in Process", date: new Date().toLocaleString(), resturantId
      })
      .then(function () {
        // alert("order inprocess success");
      })
    firebase
      .database().ref('Order/' + userId + '/' + params.id + '/' + id)
      .remove()
      .then(function () {
        console.log("Remove succeeded.");
      })
      .catch(function (error) {
        console.log("Remove failed: " + error.message);
      });
  }
  /*************************************************/


  render() {

    const { classes, user } = this.props;
    const { arr,
      //  rowsPerPage, page, 
      textSearch, result, } = this.state;
    // const { cartArr } = this.state
     const loginResturantData = arr.filter((item) => item.resturantId === user.userResturant.user.uid);
   console.log(loginResturantData)
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
                    Nothing Any Order Add in Pending

                        </Typography>
                </div>


              ) : (

                  <div>
                    <h1 style={{ textAlign: 'center', paddingTop: 10, marginTop: 10 }}>Pending Orders
                    </h1>
                    <TextField
                      id="standard-full-width"
                      label="Search By Customer Name"
                      style={{ marginRight: 7, }}
                      placeholder="Adnan Ahmed, M. Azeem..."
                      helperText=""
                      onChange={this.search.bind(this)}
                      fullWidth
                      margin="normal"
                    />

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
                  {asd.map((elem, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      key={index + 1}
                    >


                      <Flipped key={elem.userEmail} flipId={elem.userEmail} id={elem.userEmail}>
                                        
                        {elem.resturantId === user.userResturant.user.uid &&
                          <Card index={index + 1}  class='card' style={{ height: '35vh', }} id={elem.id} >
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
                            <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                fullwidth
                                className={classes.margin}
                                onClick={() =>
                                  this.processItem(
                                    elem.id, elem.name, elem.price,
                                    elem.quantity, elem.userId, elem.userEmail
                                  )
                                }
                              >
                                Process Order
                                        </Button>
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
      </MuiThemeProvider >
    );
  }
}
Pending.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

// export default withStyles(styles, { withTheme: true })(Pending);
const mapStateToProps = state => {
   console.log('state', state)
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {

  return {
    store_user: (userlogin) => dispatch(update_user_Resturant(userlogin)),
    addFoodInCart: (userlogin) => dispatch(addToCart(userlogin)),
    removeFoodInCart: (userlogin) => dispatch(removeTOCart(userlogin)),
    logout_user: () => dispatch(remove_user_Resturant()),
  }
}
// export default withStyles(styles)(Login);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Pending)));




