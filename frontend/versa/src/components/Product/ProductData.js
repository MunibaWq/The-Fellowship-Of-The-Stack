import React, { useState } from "react";
import axios from "axios";
import productData from "./productData.json";
import ProductSummary from "./ProductSummary.js";
import ProductDetails from "./ProductDetails";

const ProductData = () => {
    const [productDataState, setProductDataState] = useState([]);
    const fetchProduct = async () => {
        //add axios to fetch data from API
        const response = await axios
            .get("http://localhost:5000/product/1")

            .then((response) => console.log(response.data));

        setProductDataState(response.data);
    };

    return (
        <div>
            {productData.map((info) => {
                return (
                    <div key={info.id}>
                        <ProductSummary {...info} />
                        <ProductDetails {...info} />
                    </div>
                );
            })}
        </div>
    );
};

export default ProductData;
