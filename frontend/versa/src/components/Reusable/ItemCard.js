import styled from "styled-components";

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 1rem;
`;

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */

    @media (min-width: 600px) {
        flex-direction: column;
    }
`;

const ImageCard = styled.div`
    width: 100%;
    height: 70%;
    margin-bottom: 2rem;
    position: relative;
    @media (max-width: 600px) {
        width: 100%;
        height: 50%;
        margin-bottom: 4rem;
    }
    /* @media (max-width: 300px) {
        width: 100%;
        height: 50%;
        margin-bottom: 2rem;
    } */
`;

// const TextWrapperDescription = styled.div`
//     height: 60px;
// `;
// const TextWrapperPrice = styled.div`
//     height: 10px;
// `;

const Description = styled.p`
    height: 4rem;
    margin-bottom: 0;
    @media (max-width: 768px) {
        height: 5rem;
    }
    @media (max-width: 600px) {
        height: 4rem;
    }
`;
const Price = styled.p`
    height: 10px;
    width: 100%;
`;

const ItemCard = ({ children, title, price }) => {
    return (
        <CardContainer>
            <Flex>
                <ImageCard>{children}</ImageCard>

                <Description>
                    <h5>{title}</h5>
                </Description>

                <Price>
                    <h6>${price}</h6>
                </Price>
            </Flex>
        </CardContainer>
    );
};

export default ItemCard;
