import React from "react";
import SearchResults from "./pages/Search/SearchResults";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Events from "./pages/Events/Events";
import Account from "./pages/Account/Events";
import Wishlist from "./pages/Wishlist/Wishlist";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import ProductItem from "./pages/ProductItem/ProductItem";
import AddProduct from './pages/AddProduct/AddProduct'

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={SearchResults} />
                    <Route path="/shop" exact component={SearchResults} />
                    <Route path="/events" exact component={Events} />
                    <Route path="/account" exact component={Account} />
                    <Route path="/wishlist" exact component={Wishlist} />
                    <Route
                        path="/shopping-cart"
                        exact
                        component={ShoppingCart}
                    />
                    <Route path="/product-item/:id" component={ProductItem} />
                    <Route path="/products/create" component={AddProduct} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
