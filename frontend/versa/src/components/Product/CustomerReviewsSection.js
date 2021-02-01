import React from "react";
import styled from "styled-components";
import { Star } from "../../images/icons";
import theme from "../Reusable/Colors";

const CustomerReviews = () => {
    return (
        <CustomerReviewsContainer>
            <TitleStarsNumReviews>
                <TitleStars>
                    <h5>Customer Reviews</h5>
                    <StarsContainer>
                        <Star />
                        <Star />
                        <Star />
                    </StarsContainer>
                </TitleStars>
                <NumReviewsContainer>
                    <NumIcon>14</NumIcon>
                    <p>reviews</p>
                </NumReviewsContainer>
            </TitleStarsNumReviews>
            <ReviewsList>
                <ReviewContainer>
                    <NameStar>
                        <h6>Reviewer Name</h6>
                        <StarsContainer>
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                        </StarsContainer>
                    </NameStar>
                    <p>
                        Reviewer’s opinion of the product goes here. It was a
                        positive review.
                    </p>
                </ReviewContainer>
                <ReviewContainer>
                    <NameStar>
                        <h6>Reviewer Name</h6>
                        <StarsContainer>
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                        </StarsContainer>
                    </NameStar>
                    <p>
                        Reviewer’s opinion of the product goes here. It was a
                        positive review.
                    </p>
                </ReviewContainer>
                <ReviewContainer>
                    <NameStar>
                        <h6>Reviewer Name</h6>
                        <StarsContainer>
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                        </StarsContainer>
                    </NameStar>
                    <p>
                        Reviewer’s opinion of the product goes here. It was a
                        positive review.
                    </p>
                </ReviewContainer>
            </ReviewsList>
            <MoreReviews>
                <h6>See more reviews</h6>
            </MoreReviews>
        </CustomerReviewsContainer>
    );
};

export default CustomerReviews;

const CustomerReviewsContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    background-color: ${theme.primary};
    max-width: 425px;
`;

const TitleStarsNumReviews = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    h5 {
        padding-right: 10px;
    }
`;

const TitleStars = styled.div`
    h5 {
        padding-bottom: 10px;
    }
`;
const StarsContainer = styled.div`
    svg {
        padding-right: 5px;
    }
`;
const NumReviewsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const NumIcon = styled.div`
    background-color: white;
    width: 32px;
    height: 32px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 8px 0 0;
    p {
        font-weight: 400;
        color: #444444;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        line-height: 1.5;
        font-size: 12px;
        letter-spacing: 0.15px;
        text-transform: uppercase;
    }
`;
const ReviewsList = styled.div``;
const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-bottom: 15px;
`;
const NameStar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    h6 {
        padding-right: 10px;
    }

    svg {
        padding-right: 5px;
    }
`;

const MoreReviews = styled.a`
    h6 {
        font-weight: bold;
        border-bottom: 3px solid #444444;
    }
`;
