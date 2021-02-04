import Axios from "axios";
Axios.defaults.withCredentials = true;

//add axios to fetch data from API
let host = process.env.NODE_ENV === "production" ? "" : "";
export const getImagesByPID = async (currentProduct) => {
    const response = await Axios.get(`${host}/images/byPID/${currentProduct}`);
    let images = await response.data;
    return images;
};
export const getProductByID = async (currentProduct) => {
    const response = await Axios.get(`${host}/products/get/${currentProduct}`);
    return response.data;
};
export const getUserByID = async (id) => {
    const response = await Axios.get("/users/get/" + id);
    return response.data;
};
export const getAllProducts = async () => {
    let res = await Axios.get(host + "/products/allProducts/", {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
    return res.data;
};
export const getAllArtistProducts = async (id) => {
    let res = await Axios.get("/products/artistsProducts/" + id);
    return res.data;
};

export const searchProducts = async (query) => {
    if (!query) {
        return await getAllProducts();
    }
    let res = await Axios.get(host + "/products/search/" + query);
    return res.data;
};

export const searchEvents = async (searchQuery) => {
    if (!searchQuery) {
        return await getAllEvents();
    }
    let res = await Axios.get("events/search/" + searchQuery);
    return res.data;
};

export const getAllEvents = async () => {
    let res = await Axios.get("/events/allEvents/", {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
    return res.data;
};

export const getAllArtistEvents = async (id) => {
    let res = await Axios.get("/events/artistsEvents/" + id);
    return res.data;
};

export const getEventByID = async (id) => {
    const response = await Axios.get("/events/get/" + id);
    return response.data;
};
