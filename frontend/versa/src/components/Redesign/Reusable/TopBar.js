import React from "react";
import styled from "styled-components";

const TopBar = (title) => {
    return <Bar>{title}</Bar>;
};

export default TopBar;

const Bar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 40px;
    background: ${(props) => props.theme.black};
    color: ${(props) => props.theme.lightBlue};
`;
