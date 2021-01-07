import React from "react";
import productData from "./productData.json";
import ProductSummary from "../ProductSummary";

const ProductData = () => {
    return (
        <div>
            {productData.map((info) => {
                return <ProductSummary key={info.id} {...info} />;
            })}
        </div>
    );
};

export default ProductData;
