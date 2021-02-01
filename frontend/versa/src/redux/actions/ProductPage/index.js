export const setChoices = (choiceKey,choiceValue) => {
    return async (dispatch) => {
        dispatch({
            type: "PRODUCT_SET_CHOICES",
            payload: { choiceKey, choiceValue },
        });
    };
};
