import React from "react";
import { ThemeProvider } from "styled-components";
import ProductItem from "./pages/ProductItem/ProductItem";
import Product from "./redux/Product";
import Theme from "./toolbox/constants";
import SearchResults from './pages/Search/SearchResults'

function App() {
    return (
        <ThemeProvider theme={Theme}>
            <ProductItem />
            <Product />
        </ThemeProvider>
    );
}

export default App;
