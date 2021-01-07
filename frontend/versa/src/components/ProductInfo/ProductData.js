import React from "react";
import productData from "./productInfo.json";
import ProductDataRender from "./ProductDataRender";

const ProductData = () => {
  return (
    <div>
      {productData.map((info) => {
        return (
          <ProductDataRender {...info} title={info.title} price={info.price} />
        );
      })}
    </div>
  );
};

export default ProductData;
