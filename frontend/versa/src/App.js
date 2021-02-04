import React from "react";
import SearchResults from "./pages/UserBuyer/SearchResults";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import Account from "./pages/Account";
import Wishlist from "./pages/UserBuyer/Wishlist";
import ShoppingCart from "./pages/UserBuyer/ShoppingCart";
import ProductItem from "./pages/UserBuyer/ProductItem";
import CreateAccount from "./pages/Artist/CreateAccount";
import ArtistLogIn from "./pages/Artist/ArtistLogIn";
import Dashboard from "./pages/Artist/Dashboard/Dashboard";
import EventItem from "./pages/EventItem";

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
                    <Route path="/events/:id" component={EventItem} />

                    <Route
                        path="/artists/create-account"
                        component={CreateAccount}
                    />
                    <Route path="/artists/log-in" component={ArtistLogIn} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
