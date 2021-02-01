export const setRedirect = (redirectPage, redirectValue) => {
    return async (dispatch) => {
        dispatch({
            type: "SET_REDIRECT",
            payload: { redirectPage, redirectValue },
        });
    };
};