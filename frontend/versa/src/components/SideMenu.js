import { set } from "lodash";
import React, { useState } from "react";
import styled from "styled-components";
import { CaretDoubleLeft } from "../images/icons";

const SideMenu = () => {
    const [expand, setExpand] = useState(false);
    console.log(expand);
    return (
        <Container className={expand ? "test" : ""}>
            <MiniTitle>MENU</MiniTitle>
            <Expander
                onClick={() => {
                    setExpand(!expand);
                    console.log("onclick");
                }}>
                <CaretDoubleLeft />
            </Expander>
        </Container>
    );
};

const Container = styled.div`
    margin: 0;
    padding: 10px;
    position: fixed;
    width: 248px;
    height: 82px;
    background: black;
    border-radius: 0 0 15px 15px;
    top: 300px;

    display: flex;
    justify-content: space-around;
    align-items: center;

    transistion: height 1.2s ease-out;
    &.test {
        height: 500px;
        top: 50px;
    }
`;

const MiniTitle = styled.div`
    color: white;
    font-size: 24px;
`;

const Expander = styled.div`
    padding: 8px;
    background: white;
    line-height: 0;
    border-radius: 8px;
`;
export default SideMenu;
