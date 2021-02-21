import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { setProductAsPicked } from "../../../axios/puts";
import { DriverPicked, DriverReceived } from "../../../images/icons";
import theme from "../../Reusable/Colors";
import Loading from "../../Reusable/Loading";

const ProductPickup = ({ order }) => {
    const [itemReceived, setItemReceived] = useState();
    const [orderStatus, setOrderStatus] = useState(order.driver_status);
    console.log(order);
    useEffect(() => {
        if (itemReceived) {
            setProductAsPicked("Picked", order.single_id);
        }
        if (itemReceived === false) {
            setProductAsPicked(null, order.single_id);
        }
    }, [itemReceived]);
    return (
        <ProductCard>
            <img
                src={`https://versabucket.s3.us-east-2.amazonaws.com/images/${order.thumbnail}.jpeg`}
                alt={order.title}
            />
            <Details>
                <h4>{order.title}</h4>
                <RowContainer>
                    <Size>{order.size}</Size>
                    <p>{order.color}</p>
                </RowContainer>
                <QuantityStatus>
                    <Quantity>{order.quantity}</Quantity>

                    {orderStatus === "Picked" ? (
                        <SetAsPicked
                            onClick={() => {
                                setItemReceived(false);
                                setOrderStatus(null);
                            }}
                            status={itemReceived}>
                            <DriverPicked />
                        </SetAsPicked>
                    ) : (
                        <SetAsPicked
                            onClick={() => {
                                setItemReceived(true);
                                setOrderStatus("Picked");
                            }}>
                            <DriverReceived />
                        </SetAsPicked>
                    )}
                </QuantityStatus>
            </Details>
        </ProductCard>
    );
};

export default ProductPickup;

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
    align-items: flex-start;
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
    background: ${(props) =>
        props.status === true ? "#00D100" : theme.primary};
    cursor: pointer;
    border-radius: 8px;
    border: none;
    transition: background 0.3s ease;
    :hover {
        background: ${theme.primaryHover};
    }
    svg {
        path {
            stroke: ${theme.secondary};
        }
    }
`;

const QuantityStatus = styled(RowContainer)`
    justify-content: space-between;
    width: 100%;
`;
