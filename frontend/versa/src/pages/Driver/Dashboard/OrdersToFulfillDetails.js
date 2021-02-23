import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getOneOrderForDriver } from "../../../axios/gets";
import Loading from "../../../components/Redesign/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";
import { DriverReceived, LeftIcon } from "../../../images/icons";
import PageContainer from "../../../components/Redesign/Reusable/PageContainer";
import Header from "../../../components/Redesign/Reusable/Header";
import TopBar from "../../../components/Redesign/Reusable/TopBar";
import { StyledLink } from "../../../components/Redesign/Reusable/Link";

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
        <PageContainer>
            {!orderData ? (
                <Loading />
            ) : (
                <>
                    <Header
                        title={buyerDetails.name}
                        sub="These are the products that you need to pick up to complete this order. Mark each item as received as you pick them up so that you can track your progress"
                        link="/dashboard/driver/orders/"
                        linkText="Orders to Deliver"
                    />
                    <CustomerDetails>
                        <Customer>
                            <h3>Delivery Address</h3>
                            <p>{buyerDetails.shipping_address}</p>
                        </Customer>
                    </CustomerDetails>
                    <ArtistContainer>
                        <TopBar title={buyerDetails.username} />

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
                                <Directions secondarySmall>
                                    <a
                                        rel={"noreferrer"}
                                        target="_blank"
                                        href={`https://www.google.com/maps?saddr&daddr=${buyerDetails.address}`}>
                                        Directions
                                    </a>
                                </Directions>
                            </Address>
                        </RowContainer>

                        <OrderItemContainer>
                            {orderData.map((order) => {
                                console.log(order);
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
                                                        ? "One Size"
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
        </PageContainer>
    );
};

export default OrdersToFulFillDetails;

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
    width: 100%;
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
    margin: 16px 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 350px;
    padding: 25px;
    filter: ${(props) => (props.stock === 0 ? "grayscale(1)" : "grayscale(0)")};
    background: ${(props) =>
        props.featured ? props.theme.blue : props.theme.lightBlue};
    :hover {
        background: ${(props) =>
            props.stock === 0 ? props.theme.blue : props.theme.orange};
    }

    img {
        width: 300px;
        height: 300px;
        margin-top: 8px;
    }
`;

const Details = styled.div`
    margin: 8px 0;
    display: flex;
    flex-direction: column;
    justify-items: flex-start;
    padding: 8px;
    width: 100%;
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
    background: ${(props) => props.theme.purple};
    cursor: pointer;
    border-radius: 8px;
    border: none;
    color: ${(props) => props.theme.blue};
    transition: background 0.3s ease;
    :hover {
        background: ${(props) => props.theme.holo};
        svg {
            path {
                stroke: ${(props) => props.theme.black};
            }
        }
    }
`;

const QuantityStatus = styled(RowContainer)`
    justify-content: space-between;
    width: 100%;
`;

const Directions = styled(StyledLink)`
    margin-top: 60px;

    a {
        color: ${(props) => props.theme.blue};
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
`;
