import Axios from "axios";

// export const fetchProduct = async (dispatch, getState) => {
//     const response = await Axios.get("http://localhost:5000/product/1");
//     console.log(response.data);

//     dispatch({
//         type: "FETCH_PRODUCT",
//         payload: response.data,
//     });
// };

export const fetchProduct = () => {
    return async (dispatch, getState) => {
        const response = await Axios.get("http://localhost:5000/product/1");
        console.log(response.data);

        dispatch({
            type: "FETCH_PRODUCT",
            payload: response.data,
        });
    };
};

// const searchUsers = async (text) => {
//     setLoading();
//     const res = await github.get(`/search/users?q=${text}`);

//     dispatch({
//       type: SEARCH_USERS,
//       payload: res.data.items,
//     });
//   };

// export const fetchProduct = async () => {
//     const response = await Axios.get("http://localhost:5000/product/{id}");

//     return {
//         type: "FETCH_PRODUCT",
//         payload: response.data,
//     };
// };