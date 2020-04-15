import React from "react";
import {
  Button, CardContent,
  CardActions, Card,
  Typography,
  Grid,
  Paper,
  Container,
  Snackbar,
  CssBaseline, LinearProgress, Dialog, DialogContent, Slide, IconButton,
  // Breadcrumbs,
  // Link,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  // Checkbox
} from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import CloseIcon from '@material-ui/icons/Close';
import "../../materialCards.css";
import firebase from "../../config/Firebase";
import { update_user_Customer, remove_user_Customer } from '../../store/action';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Navbar from "../../config/navbar";
import { withStyles } from "@material-ui/core/styles";
import { Alert } from '@material-ui/lab';
import './Home.css';
const styles = theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontFamily: 'MyFont',
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
  chip: {
    marginRight: theme.spacing(1), fontFamily: 'MyFont',
  },
  root: {
    // minWidth: 275,
    // fontFamily: 'MyFont',
    // transitionDuration: '0.5s',
    // boxShadow: '1',
    // transition: "100 1s ease-in",
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      // transitionDuration: '0.3s',
      // transition: "100 1s ease-in",
      textDecoration: 'none',
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    // },
  },
  table: {
    fontFamily: 'MyFont',
  },
  appContent: theme.mixins.gutters({
    // backgroundColor: '#e0e0e0',
    flex: "100%", // https://github.com/philipwalton/flexbugs#flexbug-17
    // maxWidth: "100%", // https://github.com/philipwalton/flexbugs#flexbug-17
    paddingTop: 80,
    // margin: "0 auto",
    height: '100% '

    // [theme.breakpoints.up("lg")]: {
    //   maxWidth: theme.breakpoints.values.lg
    // }
  }),
});

// function handleClick(e) {
//   alert("You clicked! Juices / smoothies.");
//   e.preventDefault();
// }
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


class AdminDetailPage extends React.Component {
  constructor() {
    super();
    this.state = {
      arr: [],
      value: [], cartArr: [],
      resturantName: "",
      quantity: 0,
      total: null,
      checkedValues: []

    };
    // this.handleCheck = this.handleCheck.bind(this);
  }

  // handleCheck(e, x) {


  //   this.setState(state => ({
  //     checkedValues: state.checkedValues.includes(x)
  //       ? state.checkedValues.filter(c => c !== x)
  //       : [...state.checkedValues, x]
  //   }));
  // }

