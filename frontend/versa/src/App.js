import React from "react";
import SearchResults from "./pages/UserBuyer/SearchResults";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import Account from "./pages/Account";
import Wishlist from "./pages/UserBuyer/Wishlist";
import ShoppingCart from "./pages/UserBuyer/ShoppingCart";
import ProductItem from "./pages/UserBuyer/ProductItem";
import CreateAccount from "./pages/Shared/CreateAccount";
import EditAccount from "./pages/Shared/EditAccount";
import Login from "./pages/Shared/Login";
import Dashboard from "./pages/Artist/Dashboard/Dashboard";
import EventPage from "./components/Events/EventPage";
import { PrivateRoute } from "./components/Reusable/PrivateRoute";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Contact from './pages/Contact'
if (!window.localStorage.getItem("session")) {
    window.localStorage.setItem(
        "session",
        Math.random()
            .toString(36)
            .substr(2, 9)
    );
}
function App() {
    return (
        <Router>
            <Navbar />

            <div style={{ minHeight: "49vh" }}>
                <Switch>
                    <Route exact path="/" component={SearchResults} />
                    <Route path="/shop" exact component={SearchResults} />
                    <Route path="/events" exact component={Events} />
                    <Route path="/account" exact component={Account} />
                    <Route path="/contact" exact component={Contact}/>
                    <PrivateRoute path="/wishlist" exact component={Wishlist} />
                    <Route
                        path="/shopping-cart"
                        exact
                        component={ShoppingCart}
                    />

                    <Route path="/product-item/:id" component={ProductItem} />
                    <Route path="/events/:id" component={EventPage} />

                    <Route path="/create-account" component={CreateAccount} />

                    <PrivateRoute path="/edit-account" component={EditAccount} />

                    <Route path="/log-in" component={Login} />

                    <Route path="/dashboard" component={Dashboard} />
                    <Route component={NotFound} />
                </Switch>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
