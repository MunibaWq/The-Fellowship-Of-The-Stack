export const addToCart = (cartProduct, colour, size, quantity) => {
    return async (dispatch) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: { cartProduct, colour, size , quantity},
        });
    };
};
export const setCartInput = (cartItem, newQuantity) => {
    return async (dispatch) => {
        dispatch({
            type: "SET_CART_INPUT",
            payload: { cartItem, newQuantity }
        })
    }
}
export const updateCart = () => {
    return async (dispatch) => {
        dispatch({
            type: "UPDATE_CART",
        })
    }
}
export const removeFromCart = (cartProduct, colour, size, quantity) => {
    return async (dispatch) => {
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: { cartProduct, colour, size, quantity},
        });
    };
};

export const changeQuantity = (mCartProduct, mColour, mSize, mQuantity) => {
    return async (dispatch) => {
        dispatch({
            type: "MODIFY_CART",
            payload: { mCartProduct, mColour, mSize, mQuantity },
        });
    };
};