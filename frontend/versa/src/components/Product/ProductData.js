import React, { useState, useEffect } from "react";
import axios from "axios";
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
