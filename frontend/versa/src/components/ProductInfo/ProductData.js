import React from "react";
import productData from "./productData.json";
import ProductSummary from "../ProductSummary/ProductSummary.js";
import ProductDetails from "../ProductDetails/ProductDetails.js";
import CustomerReviews from "../CustomerReviewsSection/CustomerReviewsSection";

const ProductData = () => {
    return (
        <div>
            {productData.map((info) => {
                return (
                    <div key={info.id}>
                        <ProductSummary {...info} />
                        <ProductDetails {...info} />
                        <CustomerReviews {...info} />
                    </div>
                );
            })}
        </div>
    );
};

export default ProductData;
