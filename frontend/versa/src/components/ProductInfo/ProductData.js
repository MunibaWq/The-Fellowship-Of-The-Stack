import React from "react";
import productData from "./productData.json";
import ProductSummary from "../ProductSummary/ProductSummary.js";
import ProductDetails from "../ProductDetails/ProductDetails.js";

const ProductData = () => {
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
