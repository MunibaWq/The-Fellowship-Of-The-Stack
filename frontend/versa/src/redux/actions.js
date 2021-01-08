import Axios from "axios";

export const fetchProduct = (id) => {
    return async (dispatch, getState) => {
        const response = await Axios.get("http://localhost:5000/product/" + id);
        console.log(response.data);

        dispatch({
            type: "FETCH_PRODUCT",
            payload: response.data,
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

export const setPage = (page) => {
    return (dispatch) => {
        dispatch({
            type: "SET_PAGE",
            payload: page,
        });
    };
};
