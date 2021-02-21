import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { getOneOrderForDriver } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";
import { DriverReceived, LeftIcon } from "../../../images/icons";
import { StyledLink } from "../../../components/Reusable/Link";

const OrdersToFulFillDetails = () => {
    let params = useParams();
    let orderID = params.orderid;
    const [orderData, setOrderData] = useState();
    const [buyerDetails, setBuyerDetails] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOneOrderForDriver(orderID);
            setBuyerDetails(data[0]);

            setOrderData(data);
        };
        fetchData();
    }, []);

    return (
        <Container>
            {!orderData ? (
                <Loading />
            ) : (
                <>
                    <BackToOrder to="/dashboard/driver/orders">
                        <LeftIcon stroke={theme.primary} />
                        Deliveries
                    </BackToOrder>
                    <CustomerDetails>
                        <Customer>
                            <h1>{buyerDetails.name}</h1>
                            <p>
                                These are the products that you need to pick up
                                to complete this order. Go to{" "}
                                <StyledLink
                                    style={{
                                        background: "none",
                                        border: "none",
                                        margin: 0,
                                        padding: 0,
                                        display: "inline-block",
                                    }}
                                    to="/dashboard/driver/assigned-pickups">
                                    Pickups
                                </StyledLink>{" "}
                                page if you would like to pick up items from
                                Artists in batches.
                            </p>
                            <Address>
                                <Customer>
                                    <h3>Delivery Address</h3>
                                    <p>{buyerDetails.shipping_address}</p>
                                </Customer>
                            </Address>
                        </Customer>
                    </CustomerDetails>
                    <ArtistContainer>
                        <ArtistNameBar>
                            <h2>{buyerDetails.username}</h2>
                        </ArtistNameBar>
                        <RowContainer>
                            <ArtistOrder>
                                <h3>Delivery Notes</h3>
                                <p>
                                    {buyerDetails.delivery_notes === null
                                        ? "No delivery notes given."
                                        : buyerDetails.delivery_notes === ""
                                        ? "No delivery notes given."
                                        : buyerDetails.delivery_notes}
                                </p>
                            </ArtistOrder>
                            <Address>
                                <ArtistOrder>
                                    <h3>Pickup Address</h3>
                                    <p>{buyerDetails.address}</p>
                                </ArtistOrder>
                                <Directions>
                                    <a
                                        rel={"external"}
                                        target="_blank"
                                        href={`https://www.google.com/maps?saddr&daddr=${buyerDetails.address}`}>
                                        Directions
                                    </a>
                                </Directions>
                            </Address>
                        </RowContainer>

                        <OrderItemContainer>
                            {orderData.map((order) => {
                                return (
                                    <ProductCard
                                        key={
                                            order.id + order.title + order.size
                                        }>
                                        <img
                                            src={`https://versabucket.s3.us-east-2.amazonaws.com/images/${order.thumbnail}.jpeg`}
                                            alt={order.title}
                                        />
                                        <Details>
                                            <h4>{order.title}</h4>
                                            <RowContainer>
                                                <Size>
                                                    {order.size === "O"
                                                        ? "One Colour"
                                                        : order.size}
                                                </Size>
                                                <p>
                                                    {order.color === "O"
                                                        ? "One Colour"
                                                        : order.color}
                                                </p>
                                            </RowContainer>
                                            <QuantityStatus>
                                                <Quantity>
                                                    {order.quantity}
                                                </Quantity>
                                                <SetAsPicked>
                                                    <DriverReceived />
                                                </SetAsPicked>
                                            </QuantityStatus>
                                        </Details>
                                    </ProductCard>
                                );
                            })}
                        </OrderItemContainer>
                    </ArtistContainer>
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
    padding: 4em 2em 2em calc(2em + 66px);
    h1 {
        margin: 0 1em 1em 0em;
    }

    p {
        ::first-of-type {
            margin-bottom: 1em;
        }
    }
    h3 {
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 0.01em;
        margin-bottom: 0.5em;
    }
`;

const CustomerDetails = styled.article`
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 2em 0;
`;

const Address = styled.div`
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ArtistContainer = styled.div`
    border-radius: 15px 15px 0px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    background: ${theme.secondary};
    h2 {
        color: ${theme.secondary};
        margin-bottom: 0;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }
`;

const ArtistNameBar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px 40px;
    background: ${theme.primary};
    border-radius: 15px 15px 0px 0px;
`;

const ArtistOrder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 60px 60px 0 60px;
`;

const Customer = styled.div`
    h2 {
        margin-bottom: 0.8em;
        font-weight: 700;
        letter-spacing: 0.03em;
    }
    h3 {
        font-weight: 700;
        margin-bottom: 0.3em;
        text-transform: uppercase;
    }
    p {
        :last-of-type {
            margin-bottom: 0;
        }
    }
`;

const OrderItemContainer = styled.div`
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 60px 60px;
    h1 {
        margin: 0 1em 2em 1em;
        font-size: 100px;
    }
`;

const ProductCard = styled.div`
    border-radius: 16px;
    background: ${theme.background};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 60px 60px 0;
    padding: 0px;
    transition: background 0.3s ease;
    img {
        height: 300px;
        width: 300px;
        padding: 20px;
    }
    h4 {
        font-weight: 700;
        font-size: 18px;
        letter-spacing: 0.03em;
        text-transform: capitalize;
        margin-bottom: 8px;
    }

    :hover {
        background: ${theme.primary + 60};
    }
`;

const Details = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 20px 20px 20px;
`;

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    margin-bottom: 8px;
`;

const Size = styled.p`
    :after {
        content: ", ";
    }
`;
const Quantity = styled.p`
    font-size: 2em;
    :after {
        content: none;
    }
`;

const SetAsPicked = styled.button.attrs((props) => ({
    type: props.type || "button",
}))`
    outline: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
    background: ${theme.primary};
    cursor: pointer;
    border-radius: 8px;
    border: none;
    transition: background 0.3s ease;
    :hover {
        background: ${theme.primaryHover};
    }
`;

const QuantityStatus = styled(RowContainer)`
    justify-content: space-between;
    width: 100%;
`;

const Directions = styled(SetAsPicked)`
    margin-top: 60px;
    a {
        color: white;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
`;
