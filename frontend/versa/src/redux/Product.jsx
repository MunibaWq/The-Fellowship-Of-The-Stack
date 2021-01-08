import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProduct } from "./actions";

const Product = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProduct());
    }, []);
    return <div></div>;
};

export default Product;
