import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getOneAssignedPickup } from "../../../axios/gets";
import Loading from "../../../components/Redesign/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";
import ProductPickup from "../../../components/Dashboard/Driver/ProductPickup";
import Header from "../../../components/Redesign/Reusable/Header";
import PageContainer from "../../../components/Redesign/Reusable/PageContainer";
import TopBar from "../../../components/Redesign/Reusable/TopBar";
import Button from "../../../components/Redesign/Reusable/Button";

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
        window.scrollTo({
            top: 0,
            left: 0,
        });
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
                        <Button secondarySmall>
                            <a
                                rel={"noreferrer"}
                                target="_blank"
                                href={`https://www.google.com/maps?saddr&daddr=${artistDetails.address}`}>
                                Directions
                            </a>
                        </Button>
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
    a {
        color: white;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
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
