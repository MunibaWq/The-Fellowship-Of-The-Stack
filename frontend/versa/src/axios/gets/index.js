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
export const getUserByID = async (id) => {
    const response = await Axios.get("/api/users/get/" + id);
    return response.data;
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
    let res = await Axios.get("/api/products/myProducts/");
    return res.data;
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

export const getMyArtistEvents = async () => {
    let res = await Axios.get("/api/events/myArtistsEvents/");
    return res.data;
};

export const getEventByID = async (id) => {
    const response = await Axios.get(`/api/events/get/${id}`);
    return response.data;
};

export const getSalesByProduct = async (id) => {
    const response = await Axios.get(`/api/dashboard/sales-by-products/`);
    return response.data;
};

export const getTotalSales = async () => {
    const response = await Axios.get(`/api/dashboard/total-sales/`);
    return response.data;
};
export const getTotalOrders = async () => {
    const response = await Axios.get(`/api/dashboard/total-orders/`);
    return response.data;
};
export const getAvgOrderValue = async () => {
    const response = await Axios.get(`/api/dashboard/average-order-value/`);
    return response.data;
};

export const getRecentOrders = async () => {
    const response = await Axios.get(`/api/dashboard/recent-orders/`);
    return response.data;
};

export const getOneOrder = async (orderid) => {
    const response = await Axios.get(`/api/orders/recent-orders/${orderid}`);
    return response.data;
};

export const amIGoing = async (eventID) => {
    const response = await Axios.get(`api/events/amIGoing/${eventID}`);
    return response.data;
};
