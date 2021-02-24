import React from "react";
import styled from "styled-components";

const TopBar = ({ title, littleTitle }) => {
    return (
        <Bar>
            {title && <h3>{title}</h3>}
            {littleTitle && <h6>{littleTitle}</h6>}
        </Bar>
    );
};

export default TopBar;

const Bar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: ${(props) => (props.title ? "20px 40px" : "10px 20px")};
    border-radius: 16px 16px 0 0;
    background: ${(props) => props.theme.black};
    h3,
    h6 {
        color: ${(props) => props.theme.lightBlue};
    }
    h6 {
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }
`;
