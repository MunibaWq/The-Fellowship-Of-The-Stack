import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardMain from "./DashboardMain";
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

const Dashboard = () => {
    const [navWidth, setNavWidth] = useState(0);
    return (
        <Router>
            <Container width={navWidth}>
                <SideNavDiv>
                    <SideNav setNavWidth={setNavWidth} />
                </SideNavDiv>
                <Switch>
                    <Route path="/dashboard" exact component={DashboardMain} />
                    <Route path="/dashboard/orders" exact component={Orders} />
                    <Route
                        path="/dashboard/inventory"
                        exact
                        component={Inventory}
                    />
                    <Route
                        path="/dashboard/categories"
                        exact
                        component={Categories}
                    />
                    <Route path="/dashboard/orders" exact component={Orders} />
                    <Route
                        path="/dashboard/notifications"
                        exact
                        component={Notifications}
                    />
                    <Route
                        path="/dashboard/messages"
                        exact
                        component={Messages}
                    />
                    <Route
                        path="/dashboard/settings"
                        exact
                        component={Settings}
                    />
                    <Route
                        path="/dashboard/manage-events"
                        exact
                        component={DashboardEvents}
                    />
                    <Route
                        path="/dashboard/total-sales"
                        exact
                        component={TotalSales}
                    />
                    <Route
                        path="/dashboard/total-orders"
                        exact
                        component={TotalOrders}
                    />
                    <Route
                        path="/dashboard/average-order-value"
                        exact
                        component={AvgOrderValue}
                    />
                    <Route
                        path="/dashboard/sales-by-product"
                        exact
                        component={SalesByProduct}
                    />

                    <Route
                        path="/dashboard/products/create"
                        component={AddProduct}
                    />
                    <Route
                        path="/dashboard/products/edit/:id"
                        component={EditProduct}
                    />
                    <Route
                        path="/dashboard/events/create"
                        component={CreateEvent}
                    />
                    <Route
                        path="/dashboard/events/edit/:id"
                        component={EditEvent}
                    />
                </Switch>
            </Container>
        </Router>
    );
};

export default Dashboard;
const Container = styled.div`
    display: grid;
    grid-template-columns: ${(props) => props.width}px auto;
`;
// const DashboardMainDiv = styled.div`
//     grid-column: 2;
// `;

const SideNavDiv = styled.div`
    grid-column: 1;
`;
