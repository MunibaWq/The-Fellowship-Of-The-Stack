import React from "react";
import productData from "./productData.json";
import ProductDataRender from "./ProductDataRender";

const ProductData = () => {
    return (
        <div>
            {productData.map((info) => {
                // console.log({ info });
                return (
                    <ProductDataRender
                        // {...info}
                        title={info.title}
                        price={info.price}
                    />
                );
            })}
        </div>
    );
};

export default ProductData;
