import React from "react";
import { ThemeProvider } from "styled-components";
import ProductItem from "./pages/ProductItem/ProductItem";
import Theme from "./toolbox/constants";

function App() {
    return (
        <ThemeProvider theme={Theme}>
            <ProductItem />
        </ThemeProvider>
    );
}

export default App;
