import React from "react";
import { ThemeProvider } from "styled-components";
import ProductItem from "./pages/ProductItem/ProductItem";
// import Product from "./redux/Product";
import Theme from "./toolbox/constants";
import SearchResults from "./pages/Search/SearchResults";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";

function App() {
    // const currentPage = useSelector((state) => state.currentPage);
    // const currentProduct = useSelector((state) => state.selectedProduct);
    // let pageToShow;
    // console.log("App.js currentProduct", currentProduct);
    // switch (currentPage) {
    //     case "Search":
    //         pageToShow = <SearchResults />;
    //         break;
    //     case "ProductItem":
    //         pageToShow = <ProductItem currentProduct={currentProduct} />;
    //         break;
    //     default:
    //         pageToShow = <></>;
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/shop" exact component={SearchResults} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
