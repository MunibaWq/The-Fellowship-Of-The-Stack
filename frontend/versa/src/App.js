import React from "react";
import SearchResults from "./pages/UserBuyer/SearchResults";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import Account from "./pages/Account";
import Wishlist from "./pages/UserBuyer/Wishlist";
import ShoppingCart from "./pages/UserBuyer/ShoppingCart";
import ProductItem from "./pages/UserBuyer/ProductItem";
import AddProduct from "./pages/Artist/AddProduct";
import EditProduct from "./pages/Artist/EditProduct";
import CreateAccount from "./pages/Artist/CreateAccount";

function App() {
    return (
        <Router>
            <Navbar />
            <div style={{ overflowX: "hidden" }}>
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
                    <Route path="/products/edit/:id" component={EditProduct} />
                    <Route path="/artists/create-account" component={CreateAccount} />

                </Switch>
            </div>
        </Router>
    );
}

export default App;
