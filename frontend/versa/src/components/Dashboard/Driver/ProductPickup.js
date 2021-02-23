import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { setProductAsPicked } from "../../../axios/puts";
import { DriverPicked, DriverReceived } from "../../../images/icons";

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
                            }}
                            status={itemReceived}>
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
    cursor: pointer;
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
    /* margin: 16px 0; */
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
    padding: 0px;
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
    background: ${(props) =>
        props.status === true ? props.theme.green : props.theme.purple};
    cursor: pointer;
    border-radius: 8px;
    border: none;
    transition: background 0.3s ease;
    :hover {
        background: ${(props) => props.theme.holo};
        svg {
            path {
                stroke: ${(props) => props.theme.black};
            }
        }
    }
    svg {
        path {
            stroke: ${(props) =>
                props.status === true ? props.theme.black : props.theme.blue};
        }
    }
`;

const QuantityStatus = styled(RowContainer)`
    justify-content: space-between;
    width: 100%;
`;

const CardContainer = styled.div`
    border-radius: 16px;
    margin: 16px 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 350px;
    padding: 25px;
    filter: ${(props) => (props.stock === 0 ? "grayscale(1)" : "grayscale(0)")};
    cursor: pointer;
    background: ${(props) =>
        props.featured ? props.theme.blue : props.theme.lightBlue};
    :hover {
        background: ${(props) =>
            props.stock === 0 ? props.theme.blue : props.theme.orange};
    }
`;

const Image = styled.img`
    width: 300px;
    height: 300px;
    margin-top: 8px;
    filter: ${(props) =>
        props.stock === 0 ? "grayscale(100%)" : "grayscale(0%)"};
`;

const orderInfo = styled.div`
    margin: 8px 0;
    display: flex;
    flex-direction: column;
    justify-items: flex-start;
    padding: 8px;
    width: 100%;
`;

const Title = styled.h3`
    font-size: 1em;
    font-weight: 700;
    text-transform: capitalize;
`;

const Detail = styled.p`
    font-size: 0.9em;
    text-transform: capitalize;
`;

const ImportantDetail = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const BigDetail = styled.p`
    font-size: 1.1em;
    font-weight: 700 !important;
    letter-spacing: 0.03em;
    text-transform: capitalize;
`;
const Action = styled.button.attrs((props) => ({
    type: props.type || "button",
}))`
    outline: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
    background: ${(props) =>
        props.stock === 0 ? props.theme.blue : props.theme.purple};
    cursor: ${(props) => (props.stock === 0 ? "default" : "pointer")};
    border-radius: 8px;
    border: none;
    transition: background 0.3s ease;
    :hover {
        background: ${(props) =>
            props.stock === 0 ? props.theme.blue : props.theme.holo};
        svg {
            path {
                stroke: ${(props) =>
                    props.stock === 0 ? props.theme.blue : props.theme.black};
            }
        }
    }
    svg {
        path {
            stroke: ${(props) => props.theme.blue};
        }
    }
`;
