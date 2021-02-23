import React from "react";
import styled from "styled-components";

const TopBar = ({ title }) => {
    return <Bar>{title}</Bar>;
};

export default TopBar;

const Bar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px 40px;
    border-radius: 16px 16px 0 0;
    background: ${(props) => props.theme.black};
    color: ${(props) => props.theme.lightBlue};
`;
