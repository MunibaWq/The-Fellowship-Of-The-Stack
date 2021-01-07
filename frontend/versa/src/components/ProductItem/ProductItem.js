import React from "react";
import ProductDetails from "../ProductDetails";
import ArtistDetails from "../ArtistDetails";
import CustomerReviews from "../CustomerReviews3";
import ProductPageImage from "../ProductPageImage";

import ProductData from "../ProductInfo/ProductData";

const ProductItem = () => {
    return (
        <div>
            <ProductPageImage />
            <ProductData />
            <ProductDetails />
            <ArtistDetails />
            <CustomerReviews />
        </div>
    );
};

export default ProductItem;
