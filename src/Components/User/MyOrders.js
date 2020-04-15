import React from "react";
import {
  Typography,
  Paper,
  Container,
  // CircularProgress,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  Chip,
  TablePagination,
} from "@material-ui/core";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import { update_user_Customer, remove_user_Customer, } from '../../store/action';
import { withStyles } from "@material-ui/core/styles";
import Navbar from "../../config/navbar";
import PropTypes from "prop-types";
import firebase from "../../config/Firebase";
// import Sidebar from "../../config/Sidebar";
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
    backgroundColor: theme.palette.background.paper,
    width: 500,
    marginLeft: 300
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
  }
});
class Pending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPending: [],
      arrProcess: [],
      arrDelivered: [],
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
  componentDidMount() {
    // const {arrPending, arrProcess, arrDelivered} = this.state
    this.props.user && this.getMyOrder();
    this.getMyOrderRecieve();
    this.getMyOrderDelivered();

    // Array.prototype.push.apply(arrPending, arrProcess, )
    // console.log(this.props)
  }


  getMyOrder = () => {
    const { match: { params }
    } = this.props;
    this.firebaseRef = firebase.database().ref("Order/" + params.id);
    this.firebaseRef.on('value', (snapshot) => {
      var newArr = []
      snapshot.forEach((data) => {
        var childData = data.val();
        for (let word in childData) {
          newArr.push({
            id: childData[word].id,
            name: childData[word].name,
            category: childData[word].category,
            price: childData[word].price,
            quantity: childData[word].quantity,
            date: childData[word].date,
            status: childData[word].status,
            userId: childData[word].userId,
            userEmail: childData[word].userEmail
          });
        }
      });
      this.setState({
        arrPending: newArr
      });
    })
  }
  getMyOrderRecieve = () => {
    const { match: { params }
    } = this.props;
    this.firebaseRef = firebase.database().ref("OrderRecieve/" + params.id);
    this.firebaseRef.on('value', (snapshot) => {
      var newArr = []
      snapshot.forEach((data) => {
        var childData = data.val();
        for (let word in childData) {
          newArr.push({
            id: childData[word].id,
            name: childData[word].name,
            category: childData[word].category,
            price: childData[word].price,
            quantity: childData[word].quantity,
            date: childData[word].date,
            status: childData[word].status,
            userId: childData[word].userId,
            userEmail: childData[word].userEmail
          });
        }
      });
      this.setState({
        arrProcess: newArr
      });
    })
  }
  getMyOrderDelivered = () => {
    const { match: { params }
    } = this.props;
    this.firebaseRef = firebase.database().ref("OrderDelivered/" + params.id);
    this.firebaseRef.on('value', (snapshot) => {
      var newArr = []
      snapshot.forEach((data) => {
        var childData = data.val();
        for (let word in childData) {
          newArr.push({
            id: childData[word].id,
            name: childData[word].name,
            category: childData[word].category,
            price: childData[word].price,
            quantity: childData[word].quantity,
            date: childData[word].date,
            status: childData[word].status,
            userId: childData[word].userId,
            userEmail: childData[word].userEmail
          });
        }
      });
      this.setState({
        arrDelivered: newArr
      });
    })
  }




  render() {

    const { classes } = this.props;
    const { rowsPerPage, page, arrPending, arrProcess, arrDelivered } = this.state;
    const array3 = [...arrPending, ...arrProcess, ...arrDelivered];
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, array3.length - page * rowsPerPage);
    // console.log(user.user.user.uid)
    return (
      <React.Fragment>
        <Navbar />
        {/* <div className={classes.root}> */}
        <br />
        <br />
        {/* <Sidebar /> */}
        {/* <main className={classes.content}> */}
        <Container maxWidth="md">

          {!array3.length ? (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
              }}
            >
              <Typography variant="h5" color="textSecondary">
                Nothing Any Order Add in My Orders

                        </Typography>
            </div>
          ) : (
              <div className={classes.roots}>
                <h1 style={{ textAlign: 'center', padding: 20, margin: 20 }}>My Orders
                    </h1>

                <Paper className={classes.paper} elevation={3}>


                  <Table className={classes.table} aria-label="customized table" fixedHeader={false} style={{ width: "auto", tableLayout: "auto" }}>
                    <TableHead style={{ margin: 30 }}>
                      <TableRow>
                        <TableCell >S#</TableCell>
                        <TableCell >Order Name</TableCell>
                        {/* <TableCell align="center" >Customer Name</TableCell> */}
                        <TableCell align="center" >Order Date</TableCell>
                        <TableCell align="center" >Quantity</TableCell>
                        <TableCell align="center" >Order Status </TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {array3
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((e, index) => {
                          return (
                            // e.userId === user.user.user.uid ? (
                            <TableRow index={index + 1} id={e.id}>
                              <TableCell component="th" scope="row">
                                {index + 1}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {e.name}
                              </TableCell>
                              {/* <TableCell align="center">
                                {e.currentUser}
                              </TableCell> */}
                              <TableCell align="center">
                                {e.date}
                              </TableCell>
                              <TableCell align="center">
                                {e.quantity}
                              </TableCell>
                              <TableCell align="center">
                                {e.status === 'Pending' && <Chip label={e.status} style={{ backgroundColor: '#EF5350', color: 'white' }} />}
                                {e.status === 'Order in Process' && <Chip label={e.status} style={{ backgroundColor: '#303F9F', color: 'white' }} />}
                                {e.status === 'Order Delivered' && <Chip label={e.status} style={{ backgroundColor: '#2E7D32', color: 'white' }} />}
                                {e.status === 'Delivered' && <Chip label={e.status} style={{ backgroundColor: '#2E7D32', color: 'white' }} />}
                              </TableCell>
                            </TableRow>
                            // ) : (

                            //   <TableRow >
                            //     <TableCell colSpan={6} rowSpan={5}> <Typography variant="h5" color="textSecondary" style={{ display: 'flex', justifyContent: 'center' }}>
                            //       Nothing Any Order Add in My Orders
                            //     </Typography></TableCell>
                            //   </TableRow>)
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      // component="div"
                      count={array3.length}
                      //  colSpan={3}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />

                  </Table>
                </Paper>


              </div>
            )}


        </Container>
        {/* </main>
        </div> */}
      </React.Fragment>
    );
  }
}
Pending.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

// export default withStyles(styles, { withTheme: true })(Pending);
const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    store_user: (userlogin) => dispatch(update_user_Customer(userlogin)),
    logout_user: () => dispatch(remove_user_Customer()),
  }
}
// export default withStyles(styles)(Login);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Pending)))



