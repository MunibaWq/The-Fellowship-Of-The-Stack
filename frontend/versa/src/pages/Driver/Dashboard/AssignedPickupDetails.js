import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getOneAssignedPickup } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";
import { DriverPicked, DriverReceived, LeftIcon } from "../../../images/icons";
import { StyledLink } from "../../../components/Reusable/Link";
import ProductPickup from "../../../components/Dashboard/Driver/ProductPickup";
import Header from "../../../components/Redesign/Reusable/Header";
import PageContainer from "../../../components/Redesign/Reusable/PageContainer";
import TopBar from "../../../components/Redesign/Reusable/TopBar";

const AssignedPickupDetails = () => {
    let params = useParams();
    let artistID = params.artistid;
    const [orderData, setOrderData] = useState();
    const [artistDetails, setArtistDetails] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOneAssignedPickup(artistID);
            setArtistDetails(data[0]);

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
                        title={artistDetails.username}
                        sub="These are the products that you need to pick up
                        from this artist for all your deliveries today.
                        Mark them as received so that you can track your
                        progress."
                        link="/dashboard/driver/assigned-pickups"
                        linkText="Pickups"
                    />

                    <ArtistDetails>
                        <Address>
                            <h3>Pickup Address</h3>
                            <p>{artistDetails.address}</p>
                        </Address>
                        <Directions>
                            <a
                                rel={"noreferrer"}
                                target="_blank"
                                href={`https://www.google.com/maps?saddr&daddr=${artistDetails.address}`}>
                                Directions
                            </a>
                        </Directions>
                    </ArtistDetails>
                    <BuyerContainer>
                        <TopBar title={artistDetails.name} />

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
                                    <ProductPickup
                                        order={order}
                                        key={
                                            order.single_id +
                                            order.title +
                                            order.size
                                        }
                                    />
                                );
                            })}
                        </OrderItemContainer>
                    </BuyerContainer>
                </>
            )}
        </PageContainer>
    );
};

export default AssignedPickupDetails;

const ArtistDetails = styled.article`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2em 0;
    width: 50%;
    h3 {
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 700;
    }
`;

const Address = styled.div`
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

const BuyerContainer = styled.div`
    border-radius: 15px 15px 0px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    background: ${(props) => props.theme.lightBlue};
    margin-bottom: 4em;
    h2 {
        color: ${theme.secondary};
        margin-bottom: 0;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }
    h3 {
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 700;
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

const Directions = styled(SetAsPicked)`
    a {
        color: white;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
`;
