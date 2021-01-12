import Axios from 'axios'
//add axios to fetch data from API
export const getProductByID = async (currentProduct) => {
    const response = await Axios.get(
        `http://localhost:5000/products/${currentProduct}`
    );
    return response.data
}

export const getAllProducts = async () => {
    let res = await Axios.get("http://localhost:5000/products/allProducts");
    return res.data
}

export const searchProducts = async (query) => {
    let res = await Axios.get("http://localhost:5000/products/search/" + query);
    return res.data
}


