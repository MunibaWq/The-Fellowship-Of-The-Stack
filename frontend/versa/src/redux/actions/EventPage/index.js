export const setChoices = (choiceKey, choiceValue) => {
    return async (dispatch) => {
        dispatch({
            type: "EVENT_SET_CHOICES",
            payload: { choiceKey, choiceValue },
        });
    };
};
export const clearChoices = () => {
    return async (dispatch) => {
        dispatch({
            type: "EVENT_CLEAR_CHOICES",
        });
    };
};
