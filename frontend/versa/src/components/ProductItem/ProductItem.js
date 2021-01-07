import React from "react";
import ProductSummary from "../ProductSummary/ProductSummary";

import ProductData from "../ProductInfo/ProductData";

const ProductItem = () => {
    return (
        <div>
            <ProductData />
            <ProductSummary />
        </div>
    );
};

export default ProductItem;
