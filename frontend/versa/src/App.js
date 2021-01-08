import React from "react";
import { ThemeProvider } from "styled-components";
import ProductItem from "./pages/ProductItem/ProductItem";
import Product from "./redux/Product";
import Theme from "./toolbox/constants";
import SearchResults from './pages/Search/SearchResults'
import { useSelector } from 'react-redux'
function App() {
    const currentPage = useSelector((state) => state.currentPage);
    let pageToShow
    switch(currentPage){
        case "Search":
            pageToShow = <SearchResults />
            break
        case "ProductItem":
            pageToShow = <ProductItem />
            break
        default:
            pageToShow = <></>
            
    }
    return (
        <ThemeProvider theme={Theme}>
            
            {pageToShow}
            {/* <Product /> */}
        </ThemeProvider>
    );
}

export default App;
