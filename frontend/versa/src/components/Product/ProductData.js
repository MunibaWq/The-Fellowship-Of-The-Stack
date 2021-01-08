import React, { useState, useEffect } from "react";
import axios from "axios";
import productData from "./productData.json";
import ProductSummary from "./ProductSummary.js";
import ProductDetails from "./ProductDetails";

const ProductData = ({currentProduct}) => {
    const [productDataState, setProductDataState] = useState([]);
    useEffect(() => {
        const fetchProduct = async () => {
            console.log('ProductData.js currentProduct', currentProduct)
            //add axios to fetch data from API
            const response = await axios
                .get(`http://localhost:5000/product/${currentProduct}`)

            console.log(response.data)
            setProductDataState(response.data);
        };
        fetchProduct()
    },[])

    return (
        <div>
           
                return (
                    <div key={productDataState.id}>
                        <ProductSummary {...productDataState} />
                        <ProductDetails {...productDataState} />
                    </div>
                );
         
        </div>
    );
};

export default ProductData;
