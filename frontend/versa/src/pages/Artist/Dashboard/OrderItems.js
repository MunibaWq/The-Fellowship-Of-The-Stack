import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getOneOrder } from "../../../axios/gets";
import OrderItemCard from "../../../components/Dashboard/AnalyticsTables/OrderItemCard";
import Loading from "../../../components/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";

const OrderItems = () => {
    let params = useParams();
    let orderID = params.orderid;

    const [orderData, setOrderData] = useState();
    const [buyerDetails, setBuyerDetails] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const data = await getOneOrder(orderID);
            setBuyerDetails(data[0]);
            setOrderData(data);
        };
        fetchData();
    }, []);
    console.log("i", orderData);
    console.log("i", buyerDetails);

    return (
        <Container>
            {!orderData ? (
                <Loading />
            ) : (
                <>
                    <h1>Order #{orderID}</h1>

                    <OrderItemContainer>
                        <BuyerDetails>
                            <h2>Customer</h2>
                            <p>{buyerDetails.name}</p>
                            <h2>Phone Number</h2>
                            <p>{buyerDetails.phone}</p>
                            {buyerDetails.pickup === false ? (
                                <>
                                    <h2>Shipping Address</h2>
                                    <p>{buyerDetails.shipping_address}</p>
                                </>
                            ) : (
                                <>
                                    <h2>Note</h2>
                                    <p>Customer will pick this order up</p>
                                </>
                            )}
                            {buyerDetails.delivery_notes && (
                                <>
                                    <h2>Note</h2>
                                    <p>{buyerDetails.delivery_notes}</p>
                                </>
                            )}
                        </BuyerDetails>
                        {orderData.map((order) => {
                            return (
                                <div>
                                    <OrderItemCard
                                        order={order}
                                        key={order.orderID}
                                    />
                                </div>
                            );
                        })}
                    </OrderItemContainer>
                </>
            )}
        </Container>
    );
};

export default OrderItems;

const Container = styled.div`
    background: ${theme.background};
    display: flex;
    flex-direction: column;
    padding: 2em 2em 2em calc(2em + 66px);
    h1 {
        margin: 0 1em 2em 1em;
    }
`;

const BuyerDetails = styled.article`
    position: sticky;
    top: 0;
    background: #fff;
    padding: 1em;
    box-shadow: 3px 3px 10px rgba(27, 49, 66, 0.13);
    border-radius: 15px;
    :hover {
        box-shadow: 7px 7px 30px rgba(27, 49, 66, 0.13);
    }
`;

const OrderItemContainer = styled.div`
    position: relative;
    padding: 2em 0;
    display: grid;
    grid-row-gap: 30px;
    grid-column-gap: 50px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 400px));
    h1 {
        margin: 0 1em 2em 1em;
        font-size: 100px;
    }
`;
