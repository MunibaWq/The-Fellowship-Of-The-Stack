import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import ProductItem from "./pages/ProductItem/ProductItem";
import Theme from "./toolbox/constants";

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/product/{id}").then((res) => {
            setProducts(res.data);
            console.log(res.data);
        });
    });

    return (
        <ThemeProvider theme={Theme}>
            <ProductItem />
        </ThemeProvider>
    );
}

export default App;
