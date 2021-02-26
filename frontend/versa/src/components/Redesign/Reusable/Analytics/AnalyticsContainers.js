import styled from "styled-components";

const Container = styled.div``;
export const TableContainer = styled(Container)`
background-color: ${props => props.theme.lightBlue};
display: flex;
flex-direction: column;
width: 100%;

`;
export const GraphContainer = styled(Container)`
background-color: ${props=>props.theme.lightBlue};
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Legend = styled.div`
    div {
        display: flex;
        align-items: center;
        font-size: 8px;
        text-transform: uppercase;
    }
    display: flex;
    align-items: center;
    justify-content: space-around;
    div > svg {
        margin: 5px;
    }
    width: 100%;
    background-color: ${props=>props.theme.lightBlue}
`;
export const PieContainer = styled(Container)`
background-color: ${props=>props.theme.lightBlue};
    display: flex;
    flex-direction: column;
    width: 100%;
`;
