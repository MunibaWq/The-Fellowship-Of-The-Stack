import styled from "styled-components";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import DashboardMain from "./DashboardMain";
import ShopperDashboardMain from "../../UserBuyer/Dashboard/DashboardMain";
import SideNav from "./SideNav";
import Orders from "./Orders";
import Categories from "./Categories";
import Inventory from "./Inventory";
import AvgOrderValue from "./AvgOrderValue";
import Messages from "./Messages";
import Notifications from "./Notifications";
import SalesByProduct from "./SalesByProduct";
import Settings from "./Settings";
import TotalOrders from "./TotalOrders";
import TotalSales from "./TotalSales";
import DashboardEvents from "./DashboardEvents";
import { useState } from "react";
import AddProduct from "../AddProduct";
import EditProduct from "../EditProduct";
import EditEvent from "../EditEvent";
import CreateEvent from "../CreateEvent";
import OrderItems from "./OrderItems";
import Cookies from "universal-cookie";
import DashboardHome from "../../Driver/Dashboard/DashboardHome";
import { PrivateRoute } from "../../../components/Reusable/PrivateRoute";
import DriverMap from "../../../components/Dashboard/DriverMap";
import OrdersToDeliver from "../../Driver/Dashboard/OrdersToDeliver";
import OrdersToFulfillDetails from "../../Driver/Dashboard/OrdersToFulfillDetails";
import PastDeliveries from "../../Driver/Dashboard/PastDeliveries";
import NotFound from "../../NotFound";
import EventsAttending from "../../UserBuyer/Dashboard/EventsAttending";
import OrderTracking from "../../UserBuyer/Dashboard/OrderTracking";
import PastDeliveryDetails from "../../Driver/Dashboard/PastDeliveryDetails";
import AssignedPickups from "../../Driver/Dashboard/AssignedPickups";
import ShopperOrderItems from "../../UserBuyer/Dashboard/OrderItems";
import AssignedPickupDetails from "../../Driver/Dashboard/AssignedPickupDetails";
import Deliveries from "../../Driver/Dashboard/Deliveries";
const cookies = new Cookies();
const Redirecter = () => {
    window.location = "/account";
};
const DashboardLanding = () => {
    return (
        <h1>
            Here we can give information about the dashboard and have useful
            links for all user types
        </h1>
    );
};
const Dashboard = () => {
    const [navWidth, setNavWidth] = useState(0);
    // const params = useParams();
    // let id = params.id;
    // let orderid = params.orderid;
    return (
        <Router>
            <Container width={navWidth}>
                <SideNavDiv>
                    <SideNav navWidth={navWidth} setNavWidth={setNavWidth} />
                </SideNavDiv>
                <Switch>
                    <PrivateRoute
                        path="/dashboard"
                        exact
                        component={DashboardLanding}
                    />
                    <PrivateRoute
                        path="/dashboard/artist"
                        exact
                        component={DashboardMain}
                    />
                    <PrivateRoute
                        path="/dashboard/artist/orders"
                        exact
                        component={Orders}
                    />
                    <PrivateRoute
                        path="/dashboard/artist/inventory"
                        exact
                        component={Inventory}
                    />

                    <PrivateRoute
                        path="/dashboard/driver"
                        exact
                        component={DashboardHome}
                    />

                    <PrivateRoute
                        path="/dashboard/artist/categories"
                        exact
                        component={Categories}
                    />
                    <PrivateRoute
                        exact
                        path="/dashboard/artist/recent-orders/"
                        component={Orders}
                    />
                    <PrivateRoute
                        path="/dashboard/notifications"
                        exact
                        component={Notifications}
                    />
                    <PrivateRoute
                        path="/dashboard/messages"
                        exact
                        component={Messages}
                    />
                    <PrivateRoute
                        path="/dashboard/settings"
                        exact
                        component={Settings}
                    />
                    <PrivateRoute
                        path="/dashboard/artist/manage-events"
                        exact
                        component={DashboardEvents}
                    />
                    <PrivateRoute
                        path="/dashboard/artist/total-sales/"
                        exact
                        component={TotalSales}
                    />
                    <PrivateRoute
                        path="/dashboard/artist/total-orders/"
                        exact
                        component={TotalOrders}
                    />
                    <PrivateRoute
                        path="/dashboard/artist/average-order-value/"
                        exact
                        component={AvgOrderValue}
                    />
                    <PrivateRoute
                        path="/dashboard/artist/sales-by-products/"
                        exact
                        component={SalesByProduct}
                    />

                    <PrivateRoute
                        path="/dashboard/artist/products/create"
                        component={AddProduct}
                    />
                    <PrivateRoute
                        path="/dashboard/artist/products/edit/:id"
                        component={EditProduct}
                    />
                    <PrivateRoute
                        path="/dashboard/artist/events/create"
                        component={CreateEvent}
                    />
                    <PrivateRoute
                        path="/dashboard/artist/events/edit/:id"
                        component={EditEvent}
                    />
                    <PrivateRoute
                        path="/dashboard/artist/recent-orders/:orderid"
                        component={OrderItems}
                    />
                    <PrivateRoute
                        exact
                        path="/dashboard/driver/orders"
                        component={OrdersToDeliver}
                    />
                    <PrivateRoute
                        path="/dashboard/driver/orders/:orderid"
                        component={OrdersToFulfillDetails}
                    />
                    <PrivateRoute
                        path="/dashboard/driver/delivery-history"
                        component={PastDeliveries}
                    />
                    <PrivateRoute
                        path="/dashboard/driver/past/:orderid"
                        component={PastDeliveryDetails}
                    />
                    <PrivateRoute
                        exact
                        path="/dashboard/driver/assigned-pickups/"
                        component={AssignedPickups}
                    />
                    <PrivateRoute
                        exact
                        path="/dashboard/driver/deliveries/"
                        component={Deliveries}
                    />
                    <PrivateRoute
                        path="/dashboard/driver/assigned-pickups/:artistid"
                        component={AssignedPickupDetails}
                    />
                    <PrivateRoute
                        path="/dashboard/shopper/events-attending"
                        component={EventsAttending}
                    />
                    <PrivateRoute
                        exact
                        path="/dashboard/shopper/order-tracking/"
                        component={OrderTracking}
                    />
                    <PrivateRoute
                        exact
                        path="/dashboard/shopper/"
                        component={ShopperDashboardMain}
                    />
                    <PrivateRoute
                        path="/dashboard/shopper/order-tracking/:orderid"
                        component={ShopperOrderItems}
                    />
                    <PrivateRoute component={NotFound} />
                </Switch>
            </Container>
        </Router>
    );
};

export default Dashboard;
const Container = styled.div`
    display: flex;
`;
// const DashboardMainDiv = styled.div`
//     grid-column: 2;
// `;

const SideNavDiv = styled.div`
    grid-column: 1;
    position: absolute;
    z-index: 9;
`;
