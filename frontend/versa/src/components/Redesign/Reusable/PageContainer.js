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
    /* width: 100%; */
    align-items: center;
    padding: 0px;
    min-height: 60vh;
    margin: clamp(24px, 2vh, 5vh) clamp(16px, 8vh, 12vh);
`;

export default PageContainer;
