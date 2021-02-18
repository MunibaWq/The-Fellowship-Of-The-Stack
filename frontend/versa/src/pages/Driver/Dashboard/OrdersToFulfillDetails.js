import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getOneDelivery } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";
import { LeftIcon } from "../../../images/icons";
import { StyledLink } from "../../../components/Reusable/Link";
import OrdersToFulfillCard from "../../../components/Dashboard/Driver/OrdersToFulfillCard";

const OrdersToFulFillDetails = () => {
    let params = useParams();
    let orderID = params.orderid;
    const [orderData, setOrderData] = useState();
    const [buyerDetails, setBuyerDetails] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOneDelivery(orderID);
            setBuyerDetails(data[0]);

            setOrderData(data);
        };
        fetchData();
    }, []);
    console.log("od", orderData);
    console.log("bd", buyerDetails);

    return (
        <Container>
            {!orderData ? (
                <Loading />
            ) : (
                <>
                    <BackToOrder to="/dashboard/driver/orders">
                        <LeftIcon stroke={theme.primary} />
                        Back to Orders
                    </BackToOrder>
                    <h1>Order #{orderID}</h1>

                    <OrderItemContainer>
                        <BuyerDetails>
                            <NumItems>
                                <p>Profile Image</p>
                            </NumItems>
                            <Buyer>
                                <h2>{buyerDetails.name}</h2>
                                <h4>Order ID</h4>
                                <p>{buyerDetails.id}</p>
                                <h4>Phone Number</h4>
                                <p>
                                    {buyerDetails.phone === null
                                        ? "No phone number provided"
                                        : buyerDetails.phone}
                                </p>

                                <h4>Shipping Address</h4>
                                <p>{buyerDetails.shipping_address}</p>

                                {buyerDetails.delivery_notes && (
                                    <>
                                        <h2>Note</h2>
                                        <p>{buyerDetails.delivery_notes}</p>
                                    </>
                                )}
                            </Buyer>
                        </BuyerDetails>
                        {orderData.map((order) => {
                            return (
                                <div>
                                    <OrdersToFulfillCard
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

export default OrdersToFulFillDetails;

const BackToOrder = styled(StyledLink)`
    margin-left: -0.5em;
    margin-bottom: 1em;

    background: none;
    border-bottom: none;
`;

const Container = styled.div`
    background: ${theme.background};
    display: flex;
    width: 100vw;
    flex-direction: column;
    padding: 2em 2em 2em calc(2em + 66px);
    h1 {
        margin: 0 1em 2em 1em;
    }
`;

const BuyerDetails = styled.article`
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #6495ed60;

    padding: 2em;
    box-shadow: 3px 3px 10px rgba(27, 49, 66, 0.13);
    border-radius: 15px;
    :hover {
        box-shadow: 7px 7px 30px rgba(27, 49, 66, 0.13);
    }
`;

const NumItems = styled.div`
    display: grid;
    place-items: center;
    background-color: ${theme.secondary};
    min-width: 100px;
    min-height: 100px;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50%;
    p {
        margin: 0;
    }
    margin: 0 1em 0 0;
`;

const Buyer = styled.div`
    h2 {
        margin-bottom: 0.8em;
        font-weight: 700;
        letter-spacing: 0.03em;
    }
    h4 {
        font-weight: 700;
        margin-bottom: 0.3em;
    }
    p {
        :last-of-type {
            margin-bottom: 0;
        }
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
