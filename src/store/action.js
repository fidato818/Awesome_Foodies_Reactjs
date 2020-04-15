const update_user_Customer = user => {
  return {
    type: "SET_USER",
    data: user
  };
};
const Login_with_fb = user => {
  return {
    type: "SET_USER_FACEBOOK",
    data: user
  };
};
const remove_with_fb = () => {
  return {
    type: "REMOVE_USER_FACEBOOK",
    data: null
  };
};
const remove_user_Customer = () => {
  return {
    type: "REMOVE_USER",
    data: null
  };
};
const update_user_Resturant = user => {
  return {
    type: "SET_USER_Resturant",
    data: user
  };
};
const remove_user_Resturant = () => {
  return {
    type: "REMOVE_USER_Resturant",
    data: null
  };
};
const addToCart = cartData => {
  return {
    type: "ADD_TO_CART",
    data: cartData
  };
};
const removeTOCart = payload => {
  return {
    type: "REMOVE_TO_CART",
    data: payload
  };
};
const toggleDrawer = payload => {
  return {
    type: "TOGGLE_DRAWER",
    data: payload
  };
};

export { Login_with_fb, remove_with_fb, update_user_Customer, remove_user_Customer, update_user_Resturant, remove_user_Resturant, addToCart, removeTOCart, toggleDrawer };
