export const setChoices = (choiceKey, choiceValue) => {
    return async dispatch => {
        dispatch({
            type: "PRODUCT_SET_CHOICES",
            payload: { choiceKey, choiceValue },
        });
    };
};
export const clearChoices = () => {
    return async dispatch => {
        dispatch({
            type: "PRODUCT_CLEAR_CHOICES",
        });
    };
};
