import React from "react";
import styled from "styled-components";
import { Title } from "../../components/Reusable/Title";
import peopleMessaging from "../../images/peopleMessaging.svg";
import onLaptop from "../../images/onLaptop.svg";
import analytics from "../../images/analytics.svg";
import like from "../../images/like.svg";
import profileCard from "../../images/profileCard.svg";

const ComingSoon = () => {
    return (
        <div>
            <MainTitle>
                <Title>Features coming soon!</Title>
            </MainTitle>
            <BodyArea>
                <div className="pic1">
                    <img
                        src={peopleMessaging}
                        alt="two people messaging"
                        style={{ width: "250px", height: "200px" }}
                    />
                </div>
                <div className="pic2">
                    <img
                        src={onLaptop}
                        alt="one person on laptop"
                        style={{ width: "250px", height: "200px" }}
                    />
                </div>
                <div className="pic3">
                    <img
                        src={analytics}
                        alt="analytic charts"
                        style={{ width: "250px", height: "200px" }}
                    />
                </div>
                <div className="pic4">
                    <img
                        src={like}
                        alt="like button"
                        style={{ width: "250px", height: "200px" }}
                    />
                </div>
                <div className="pic5">
                    <img
                        src={profileCard}
                        alt="profile card"
                        style={{ width: "250px", height: "200px" }}
                    />
                </div>
                <div className="text1">
                    <h1>Instant messaging between users!</h1>
                </div>
                <div className="text2">
                    <h1>Updates with useful information for sellers!</h1>
                </div>
                <div className="text3">
                    <h1>More robust analytics to track sales and figures!</h1>
                </div>
                <div className="text4">
                    <h1>Adding user reviews and ratings!</h1>
                </div>
                <div className="text5">
                    <h1>A more complete and engaging user profile!</h1>
                </div>
            </BodyArea>
        </div>
    );
};

const MainTitle = styled.div`
    height: 15vh;
`;

const BodyArea = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 1.5fr 1.5fr 0.5fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
        ". pic1 text1 ."
        ". text2 pic2 ."
        ". pic3 text3 ."
        ". text4 pic4 ."
        ". pic5 text5 .";
    .pic1 {
        grid-area: pic1;
    }
    .text1 {
        grid-area: text1;
        align-self: center;
    }
    .text2 {
        align-self: center;
        grid-area: text2;
    }
    .pic2 {
        grid-area: pic2;
    }
    .pic3 {
        grid-area: pic3;
    }
    .text3 {
        align-self: center;
        grid-area: text3;
    }
    .text4 {
        align-self: center;
        grid-area: text4;
    }
    .pic4 {
        grid-area: pic4;
    }
    .pic5 {
        grid-area: pic5;
    }
    .text5 {
        align-self: center;
        grid-area: text5;
    }
`;

export default ComingSoon;
