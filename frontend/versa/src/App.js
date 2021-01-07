import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import ProductItem from "./pages/ProductItem/ProductItem";
import Theme from "./toolbox/constants";

// http://localhost:5000/product/{id}

function App() {
    return (
        <ThemeProvider theme={Theme}>
            <ProductItem />
        </ThemeProvider>
    );
}

export default App;
