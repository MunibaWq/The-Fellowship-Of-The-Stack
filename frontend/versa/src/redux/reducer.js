const initState = [];

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCH_PRODUCT":
            return action.payload;
        default:
            return state;
    }
};

export default productReducer;
