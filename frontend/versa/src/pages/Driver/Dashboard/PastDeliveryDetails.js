import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getOnePastDelivery } from "../../../axios/gets";
import Loading from "../../../components/Redesign/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";
import { DriverPicked, DriverReceived, LeftIcon } from "../../../images/icons";
import Header from "../../../components/Redesign/Reusable/Header";
import PageContainer from "../../../components/Redesign/Reusable/PageContainer";
import TopBar from "../../../components/Redesign/Reusable/TopBar";

const PastDeliveryDetails = () => {
    let params = useParams();
    let orderID = params.orderid;
    const [orderData, setOrderData] = useState();
    const [buyerDetails, setBuyerDetails] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOnePastDelivery(orderID);
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
                        sub="These are the products that you delivered for
                this order."
                        link="/dashboard/driver/delivery-history"
                        linkText="Past Deliveries"
                    />

                    <CustomerDetails>
                        <h3>Delivery Address</h3>
                        <p>{buyerDetails.shipping_address}</p>
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

                            <ArtistOrder>
                                <h3>Pickup Address</h3>
                                <p>{buyerDetails.address}</p>
                            </ArtistOrder>
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
                                                    <DriverPicked />
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

export default PastDeliveryDetails;

const CustomerDetails = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-self: flex-start;
    width: 50%;
    padding: 2em 0;

    h3 {
        font-weight: 700;
        margin-bottom: 0.3em;
        text-transform: uppercase;
        font-size: 1.1em;
    }
    p {
        :last-of-type {
            margin-bottom: 0;
        }
    }
`;

const ArtistContainer = styled.div`
    border-radius: 15px 15px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    background: ${(props) => props.theme.lightBlue};
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
    padding: 60px 0;
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
    background: ${(props) => props.theme.blue};
    :hover {
        background: ${(props) => props.theme.orange};
    }
    transition: background 0.3s ease;
    img {
        width: 300px;
        height: 300px;
        margin-top: 16px;
    }
    h4 {
        font-weight: 700;
        font-size: 18px;
        letter-spacing: 0.03em;
        text-transform: capitalize;
        margin-bottom: 8px;
    }
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    justify-items: flex-start;
    padding: 8px 8px 0 8px;
    width: 100%;
`;

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding: 0px;
    width: 100%;
`;

const Size = styled.p`
    :after {
        content: ", ";
    }
`;
const Quantity = styled.p`
    font-size: 2em;
    font-weight: 700 !important;
    letter-spacing: 0.03em;
    text-transform: capitalize;

    margin: 0;
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
    background: ${(props) => props.theme.green};
    border-radius: 8px;
    border: none;
    transition: background 0.3s ease;
    svg {
        path {
            stroke: ${(props) => props.theme.black};
        }
    }
`;

const QuantityStatus = styled(RowContainer)`
    justify-content: space-between;
    width: 100%;
`;
