import React, { useState } from "react";
import styled from "styled-components";
import { sendMessage } from "../../../axios/posts";
import { SendIcon } from "../../../images/icons";
import Button from "../../Reusable/Button";

const UserOrderItemCard = ({ order }) => {
    console.log(order)
    const { artist_id, title, color, quantity, size, sale_price } = order;
    const [sent, setSent] = useState()
    const [message,setMessage] = useState()
    return (
        <Card>
            <Quantity>
                <p>{quantity}</p>
            </Quantity>
            <ItemDetails>
                <h3>{title}</h3>
                <Variation>
                    <h4>Colour:</h4>

                    <p>{color}</p>
                </Variation>
                <Variation>
                    <h4>Size:</h4>

                    <p>{size}</p>
                </Variation>
                <Variation>
                    <h4>Each:</h4>

                    <p>${(+sale_price).toFixed(2)}</p>
                </Variation>
                <Variation>
                    <h4>Total:</h4>

                    <p>${(+sale_price * +quantity).toFixed(2)}</p>
                </Variation>
            </ItemDetails>
            <Message>
                <div>
                    <h2>Message</h2>
                    Send the artist a message about this order
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
                                // let order = orderData[0];
                                setSent(true);
                                
                                sendMessage(
                                    `Order #${order.id}`,
                                    order.artist_id,
                                    "B2A",
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
        </Card>
    );
}; 

export default UserOrderItemCard;
const Message = styled.div`
padding: 1em 1em 1em 2em;
textarea {
    width: 100%;
    height: 100px;
    resize:none;
}
h2 {
    font-weight: 700;
}
`;
const Card = styled.article`
    border-radius: 15px;
    padding: 1em;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #fff;
    box-shadow: 3px 3px 10px rgba(27, 49, 66, 0.13);
    border-radius: 15px;
    :hover {
        box-shadow: 7px 7px 30px rgba(27, 49, 66, 0.13);
    }

    transition: 0.3s;
`;

const ItemDetails = styled.div`
    h3 {
        font-weight: 700;
        margin-bottom: 0.8em;
    }
`;

const Quantity = styled.div`
    padding: 1em;
    p {
        font-size: 60px;
    }
`;

const Variation = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.3em;
    :last-of-type {
        margin-bottom: 0;
    }

    h4 {
        margin-right: 8px;
        font-weight: 700;
    }
    p {
        margin: 0;
        line-height: 0;
        width: max-content;
    }
`;
