import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getOneShopperOrder } from "../../../axios/gets";
import UserOrderItemCard from "../../../components/Dashboard/AnalyticsTables/UserOrderItemCard";
import Loading from "../../../components/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";
import { StyledLink } from "../../../components/Reusable/Link";
import { LeftIcon } from "../../../images/icons";
import PageContainer from "../../../components/Redesign/Reusable/PageContainer";

const OrderItems = () => {
    let params = useParams();
    let orderID = params.orderid;

    const [orderData, setOrderData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const data = await getOneShopperOrder(orderID);

            setOrderData(data);
        };
        window.scrollTo({
            top: 0,
            left: 0,
        });
        fetchData();
    }, [orderID]);
    return (
      
        <PageContainer>
            {!orderData ? (
                <Loading />
            ) : (
                <>
                    {/* <BackToOrder to="/dashboard/shopper/order-tracking/">
                        <LeftIcon stroke={theme.primary} />
                        Back to Orders
                    </BackToOrder> */}
                

                    <OrderItemContainer>
                        <BuyerDetails>
                            
                                <OrderInfo>
                                    <h2>Order #{orderData[0].id}</h2>
                                <h4>Total</h4>

                                <p>${orderData[0].order_total}</p>
                                <h4>Shipping Address</h4>

                                <p>{orderData[0].shipping_address}</p>
                                {/* {orderData[0].orderDate}
                                {orderData[0].shipping_address}
                                {orderData[0].delivery_notes} */}

                                {orderData[0].delivery_notes && (
                                    <>
                                        <h2>Note</h2>
                                        <p>{orderData[0].delivery_notes}</p>
                                    </>
                                )}
                            </OrderInfo>
                        </BuyerDetails>
                        {orderData.map((order) => {
                            return (
                                <div>
                                    <UserOrderItemCard
                                        order={order}
                                        key={order.orderID}
                                    />
                                </div>
                            );
                        })}
                    </OrderItemContainer>
                </>
            )}
        </PageContainer>
    );
};

export default OrderItems;

const Container = styled.div`
    background: ${theme.background};
    display: flex;
    width: 100vw;
    flex-direction: column;
    padding: 5em 2em;
    h1 {
        margin: 0 1em 2em 0em;
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

const OrderInfo = styled.div`
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
    grid-template-columns: repeat(auto-fit, minmax(250px, 600px));
    h1 {
        margin: 0 1em 2em 1em;
        font-size: 100px;
    }
`;
