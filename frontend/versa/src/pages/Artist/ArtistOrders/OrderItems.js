import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getOneOrderForDriver } from "../../../axios/gets";
import OrderItemCard from "../../../components/Dashboard/AnalyticsTables/OrderItemCard";
import Loading from "../../../components/Redesign/Reusable/Loading";
import { StyledLink } from "../../../components/Reusable/Link";
import { LeftIcon, SendIcon } from "../../../images/icons";
import Button from "../../../components/Redesign/Reusable/Button";
import { sendMessage } from "../../../axios/posts";
import PageContainer from "../../../components/Redesign/Reusable/PageContainer";

import Header from "../../../components/Redesign/Reusable/Header";

const OrderItems = () => {
    let params = useParams();
    let orderID = params.orderid;

    const [orderData, setOrderData] = useState();
    const [buyerDetails, setBuyerDetails] = useState();
    const [message, setMessage] = useState();
    const [sent, setSent] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOneOrderForDriver(orderID);
            setBuyerDetails(data[0]);
            setOrderData(data);
        };
        fetchData();
    }, [orderID]);

    return (
        <PageContainer style>
            {!orderData ? (
                <Loading />
            ) : (
                <>
                    {/* <BackToOrder to="/dashboard/artist/recent-orders/">
                        <LeftIcon />
                        Back to Orders
                    </BackToOrder> */}

                    <Header
                        title={`Order #${orderID}`}
                        sub="These are the products that you need to fulfill your order. Mark them as fulfilled so that you can track of your progress."
                        link="/dashboard/artist/recent-orders/"
                        linkText="Orders"
                    />

                    <BuyerNameBar>
                        <h2>{buyerDetails.name}</h2>
                    </BuyerNameBar>
                    <OrderItemContainer>
                        <BuyerDetails>
                            {/* <NumItems>
                                    <p>Profile Image</p>
                                </NumItems> */}
                            <Buyer>
                                <BuyerLeft>
                                    {/* <h4>Phone Number</h4> */}
                                    {/* <p>{buyerDetails.phone}</p> */}
                                    {buyerDetails.pickup === false ? (
                                        <>
                                            <h3>Delivery Address</h3>
                                            <p>
                                                {buyerDetails.shipping_address}
                                            </p>

                                            {buyerDetails.delivery_notes && (
                                                <>
                                                    <h3>Delivery Notes</h3>
                                                    <p>
                                                        {
                                                            buyerDetails.delivery_notes
                                                        }
                                                    </p>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <h3>For Pickup</h3>
                                            <h3>Delivery Notes</h3>
                                            <p>
                                                Customer will pick this order
                                                up.
                                            </p>
                                        </>
                                    )}
                                </BuyerLeft>
                                <BuyerRight>
                                    {orderData[0].buyer_id !== 9999 && (
                                        <Message>
                                            <div>
                                                <h2>
                                                    Connect with{" "}
                                                    {
                                                        buyerDetails.name.split(
                                                            " "
                                                        )[0]
                                                    }
                                                </h2>
                                                <p>
                                                    Got any questions about this
                                                    order? Get in touch!
                                                </p>

                                                <MessageBox>
                                                    <textarea
                                                        value={message}
                                                        placeholder="Message"
                                                        onChange={(e) => {
                                                            setMessage(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />

                                                    {!sent ? (
                                                        <SendButton
                                                            secondarySmall
                                                            onClick={() => {
                                                                let order =
                                                                    orderData[0];
                                                                setSent(true);
                                                                sendMessage(
                                                                    `Order #${order.id}`,
                                                                    order.buyer_id,
                                                                    "A2B",
                                                                    message,
                                                                    new Date().toUTCString()
                                                                );
                                                            }}>
                                                            <SendIcon />
                                                            Send
                                                        </SendButton>
                                                    ) : (
                                                        "Message Sent, check dashboard for responses"
                                                    )}
                                                </MessageBox>
                                            </div>
                                        </Message>
                                    )}
                                </BuyerRight>
                            </Buyer>
                        </BuyerDetails>
                        <OrderDataContainer>
                            {orderData.map((order) => {
                                console.log(order);
                                return (
                                    <ProductCard key={order.id + order.key}>
                                        <img
                                            src={`https://versabucket.s3.us-east-2.amazonaws.com/images/${order.thumbnail}.jpeg`}
                                            alt={order.title}
                                        />
                                        <OrderItemCard
                                            order={order}
                                            key={order.orderID}
                                        />
                                    </ProductCard>
                                );
                            })}
                        </OrderDataContainer>
                    </OrderItemContainer>
                </>
            )}
        </PageContainer>
    );
};

export default OrderItems;

const ProductCard = styled.div`
    border-radius: 16px;
    background: ${(props) => props.theme.blue};
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
        background: ${(props) => props.theme.orange};
    }
`;

const SendButton = styled(Button).attrs((props) => ({
    type: props.type || "button",
}))`
    margin-top: 1em;
    cursor: pointer;
    place-self: flex-end;
`;

const Message = styled.article`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    height: 100%;
    grid-column: 1;
    grid-row: 2;

    border-radius: 15px;
    div {
        h2 {
            color: ${(props) => props.theme.black};
            margin-bottom: 0.8em;
            letter-spacing: 0.03em;
            line-height: 1em;
        }
    }

    textarea {
        resize: none;
        /* width: 60%; */
        height: 200px;
        padding: 8px;
        outline: none;
        border-radius: 8px;
        font-family: inherit;
        margin-bottom: 1em;
        width: 100%;
        ::placeholder {
            color: ${(props) => props.theme.lightBlack};
        }
        border: ${(props) =>
            props.border === true
                ? `2px solid ${props.theme.green}`
                : `2px solid ${props.theme.black}`};
        :active,
        :hover,
        :focus {
            border: ${(props) =>
                props.border === true
                    ? `2px solid ${props.theme.green}`
                    : `2px solid ${props.theme.purple}`};
        }
    }
`;
const MessageBox = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;

    textarea {
        height: 200px;
        width: 100%;
        resize: none;
        border: none;
    }
`;

const BackToOrder = styled(StyledLink)`
    margin-left: -0.5em;
    margin-bottom: 1em;
    background: none;
    border-bottom: none;
`;

const NumItems = styled.div`
    display: grid;
    place-items: center;
    background-color: ${(props) => props.theme.black};
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

const BuyerDetails = styled.article`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2em;
    justify-content: center;
    width: 80%;
`;

const Buyer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    padding: 40px;
    width: 100%;

    background: ${(props) => props.theme.blue};
    border-radius: 15px;
`;
const BuyerLeft = styled.div`
    h3 {
        color: ${(props) => props.theme.black};
        font-size: 1.1em;
        margin-bottom: 0.8em;
        font-weight: 700;
        line-height: 3em;

        letter-spacing: 0.05em;
        text-transform: uppercase;
    }
    p {
        margin: -1.2em 0 1em 0;
    }
`;
const BuyerRight = styled.div`
    h2 {
        color: ${(props) => props.theme.black};
        margin-bottom: 0.8em;
        letter-spacing: 0.03em;
        line-height: 1em;
    }
    p {
        margin: 1em 0 1em 0;
    }
`;

const OrderItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    background: ${(props) => props.theme.lightBlue};
    width: 100%;
    h2 {
        color: ${(props) => props.theme.lightBlue};
        margin-bottom: 0;
        font-weight: 700;

        letter-spacing: 0.03em;
    }
`;

const BuyerNameBar = styled.div`
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px 40px;

    background: ${(props) => props.theme.black};

    border-radius: 15px 15px 0px 0px;
    h2 {
        color: ${(props) => props.theme.lightBlue};
        font-size: 36;
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }
`;

const OrderDataContainer = styled.div`
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
