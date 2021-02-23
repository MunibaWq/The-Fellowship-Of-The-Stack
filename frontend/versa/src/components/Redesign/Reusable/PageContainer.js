import styled from "styled-components";

const PageContainer = styled.div`
    :nth-child(-n + 2) {
        align-self: flex-start;
    }
    ::nth-child(n + 4) {
        justify-content: center;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: clamp(24px, 2vh, 5vh) clamp(16px, 6em, 12vh);
    min-height: 60vh;
    margin: 0;
`;

export default PageContainer;
