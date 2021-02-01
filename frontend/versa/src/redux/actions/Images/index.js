export const setImages = (page,images) => {
    return async (dispatch) => {
        dispatch({
            type: "SET_IMAGES",
            payload: { page, images },
        });
    };
};