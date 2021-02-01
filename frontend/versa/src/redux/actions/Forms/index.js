export const setFormInputs = (form, key, value) => {
    return async (dispatch) => {
        dispatch({
            type: "FORM_SET_INPUTS",
            payload: {  form, key, value },
        });
    };
};

export const clearFormInputs = (form) => {
    return async (dispatch) => {
        dispatch({
            type: "FORM_CLEAR_INPUTS",
            payload: form
        })
    }
}