  componentDidMount() {
    const { user, userfb } = this.props;
    var asd = user.userfb && userfb.userfb.uid
    var qwe = user.user && user.user.user.uid
    var currentId = user.userfb ? asd : qwe
    this.getFoodData()
    this.getUserData()
    currentId && this.getCartData()

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

  handleClick = (scrollType, id, name, category, description, price) => {
    this.setState({
      onTog: true,
      scroll: scrollType,
      id: id,
      name: name,
      category: category,
      description: description,
      price: price
    });

  };
  handleClose = () => {
    this.setState({ open: false, onTog: false, });
  };
  handleAdd = () => {
    this.setState({
      quantity: this.state.quantity + 1,

    });
  };
  handleLess = () => {
    this.setState({ quantity: this.state.quantity - 1, });
  };
  getFoodData = () => {
    const { match: { params } } = this.props

    this.firebaseRef = firebase.database().ref("foodData/" + params.id);
    this.firebaseRef.on('value', (snapshot) => {
      var movie = snapshot.val();
      var newArr = []
      for (var key in movie) {
        newArr.push({
          currentUserId: movie[key].currentUserId,
          foodCategory: movie[key].foodCategory,
          foodDescription: movie[key].foodDescription,
          foodName: movie[key].foodName,
          foodPrice: movie[key].foodPrice,
          newPostKey: movie[key].newPostKey,
        })
        this.setState({
          arr: newArr

        });
      }

    });
  }
  getUserData = () => {
    const { match: { params } } = this.props

    var firebaseRef = firebase.database().ref("Resturant_Owner/" + params.id);
    firebaseRef.on('value', (snapshot) => {
      let message = snapshot.val();

      if (message.userId === params.id) {
        this.setState({
          userId: message.userId,
          resturantName: message.resturantName,
          subTitle: message.subTitle,
          resturantDescription: message.resturantDescription,
          downloadURL: message.downloadURL,
          foodName: message.foodName,
          foodPrice: message.foodPrice,
          newPostKey: message.newPostKey,
        })
      }

    });

  }
  getCartData = () => {
    const { user, match: { params }, userfb
    } = this.props;
    var asd = user.userfb && userfb.userfb.uid
    var qwe = user.user && user.user.user.uid
    var currentId = user.userfb ? asd : qwe
    this.firebaseRef = firebase.database().ref("Resturant_Cart/" + currentId + '/' + params.id);
    this.firebaseRef.on('value', (snapshot) => {
      var newArr = []
      snapshot.forEach((data) => {
        var childData = data.val();
        newArr.push(childData)
        // console.log('Success: ', childData)

      });
      this.setState({
        cartArr: newArr
      });
    })
  }

  addOrdertoCart = (e, sid) => {
    const { user, match: { params }, userfb
    } = this.props;
    var asd = user.userfb && userfb.userfb.uid
    var qwe = user.user && user.user.user.uid
    var currentId = user.userfb ? asd : qwe
    const { quantity, id, name, category, price, cartArr, } = this.state
    var cartData = cartArr.filter((item) => item.name === name)
    var userEmail = user.userfb ? user.userfb.email : user.user.user.email
    if (cartData.length !== 0) {
      // alert('Data Already Exist')
      this.setState({
        openSnack: !this.state.openSnack, msg: 'Item Already Exist'
      })
    }
    else {
      var newPostKey = firebase.database().ref().child('Resturant_Cart').push().key;
      var obj = {
        id,
        name,
        category,
        price,
        quantity,
        newPostKey,
        userEmail, sid
      }
      firebase.database().ref("Resturant_Cart/" + currentId + '/' + params.id + '/' + newPostKey).set(obj).then(() => {
        this.setState({
          openSnack: !this.state.openSnack, msg: 'Item Add in Cart'
        })
        console.log('success')
      }).catch((error) => {
        console.log('Error: ', error)
        var errorMessage = error.message;
        this.setState({
          openSnackError: true, msg: errorMessage
        })
      })
    }

  }
  deleteCartOrder = (id) => {
    const { user, match: { params }, userfb
    } = this.props;
    var asd = user.userfb && userfb.userfb.uid
    var qwe = user.user && user.user.user.uid
    var currentId = user.userfb ? asd : qwe
    firebase.database().ref("Resturant_Cart/" + currentId + '/' + params.id + '/' + id).remove().then((e) => {
      this.setState({
        openSnack: !this.state.openSnack, msg: 'Remove Item from Cart Successfully'
      })
      // this.setState({ open: false, onTog: false, loading: false });
    }).catch((error) => {
      console.log('Error: ', error)
      var errorMessage = error.message;
      this.setState({
        openSnackError: true, msg: errorMessage
      })
    })
  }
  submitOrder = (id, name, quantity, category, price, ) => {
    const { user, match: { params }, userfb
    } = this.props;
    var asd = user.userfb && userfb.userfb.uid
    var qwe = user.user && user.user.user.uid
    var userId = user.userfb ? asd : qwe
    var userEmail = user.userfb ? user.userfb.email : user.user.user.email
    // var userId = user.user.user.uid
    var status = 'Pending'
    var resturantId = params.id
    var date = new Date().toLocaleString()
    var obj = {
      status, date,
      id,
      name,
      price,
      quantity,
      userEmail,
      userId, resturantId
    }
    firebase
      .database()
      .ref("Order/" + userId + '/' + resturantId + '/' + id)
      .set(obj)
      .then((e) => {
        // alert("Your Order Submitted Successfully");
        // console.log("Document successfully written!");
        this.setState({
          openSnack: true, msg: 'Your order has been submitted successfully, Checkout My Orders'
        })
      });
    firebase.database().ref("Resturant_Cart/" + userId + '/' + resturantId + '/' + id).remove().then((e) => {
      console.log('Success: ')
      // this.setState({ open: false, onTog: false, loading: false });
    }).catch((error) => {
      console.log('Error: ', error)
      var errorMessage = error.message;
      this.setState({
        openSnackError: true, msg: errorMessage
      })
    })
  }
  render() {
    const { classes, user, userfb } = this.props;
    const { arr, resturantName, quantity, id, name, category, description, price, cartArr, } = this.state
    var getWatt = cartArr.reduce((a, b) => +a + +b.sid, 0);
    // console.log('Success: ', cartArr)

    var asd = user.userfb && userfb.userfb.uid
    var qwe = user.user && user.user.user.uid
    var currentId = user.userfb ? asd : qwe
    // console.log('Success: ', currentId)
    return (
      <React.Fragment>
        <Navbar />
        <main className={classes.appContent}>
          {/* <br />
          <br />
          <br />
          <br /> */}

          {/* <div > */}
          <CssBaseline />
          <Container maxWidth="lg">

            <div style={{ display: "flex", justifyContent: 'flex-end' }}>
              <div class="shopping-cart">
                <Button variant="outlined" color="primary" startIcon={<ShoppingCartIcon />} onClick={() => this.handleClickOpen('paper')}>My Cart</Button>

                <div class="item-count">{this.state.cartArr.length}</div>

              </div>

            </div>

            <Typography
              // variant="h1"
              component="h2"
              className={classes.famousHeading}
            >
              {resturantName}
            </Typography>
            {/* <FontAwesomeIcon icon="faCoffee" /> */}
            <br />
            <Typography variant="h4" style={{ textAlign: "center", fontFamily: 'MyFont', }}>
              {this.state.subTitle}
            </Typography>
            <br />
            <Typography variant="subtitle2" style={{ textAlign: "center", fontFamily: 'MyFont', }}>
              {this.state.resturantDescription}
            </Typography>
            <br />
            <div >
              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                {arr.map((image, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    key={image.newPostKey}
                  >
                    {/* <Card className={classes.root}> */}
                    <Card class='card' >
                      <CardContent>
                        <Typography variant="h5" component="h2" className={classes.title} color="textSecondary" gutterBottom style={{ fontFamily: 'MyFont', }}>
                          {image.foodName}
                        </Typography>
                        {/* <Typography variant="h5" component="h2" style={{ fontFamily: 'MyFont', }}>
                          Category: {image.foodCategory}
                        </Typography> */}
                        <Typography className={classes.pos} color="textSecondary" style={{ fontFamily: 'MyFont', }}>
                          Description: {image.foodDescription}
                        </Typography>
                        <Typography variant="body2" component="p" style={{ textAlign: 'right', fontFamily: 'MyFont' }}>
                          Price: {image.foodPrice}
                        </Typography>
                      </CardContent>
                      <CardActions style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {image.foodName === this.state.foodName ? (<Button disabled size="small" variant="outlined" color="primary" onClick={() => this.handleClick('body', image.newPostKey, image.foodName, image.foodCategory, image.foodDescription, image.foodPrice)}>Add to Cart</Button>) : (
                          <Button size="small" variant="outlined" color="primary" onClick={() => this.handleClick('body', image.newPostKey, image.foodName, image.foodCategory, image.foodDescription, image.foodPrice)}>Add to Cart</Button>)}
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
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
                fullWidth={true}
                maxWidth={'md'}
              >
                {this.state.loading && <LinearProgress />}
                <DialogContent dividers={this.state.scroll === 'paper'}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography className={classes.table} component="h1" variant="h5">
                      Cart Items
                  </Typography>
                    <IconButton

                      onClick={() => this.handleClose()}
                      color="inherit"
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>

                  <form

                    className={classes.form}
                  >
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="spanning table">
                        <TableHead className={classes.table}>

                          <TableRow className={classes.table}>
                            {/* <TableCell>Food Items</TableCell> */}
                            <TableCell className={classes.table}>Food Items</TableCell>
                            <TableCell className={classes.table} align="right">Qty.</TableCell>
                            <TableCell className={classes.table} align="right">Per Price</TableCell>
                            <TableCell className={classes.table} align="right">Total Price of Item</TableCell>
                            <TableCell className={classes.table} align="right">Delete</TableCell>
                            <TableCell className={classes.table} align="right">Submit Order</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {cartArr && cartArr.map((row, index) => (
                            <TableRow key={index + 1} id={row.newPostKey}>
                              {/* <TableCell> <Checkbox
                                label={row} key={row.toString()}
                                onChange={e => this.handleCheck(index, row)}
                                checked={this.state.checkedValues.includes(index)}
                              /></TableCell> */}
                              <TableCell className={classes.table} >{row.name}</TableCell>
                              <TableCell className={classes.table} align="right">{row.quantity}</TableCell>
                              <TableCell className={classes.table} align="right">{row.price}</TableCell>
                              <TableCell className={classes.table} align="right">{row.price * row.quantity}</TableCell>
                              <TableCell className={classes.table} align="right" onClick={() => this.deleteCartOrder(row.newPostKey)}><IconButton
                                color="inherit"
                              >
                                <IndeterminateCheckBoxIcon />
                              </IconButton></TableCell>
                              <TableCell align="right" onClick={() => this.submitOrder(row.newPostKey, row.name, row.quantity, row.category, row.price)}><Button
                                variant="outlined"
                                color="primary"
                                className={classes.table}
                              >
                                Submit Order
</Button></TableCell>
                            </TableRow>

                          ))}

                          <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell className={classes.table} colSpan={2}>Subtotal</TableCell>
                            {/* <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell> */}


                          </TableRow>
                          {/* <TableRow>
                            <TableCell>Tax</TableCell>
                            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                          </TableRow> */}
                          <TableRow>
                            <TableCell className={classes.table} colSpan={2}>Total</TableCell>
                            <TableCell className={classes.table} align="right">{parseInt(getWatt)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </form>
                </DialogContent>
              </Dialog>
              <div>
                <Dialog
                  open={this.state.onTog}
                  onClose={this.handleClose}
                  scroll={this.state.scroll}
                  aria-labelledby="scroll-dialog-title"
                  aria-describedby="scroll-dialog-description"
                  TransitionComponent={Transition}
                  keepMounted
                  fullWidth={true}
                  maxWidth={'sm'}
                >
                  {this.state.loading && <LinearProgress />}
                  <DialogContent dividers={this.state.scroll === 'body'} id={id}>


                    {/* <Card>
                      <CardContent> */}
                    <Typography className={classes.title} style={{ fontFamily: 'MyFont', }} color="textSecondary" gutterBottom>
                      Food Name: {name}
                    </Typography>
                    <Typography variant="h5" component="h2" style={{ fontFamily: 'MyFont', }}>
                      Category: {category}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary" style={{ fontFamily: 'MyFont', }}>
                      Description: {description}
                    </Typography>
                    <Typography variant="body2" component="p" style={{ fontFamily: 'MyFont', }} >
                      Price: {price}
                    </Typography>
                    <Typography variant="body2" component="p" style={{ fontFamily: 'MyFont', }}>
                      Total Price: {price * quantity}
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'MyFont', }}>


                      <Typography variant="body2" component="p" style={{ fontFamily: 'MyFont', }}>
                        Quantity: {quantity}
                      </Typography>
                      <div style={{ justifyContent: 'flex-end', fontFamily: 'MyFont', }}>


                        {quantity <= 0 ? (<IconButton
                          disabled
                          onClick={this.handleLess}
                          color="inherit"
                        >
                          <IndeterminateCheckBoxIcon />
                        </IconButton>) : (
                            <IconButton

                              onClick={this.handleLess}
                              color="inherit"
                            >
                              <IndeterminateCheckBoxIcon />
                            </IconButton>)}
                        {quantity >= 5 ? (<IconButton
                          disabled
                          onClick={this.handleAdd}
                          color="inherit"
                        >
                          <AddBoxIcon />

                        </IconButton>) : (
                            <IconButton

                              onClick={this.handleAdd}
                              color="inherit"
                            >
                              <AddBoxIcon />

                            </IconButton>)}
                      </div>
                    </div>
                    {/* </CardContent>
                    </Card> */}
                    {currentId ? (
                      <span>
                        <Button
                          disabled={quantity <= 0 ? true : false}
                          fullWidth
                          variant="outlined"
                          color="primary"
                          className={classes.submit}
                          onClick={() => this.addOrdertoCart(name, price * quantity)}
                        >
                          Add to Cart
                        </Button>

                      </span>) : (
                        //       <Button
                        //         fullWidth
                        //         variant="outlined"
                        //         color="primary"
                        //         className={classes.submit}
                        //         onClick={() => this.addOrdertoCart(name, price * quantity)}
                        //       >
                        //         Add to Cart
                        // </Button>
                        <div>
                          {/* {this.props.userR ? <Typography variant="subtitle" style={{ fontFamily: 'MyFont', fontWeight: 'bold', color: 'red', textAlign: 'center' }}>
                            Please Login Customer User to Create an Order
                        </Typography> : */}
                          <Typography variant="subtitle" style={{ fontFamily: 'MyFont', fontWeight: 'bold', color: 'red', textAlign: 'center' }}>
                            Please Login First to Create Order or Login with Customer User
                        </Typography>
                          {/* } */}
                        </div>
                      )}
                  </DialogContent>

                </Dialog>
              </div>
              <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                key={`${'top'},${'right'}`} open={this.state.openSnack} autoHideDuration={1500} onClose={() => this.setState({ openSnack: false })} >
                <div style={{ width: '40vw', }}>
                  <Alert variant="filled"
                    severity={this.state.msg === 'Item Add in Cart' ? 'success' :
                      this.state.msg === 'Item Already Exist' ? "info" :
                        this.state.msg === 'Remove Item from Cart Successfully' ? "success" :
                          this.state.msg === 'Your order has been submitted successfully, Checkout My Orders' ? "success" : null}>
                    {this.state.msg}
                  </Alert>
                </div>
              </Snackbar>
              <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={this.state.openSnackError} autoHideDuration={1500} onClose={() => this.setState({ openSnackError: false })} >
                <div style={{ width: '40vw', }}>
                  <Alert variant="filled" severity="error">{this.state.msg}</Alert>
                </div>
              </Snackbar>

            </div>
          </Container>

          {/* </div > */}
        </main>
      </React.Fragment >
    );
  }
}

const mapStateToProps = state => {
  // console.log('state', state)
  return {
    userR: state.user,
    user: state.user,
    userfb: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {

  return {
    store_user: (userlogin) => dispatch(update_user_Customer(userlogin)),
    // addFoodInCart: (userlogin) => dispatch(addToCart(userlogin)),
    // removeFoodInCart: (userlogin) => dispatch(removeTOCart(userlogin)),

    logout_user: () => dispatch(remove_user_Customer()),
  }
}
// export default withStyles(styles)(Login);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminDetailPage)));
