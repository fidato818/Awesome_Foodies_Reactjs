const reducer = (state = [], action) => {
    switch (action.type) {

        case "ADD_TO_CART": {
            return { ...state, state: action.data };
        }
        case "REMOVE_TO_CART": {
            return { ...state, state: state.state.filter(asd => asd.id !== action.data) };
        }
        case "TOGGLE_DRAWER": {
            // console.log(state)
            // console.log(action)
            return { ...state, state: action.data };
        }
        default: {
            return state;
        }
    }
};

export default reducer;