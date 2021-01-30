const initState = {
    loginEmail:'',
    loginPassword: '',
    user: '',
    productData: {},
    selectedProduct: null,
    currentPage: "Search",
};

const productReducer = (state = initState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case "LOGIN_SET_EMAIL":
            newState.loginEmail = action.payload
            return newState
        case "LOGIN_SET_PASSWORD":
            newState.loginPassword = action.payload
            return newState
        case "LOGIN":
            newState.user = action.payload;
            return newState;
        case "FETCH_PRODUCT":
            newState.productData = action.payload;
            return newState;
        case "SELECT_PRODUCT":
            newState.selectedProduct = action.payload;
            return newState;
        case "SET_PAGE":
            newState.currentPage = action.payload;
            return newState;
        default:
            return newState;
    }
};

export default productReducer;
