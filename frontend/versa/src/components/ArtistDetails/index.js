import React from "react";
import styled from "styled-components";
import { ArrowRight } from "../../images/icons";
import Image from "../../images/imageTest.png";

const index = () => {
    return (
        <ArtistContainer>
            <ProfileName>
                <Profile src={Image} alt="image" />
                <Name>Artist Name</Name>
            </ProfileName>
            <Description>
                Brief paragraph describing artist and their passions and history
                and their relation to Calgary.
            </Description>
            <StoreLink>
                <h6>See artist's store</h6>
                <Arrow svg={ArrowRight} />
            </StoreLink>
            <InquiryCustomOrder>
                <ProductInquiry>Product Inquiry</ProductInquiry>
                <CustomOrder>Custom Order</CustomOrder>
            </InquiryCustomOrder>
        </ArtistContainer>
    );
};

export default index;

const ArtistContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const ProfileName = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
`;

const Profile = styled.img`
    border-radius: 50%;
    width: 60px;
    height: 60px;
    padding-right: 20px;
`;

const Name = styled.h6``;
const Description = styled.p`
    padding-bottom: 20px;
`;
const StoreLink = styled.div`
    padding-bottom: 20px;

    h6 {
        font-weight: bold;
        border-bottom: 3px solid #444444;
    }
`;

const Arrow = styled.div`
background-image: {svg};
`;
const InquiryCustomOrder = styled.div`
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
const ProductInquiry = styled.button`
    padding: 10px 20px;
    border: 3px solid #444444;
    border-radius: 50px;
    background-color: white;
    color: #444444;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
`;
const CustomOrder = styled.button`
    padding: 10px 20px;
    border: 3px solid #444444;
    border-radius: 50px;
    background-color: white;
    color: #444444;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
`;
