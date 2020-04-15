import React from "react";
import PropTypes from "prop-types";
import { Switch,Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';
import Signup from "../Components/User/Signup";
import Dashboard from "../Components/Admin/MyRequests";
import InProcess from "../Components/Admin/InProcess";
import Delivered from "../Components/Admin/Delivered";
import AddItem from "../Components/Admin/AddandEdit";
import Pending from "../Components/Admin/Pending";
import Profile from "../Components/Admin/Profile";
import MyOrders from "../Components/User/MyOrders";
import EmailVerified from "../Components/Admin/EmailVerfied";
import AdminDetailPage from "../Components/User/AdminDetailPage";
import Login from "../Components/User/Login";
import Home from "../Components/User/Home";
import ScrollToTop from 'react-router-scroll-top'
import PrivateRoute from './PrivateRoute'



class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
      auth: false,
      anchorEl: null,
      displayEmail: "",
      open: false
    };
  }

  render() {


    return (
      <Router>
        <Switch>
          <ScrollToTop>


            <Route path="/" exact component={Home} />
            <Route path="/Signup" component={Signup} />
            <Route path="/Login" component={Login} />
            <Route path="/emailverification" component={EmailVerified} />
            <Route path="/User/DetailPage/:id" component={AdminDetailPage} />
            <Route path="/User/MyOrders/:id" component={MyOrders} />
            <PrivateRoute path="/Admin/FoodItems" component={AddItem} authed={this.props.user} />
            <PrivateRoute path="/Admin/Profile/:id" component={Profile} authed={this.props.user} />
            <PrivateRoute path="/Dashboard" component={Dashboard} authed={this.props.user} />
            <PrivateRoute path="/Admin/InProcess/:id" component={InProcess} authed={this.props.user} />
            <PrivateRoute path="/Admin/Pending/:id" component={Pending} authed={this.props.user} />
            <PrivateRoute path="/Admin/Delivered/:id" component={Delivered} authed={this.props.user} />



          </ScrollToTop>
        </Switch>
      </Router >
    );
  }
}
Routes.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default withStyles(styles)(Routes);
const mapStateToProps = state => {

  return {
    user: state.user.userResturant,
    cart: state.cart
  }
}

// const mapDispatchToProps = dispatch => {

//   return {
//     store_user: (userlogin) => dispatch(update_user(userlogin)),
//     addFoodInCart: (userlogin) => dispatch(addToCart(userlogin)),
//     removeFoodInCart: (userlogin) => dispatch(removeTOCart(userlogin)),

//     logout_user: () => dispatch(remove_user()),
//   }
// }
// export default withStyles(styles)(Login);
export default connect(mapStateToProps, null)(Routes);
