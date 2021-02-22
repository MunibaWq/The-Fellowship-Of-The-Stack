import React from "react";
import { ThemeProvider } from "styled-components";
// import SearchResults from "./pages/UserBuyer/SearchResults";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Events from "./pages/Events/Events";
import Account from "./pages/Account";
import Wishlist from "./pages/UserBuyer/Wishlist";
import ShoppingCart from "./pages/ShoppingCart";
import CreateAccount from "./pages/Shared/CreateAccount";
import EditAccount from "./pages/Shared/EditAccount";
import Login from "./pages/Shared/Login";
import Dashboard from "./pages/Artist/Dashboard/Dashboard";
import EventPage from "./components/Events/EventPage";
import { PrivateRoute } from "./components/Reusable/PrivateRoute";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import ComingSoon from "./pages/Shared/ComingSoon";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop/Shop";
import LightTheme from "./components/Redesign/Reusable/Theme";
import ProductPage from "./pages/Shop/ProductPage";
if (!window.localStorage.getItem("session")) {
    window.localStorage.setItem(
        "session",
        Math.random().toString(36).substr(2, 9)
    );
}

function App() {
    return (
        <ThemeProvider theme={LightTheme}>
            <Router>
                <Navbar />

                <div style={{ minHeight: "49vh" }}>
                    <Switch>
                        <Route exact path="/" component={Shop} />
                        <Route exact path="/home" component={Shop} />
                        <Route exact path="/shop" component={Shop} />
                        <Route exact path="/events" component={Events} />
                        <Route exact path="/account" component={Account} />
                        <Route exact path="/contact" component={Contact} />
                        <PrivateRoute
                            path="/wishlist"
                            exact
                            component={Wishlist}
                        />
                        <Route
                            path="/shopping-cart"
                            exact
                            component={ShoppingCart}
                        />

                        <Route
                            path="/product-item/:id"
                            component={ProductPage}
                        />
                        <Route path="/events/:id" component={EventPage} />

                        <Route
                            path="/create-account"
                            component={CreateAccount}
                        />

                        <PrivateRoute
                            path="/edit-account"
                            component={EditAccount}
                        />

                        <Route path="/log-in" component={Login} />

                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/coming-soon" component={ComingSoon} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
                <Footer />
            </Router>
        </ThemeProvider>
    );
}

export default App;
