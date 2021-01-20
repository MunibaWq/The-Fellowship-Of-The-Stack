import styled, { css } from "styled-components";

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 5rem;
`;

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        flex-direction: column;
    }
`;

const ImageCard = styled.img``;
const Description = styled.p``;
const Price = styled.p``;

const FakeCard = ({ children, title, price }) => {
    return (
        <CardContainer>
            {/* <ImageCard> */}
            {/* </ImageCard> */}
            <Flex>
                {children}
                <Description>{title}</Description>
                <Price>${price}</Price>
            </Flex>
        </CardContainer>
    );
};

export default FakeCard;
