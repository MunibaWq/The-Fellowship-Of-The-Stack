import styled from "styled-components";

const OutOfStock = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 1000;
    position: absolute;
    transform: translate(25%, 150%);
    background-color: ${(props) => props.theme.lightBlack + 90};
    padding: 8px 16px;
    border-radius: 8px;
    filter: ${(props) => (props.stock === 0 ? "opacity(100%)" : "opacity(0%)")};
    p {
        text-transform: uppercase;
        color: ${(props) => props.theme.blue};
        font-weight: bold;
        margin-right: 8px;
    }
`;

export default OutOfStock;
