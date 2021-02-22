import Axios from "axios";
export const removeFromCart = (
    cartProduct,
    colour,
    size,
    quantity,
    session
) => {
    Axios.delete("/api/cart/remove", {
        cartProduct,
        colour,
        size,
        quantity,
        session,
    });
};
export const deleteImage = (id) => {
    Axios.delete("/api/images/delete/" + id);
};

export const deleteUserFromEventByID = async (event) => {
    const response = await Axios.delete(`/api/events/not-attending/${event}`);
    return response.status;
};

export const deleteArtistEvent = (id) => {
    Axios.delete(`/api/events/delete/${id}`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
};

export const deleteEventImage = (id) => {
    Axios.delete("/api/eventImages/delete/" + id);
};
