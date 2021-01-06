import React from "react";
import { productInfo } from "./productInfo.json";
import ProductInfoRender from "./ProductInfoRender";

const ProductInfo = () => {
  return (
    <div>
      {productInfo.map((info) => {
        return <ProductInfoRender {...info} title={info.title} />;
      })}
    </div>
  );
};

export default ProductInfo;
