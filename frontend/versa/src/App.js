import React from "react";
import { ThemeProvider } from "styled-components";
import ProductItem from "./pages/ProductItem/ProductItem";
// import Product from "./redux/Product";
import Theme from "./toolbox/constants";
import SearchResults from "./pages/Search/SearchResults";
import { useSelector } from "react-redux";
function App() {
    const currentPage = useSelector((state) => state.currentPage);
    const currentProduct = useSelector((state) => state.selectedProduct);
    let pageToShow;
    console.log('App.js currentProduct', currentProduct)
    switch (currentPage) {
        case "Search":
            pageToShow = <SearchResults />;
            break;
        case "ProductItem":
            pageToShow = <ProductItem currentProduct={currentProduct} />;
            break;
        default:
            pageToShow = <></>;
    }
    return (
        <ThemeProvider theme={Theme}>
            {pageToShow}
            {/* <Product /> */}
        </ThemeProvider>
    );
}

export default App;
