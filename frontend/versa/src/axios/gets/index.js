import Axios from 'axios'
//add axios to fetch data from API
let host = process.env.NODE_ENV==='production'? "" : "http://localhost:5000"
export const getProductByID = async (currentProduct) => {
    const response = await Axios.get(
        `${host}/products/get/${currentProduct}`
    );
    return response.data
}

export const getAllProducts = async () => {
    let res = await Axios.get(host+"/products/allProducts");
    return res.data
}

export const searchProducts = async (query) => {
    let res = await Axios.get(host+"/products/search/" + query);
    return res.data
}


