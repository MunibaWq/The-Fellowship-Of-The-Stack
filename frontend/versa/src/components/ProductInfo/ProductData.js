import React from "react";
import productData from "./productData.json";
import ProductSummary from "../ProductSummary";
import ProductDetails from "../ProductDetails";

const ProductData = () => {
    return (
        <div>
            {productData.map((info) => {
                return (
                    <div>
                        <ProductSummary key={info.id} {...info} />
                        <ProductDetails key={`${info.id}-1`} {...info} />
                    </div>
                );
            })}
        </div>
    );
};

export default ProductData;
