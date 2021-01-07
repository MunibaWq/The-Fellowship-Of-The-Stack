import React from "react";
import ProductSummary from "../ProductSummary/ProductSummary";

import ProductDataRender from "../ProductInfo/ProductDataRender";

const ProductItem = () => {
  return (
    <div>
      <ProductDataRender />
      <ProductSummary />
    </div>
  );
};

export default ProductItem;
