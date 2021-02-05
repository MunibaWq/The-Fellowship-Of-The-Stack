import React from "react";
import Pie from "../../../components/Dashboard/Pie";
import Table from "../../../components/Dashboard/Table";
import { salesByProductData, recentOrders } from "./data";

const SalesByProduct = (salesByProductData) => {
    return (
        <div>
            Sales By Product
            <Pie data={salesByProductData} />
            <Table data={recentOrders} title="Top Selling Products" />
        </div>
    );
};

export default SalesByProduct;
