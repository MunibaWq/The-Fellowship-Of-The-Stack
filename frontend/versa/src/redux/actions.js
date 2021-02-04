import { getImagesByPID, getProductByID } from "../axios/gets";
export const loginAction = (user) => {
    return async (dispatch) => {
        dispatch({
            type: "LOGIN",
            payload: user,
        });
    };
};
export const fetchImages = (id) => {
    return async (dispatch) => {
        const images = await getImagesByPID(id);
        dispatch({
            type: "FETCH_IMAGES",
            payload: images,
        });
    };
};
export const fetchProduct = (id) => {
    return async (dispatch, getState) => {
        const data = await getProductByID(id);

        dispatch({
            type: "FETCH_PRODUCT",
            payload: data,
        });
    };
};
export const setSelectedProduct = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: "SELECT_PRODUCT",
            payload: id,
        });
    };
};
