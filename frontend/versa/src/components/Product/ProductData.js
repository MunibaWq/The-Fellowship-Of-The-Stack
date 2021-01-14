import React from "react";
import productData from "./productData.json";
import ProductSummary from "./ProductSummary.js";
import ProductDetails from "./ProductDetails";

const ProductData = ({productDataState}) => {
    
    

    return (
        <div>
           
            
                    <div key={productDataState.id}>
                        <ProductSummary {...productDataState} />
                        <ProductDetails {...productDataState} />
                    </div>
     
         
        </div>
    );
};

export default ProductData;
