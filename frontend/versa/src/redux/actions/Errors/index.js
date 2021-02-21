export const setInputErrors = (form, textField, value) => {
    return async (dispatch) => {
        dispatch({
            type: "SET_INPUT_ERRORS",
            payload: { form, textField, value },
        });
    };
};

export const setFormErrors = (form, value) => {
    return async (dispatch) => {
        dispatch({
            type: "SET_FORM_ERRORS",
            
            payload: { form, value },
        });
    };
};