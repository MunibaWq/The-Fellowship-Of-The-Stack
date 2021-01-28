export const setEmail = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOGIN_SET_EMAIL",
            payload: value,
        });
    };
};
export const setPassword = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOGIN_SET_PASSWORD",
            payload: value,
        });
    };
};