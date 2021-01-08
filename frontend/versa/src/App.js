import React from "react";
import { ThemeProvider } from "styled-components";
import ProductItem from "./pages/ProductItem/ProductItem";
import Theme from "./toolbox/constants";
import SearchResults from './pages/Search/SearchResults'

function App() {
    return (
        <ThemeProvider theme={Theme}>
            <ProductItem />
            {/* <SearchResults /> */}
        </ThemeProvider>
    );
}

export default App;
