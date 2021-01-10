import React from "react";
import ProductItem from "./pages/ProductItem/ProductItem";
// import Product from "./redux/Product";
import Theme from "./toolbox/constants";
import SearchResults from "./pages/Search/SearchResults";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Events from "./pages/Events/Events";
import Account from "./pages/Account/Events";
import Wishlist from "./pages/Wishlist/Wishlist";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";

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
                    <Route path="/events" exact component={Events} />
                    <Route path="/account" exact component={Account} />
                    <Route path="/wishlist" exact component={Wishlist} />
                    <Route
                        path="/shopping-cart"
                        exact
                        component={ShoppingCart}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
