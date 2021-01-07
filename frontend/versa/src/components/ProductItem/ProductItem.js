import React from "react";
import ArtistDetails from "../ArtistDetails/ArtistDetails.js";
import CustomerReviews from "../CustomerReviewsSection/CustomerReviewsSection.js";
import ProductPageImage from "../ProductPageImage/ProductPageImage";

import ProductData from "../ProductInfo/ProductData";

const ProductItem = () => {
    return (
        <div>
            <ProductPageImage />
            <ProductData />
            <ArtistDetails />
            <CustomerReviews />
        </div>
    );
};

export default ProductItem;
