import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getOneOrder } from "../../../axios/gets";
import OrderItemCard from "../../../components/Dashboard/AnalyticsTables/OrderItemCard";
import Loading from "../../../components/Redesign/Reusable/Loading";
// import theme from "../../../components/Redesign/Reusable/Theme";
import { StyledLink } from "../../../components/Reusable/Link";
import { LeftIcon, SendIcon } from "../../../images/icons";
import Button from "../../../components/Reusable/Button";
import { sendMessage } from "../../../axios/posts";
import PageContainer from "../../../components/Redesign/Reusable/PageContainer";
import TopBar from "../../../components/Redesign/Reusable/TopBar";
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
            const data = await getOneOrder(orderID);
            setBuyerDetails(data[0]);
            setOrderData(data);
        };
        fetchData();
    }, [orderID]);

    return (
        <PageContainer>
            <Container>
                {!orderData ? (
                    <Loading />
                ) : (
                    <>
                        <BackToOrder to="/dashboard/artist/recent-orders/">
                            <LeftIcon />
                            Back to Orders
                        </BackToOrder>

                        <Header
                            title={`Order #${orderID}`}
                            sub="These are the products that you need to fulfill your order. Mark them as fulfilled so that you can track of your progress."
                        />

                        <BuyerNameBar>
                            <h2>{buyerDetails.name}</h2>
                        </BuyerNameBar>
                        <OrderItemContainer>
                            <BuyerDetails>
                                <NumItems>
                                    <p>Profile Image</p>
                                </NumItems>
                                <Buyer>
                                    <h4>Phone Number</h4>
                                    <p>{buyerDetails.phone}</p>
                                    {buyerDetails.pickup === false ? (
                                        <>
                                            <h4>Shipping Address</h4>
                                            <p>
                                                {buyerDetails.shipping_address}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <h4>Note</h4>
                                            <p>
                                                Customer will pick this order up
                                            </p>
                                        </>
                                    )}
                                    {buyerDetails.delivery_notes && (
                                        <>
                                            <h2>Note</h2>
                                            <p>{buyerDetails.delivery_notes}</p>
                                        </>
                                    )}
                                </Buyer>
                            </BuyerDetails>
                            {orderData[0].buyer_id !== 9999 && (
                                <Message>
                                    <div>
                                        <h2>Message</h2>
                                        Send the customer a message about this
                                        order
                                        <div>
                                            <textarea
                                                value={message}
                                                onChange={(e) => {
                                                    setMessage(e.target.value);
                                                }}
                                            />
                                        </div>
                                        {!sent ? (
                                            <Button
                                                secondary
                                                onClick={() => {
                                                    let order = orderData[0];
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
                                            </Button>
                                        ) : (
                                            "Message Sent, check dashboard for responses"
                                        )}
                                    </div>
                                </Message>
                            )}
                            {orderData.map((order) => {
                                return (
                                    <OrderItemCard
                                        order={order}
                                        key={order.orderID}
                                    />
                                );
                            })}
                        </OrderItemContainer>
                    </>
                )}
            </Container>
        </PageContainer>
    );
};

export default OrderItems;
const Message = styled.article`
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #6495ed60;
    grid-column: 1;
    grid-row: 2;
    padding: 2em;
    box-shadow: 3px 3px 10px rgba(27, 49, 66, 0.13);
    border-radius: 15px;
    :hover {
        box-shadow: 7px 7px 30px rgba(27, 49, 66, 0.13);
    }
    h2 {
        margin-bottom: 0.8em;
        font-weight: 700;
        letter-spacing: 0.03em;
    }
    textarea {
        height: 200px;
        width: 330px;
        resize: none;
    }
`;
// const Container = styled.div`
//     background: ${theme.background};
//     display: flex;
//     width: 100vw;

//     flex-direction: column;
//     padding: 2em 2em 2em calc(2em + 66px);
//     h1 {
//         margin: 0 1em 2em 0em;
//     }
// `;

const Container = styled.div`
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

const BackToOrder = styled(StyledLink)`
    margin-left: -0.5em;
    margin-bottom: 1em;
    background: none;
    border-bottom: none;
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
    border-radius: 15px 15px 0px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    /* background: ${(props) => props.theme.black}; */
    h2 {
        color: ${(props) => props.theme.lightBlue};
        margin-bottom: 0;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }
`;

const BuyerNameBar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    background: ${(props) => props.theme.black};

    border-radius: 15px 15px 0px 0px;
    h2 {
        color: ${(props) => props.theme.lightBlue};
    }
`;

// const OrderItemContainer = styled.div`
//     position: relative;
//     padding: 2em 0;
//     display: grid;
//     grid-row-gap: 30px;
//     grid-column-gap: 50px;
//     grid-template-columns: repeat(auto-fit, minmax(250px, 400px));
//     h1 {
//         margin: 0 1em 2em 1em;
//         font-size: 100px;
//     }
// `;
