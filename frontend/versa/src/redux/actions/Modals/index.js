export const setVisible = (modalPage, modalName, visible) => {
    return async (dispatch) => {
        dispatch({
            type: "SET_MODAL_VISIBLE",
            payload: { modalPage, modalName, visible },
        });
    };
};