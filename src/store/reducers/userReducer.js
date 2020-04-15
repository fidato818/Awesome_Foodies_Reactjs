const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER": {
      return { ...state, user: action.data };
    }
    case "REMOVE_USER": {
      return { ...state, user: '' };
    }
    case "SET_USER_FACEBOOK": {
      // console.log(action.data)
      return { ...state, userfb: action.data };
    }
    case "REMOVE_USER_FACEBOOK": {
      return { ...state, userfb: '' };
    }
    case "SET_USER_Resturant": {
      return { ...state, userResturant: action.data };
    }
    case "REMOVE_USER_Resturant": {
      return { ...state, userResturant: '' };
    }

    default: {
      return state;
    }
  }
};

export default reducer;