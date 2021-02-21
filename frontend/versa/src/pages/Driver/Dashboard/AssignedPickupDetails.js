import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getOneAssignedPickup } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";
import { DriverPicked, DriverReceived, LeftIcon } from "../../../images/icons";
import { StyledLink } from "../../../components/Reusable/Link";

const AssignedPickupDetails = () => {
    let params = useParams();
    let artistID = params.artistid;
    const [orderData, setOrderData] = useState();
    const [artistDetails, setArtistDetails] = useState();
    const [itemReceived, setItemReceived] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOneAssignedPickup(artistID);
            setArtistDetails(data[0]);

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
                    <BackToOrder to="/dashboard/driver/assigned-pickups">
                        <LeftIcon stroke={theme.primary} />
                        Pickups
                    </BackToOrder>
                    <ArtistDetails>
                        <Artist>
                            <h1>{artistDetails.username}</h1>
                            <p>
                                These are the products that you need to pick up
                                from this artist for all your deliveries today.
                                Mark them as received so that you can track of
                                your progress.
                            </p>
                            <Address>
                                <Artist>
                                    <h3>Pickup Address</h3>
                                    <p>{artistDetails.address}</p>
                                </Artist>

                                <Directions>
                                    <a
                                        rel={"noreferrer"}
                                        target="_blank"
                                        href={`https://www.google.com/maps?saddr&daddr=${artistDetails.address}`}>
                                        Directions
                                    </a>
                                </Directions>
                            </Address>
                        </Artist>
                    </ArtistDetails>
                    <BuyerContainer>
                        <BuyerNameBar>
                            <h2>{artistDetails.name}</h2>
                        </BuyerNameBar>
                        <RowContainer>
                            <BuyerOrder>
                                <h3>Delivery Address</h3>
                                <p>{artistDetails.shipping_address}</p>
                            </BuyerOrder>
                            <BuyerOrder>
                                <h3>Delivery Notes</h3>
                                <p>
                                    {artistDetails.delivery_notes === null
                                        ? "No delivery notes given."
                                        : artistDetails.delivery_notes === ""
                                        ? "No delivery notes given."
                                        : artistDetails.delivery_notes}
                                </p>
                            </BuyerOrder>
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
                                                <Size>{order.size}</Size>
                                                <p>{order.color}</p>
                                            </RowContainer>
                                            <QuantityStatus>
                                                <Quantity>
                                                    {order.quantity}
                                                </Quantity>
                                                {order.driver_status ===
                                                "Picked" ? (
                                                    <SetAsPicked
                                                        onClick={() =>
                                                            setItemReceived(
                                                                false
                                                            )
                                                        }
                                                        status={itemReceived}>
                                                        <DriverPicked />
                                                    </SetAsPicked>
                                                ) : (
                                                    <SetAsPicked
                                                        onClick={() =>
                                                            setItemReceived(
                                                                true
                                                            )
                                                        }>
                                                        <DriverReceived />
                                                    </SetAsPicked>
                                                )}
                                            </QuantityStatus>
                                        </Details>
                                    </ProductCard>
                                );
                            })}
                        </OrderItemContainer>
                    </BuyerContainer>
                </>
            )}
        </Container>
    );
};

export default AssignedPickupDetails;

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

const ArtistDetails = styled.article`
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 2em 0;
`;

const Address = styled.div`
    margin: 20px 0;
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const BuyerContainer = styled.div`
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

const BuyerNameBar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px 40px;
    background: ${theme.primary};
    border-radius: 15px 15px 0px 0px;
`;

const BuyerOrder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 60px 60px 0 60px;
`;

const Artist = styled.div`
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
    a {
        color: white;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
`;
