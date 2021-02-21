import Axios from "axios";
Axios.defaults.withCredentials = true;

export const getImagesByPID = async (currentProduct) => {
    const response = await Axios.get(`/api/images/byPID/${currentProduct}`);
    let images = await response.data;
    return images;
};
export const getProductByID = async (currentProduct) => {
    const response = await Axios.get(`/api/products/get/${currentProduct}`);
    return response.data;
};
export const getUser = async () => {
    try {
        const response = await Axios.get("/api/users/get");
        return response.data;
    } catch {
        return false;
    }
};

export const getAllProducts = async () => {
    let res = await Axios.get("/api/products/allProducts/", {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
    return res.data;
};
export const getAllMyProducts = async () => {
    try {
        let res = await Axios.get("/api/products/myProducts/");
        return res.data;
    } catch (e) {
        if (e.response.status === 401) {
            throw new Error("not authorized");
        }
    }
};

export const searchProducts = async (query) => {
    if (!query) {
        return await getAllProducts();
    }
    let res = await Axios.get("/api/products/search/" + query);
    return res.data;
};

export const searchEvents = async (searchQuery) => {
    if (!searchQuery) {
        return await getAllEvents();
    }
    let res = await Axios.get("/api/events/search/" + searchQuery);
    return res.data;
};

export const getAllEvents = async () => {
    let res = await Axios.get("/api/events/allEvents/", {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
    return res.data;
};

export const getAllArtistEvents = async (id) => {
    let res = await Axios.get("/api/events/artistsEvents/" + id);
    return res.data;
};
export const getCollabsByEventID = async (eventid) => {
    const response = await Axios.get(`/api/events/collabs/${eventid}`);
    return response.data;
};
export const getMyArtistEvents = async () => {
    try {
        let res = await Axios.get("/api/events/myArtistsEvents/");
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
export const getAttendingEvents = async () => {
    try {
        let res = await Axios.get("/api/events/attending/");
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const getEventByID = async (id) => {
    const response = await Axios.get(`/api/events/get/${id}`);
    console.log(response);
    return response.data;
};

export const getImagesByEID = async (currentEvent) => {
    const response = await Axios.get(`/api/eventImages/byEID/${currentEvent}`);
    let images = await response.data;
    return images;
};

export const getSalesByProduct = async (query) => {
    const response = await Axios.get(
        `/api/dashboard/sales-by-products/${query}`
    );
    return response.data;
};

export const getTotalSales = async (query) => {
    const response = await Axios.get(`/api/dashboard/total-sales/${query}`);
    return response.data;
};
export const getTotalOrders = async (query) => {
    const response = await Axios.get(`/api/dashboard/total-orders/${query}`);
    return response.data;
};
export const getAvgOrderValue = async (query) => {
    const response = await Axios.get(
        `/api/dashboard/average-order-value/${query}`
    );
    return response.data;
};

export const getRecentOrders = async () => {
    const response = await Axios.get(`/api/dashboard/recent-orders`);
    return response.data;
};
export const getCustomerOrders = async () => {
    const response = await Axios.get("/api/dashboard/customer-orders");
    return response.data;
};

export const getOneOrder = async (orderid) => {
    const response = await Axios.get(`/api/dashboard/order/${orderid}`);
    return response.data;
};

export const getOneShopperOrder = async (orderid) => {
    const response = await Axios.get(`/api/dashboard/shopper-order/${orderid}`);
    return response.data;
};

export const amIGoing = async (eventID) => {
    const response = await Axios.get(`/api/events/amIGoing/${eventID}`);
    return response.data;
};

export const getCartItem = async (cartProduct, colour, size, session) => {
    const response = await Axios.get(
        `/api/cart/${session}/item/${cartProduct}/${colour}/${size}`
    );
    return response.data;
};
export const getCart = async (session) => {
    try {
        const response = await Axios.get(`/api/cart/${session}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const getOrdersForDriver = async () => {
    const response = await Axios.get(`/api/dashboard/driver/order-to-fulfill`);
    return response.data;
};

export const getOneOrderForDriver = async (orderid) => {
    const response = await Axios.get(
        `/api/dashboard/driver/order-to-fulfill/${orderid}`
    );
    return response.data;
};

export const getPastDeliveries = async () => {
    const response = await Axios.get(`/api/dashboard/driver/past-deliveries`);
    return response.data;
};

export const getOnePastDelivery = async (orderid) => {
    const response = await Axios.get(`/api/dashboard/driver/past/${orderid}`);
    return response.data;
};

export const getAssignedPickups = async () => {
    const response = await Axios.get(`/api/dashboard/driver/assigned-pickups`);
    return response.data;
};

export const getOneAssignedPickup = async (artistid) => {
    const response = await Axios.get(
        `/api/dashboard/driver/assigned-pickups/${artistid}`
    );
    return response.data;
};

export const getMessages = async () => {
    const response = await Axios.get(`/api/messages/get/`);
    console.log(response);
    return response.data;
};

export const getUserByToken = async () => {
    const response = await Axios.get(`/api/users/me`)
    return response.data
}


export const getReadyDeliveries = async () => {
    const response = await Axios.get(`/api/dashboard/driver/ready-deliveries`);
    return response.data;
};
