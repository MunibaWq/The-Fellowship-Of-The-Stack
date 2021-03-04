import React from "react";
import styled from "styled-components";

const TableTopBar = ({ setSortBy, titles, littleTitles }) => {
    return (
        <Bar>
            {titles &&
                titles.map((title, index) => (
                    <h3
                        onClick={() => {
                            setSortBy(title);
                        }}
                        key={title + index}>
                        {title}
                    </h3>
                ))}
            {littleTitles &&
                littleTitles.map((title, index) => (
                    <h6
                        onClick={() => {
                            setSortBy(title);
                        }}
                        key={title + index}>
                        {title}
                    </h6>
                ))}
        </Bar>
    );
};

export default TableTopBar;

const Bar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    width: 100%;
    padding: 10px 40px;
    border-radius: 16px 16px 0 0;
    background: ${(props) => props.theme.black};
    h3,
    h6 {
        cursor: pointer;
        color: ${(props) => props.theme.lightBlue};
    }
    h6 {
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }
`;
