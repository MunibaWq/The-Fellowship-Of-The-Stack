import React from "react";
import styled from "styled-components";
import Card from "./Card";

const Box = ({ dataToMap, boxTitle, boxDescription, type }) => {
    console.log("dt", dataToMap.length);
    return (
        <Container>
            <Title>
                <h2>{boxTitle}</h2>
            </Title>
            <Spotlight>
                <p>{boxDescription}</p>
                <CardList>
                    {dataToMap.length > 0 ? (
                        dataToMap.map((item, index) => (
                            <Card shop key={index} item={item} type={type} />
                        ))
                    ) : (
                        <NoResults>
                            <p>No results found 🙁</p>
                        </NoResults>
                    )}
                </CardList>
            </Spotlight>
        </Container>
    );
};

export default Box;

const Container = styled.article`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: Clamp(8px 0px, 2vw, 60px 0);
    border-radius: 15px 15px 0px 0px;
`;

const Title = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px 30px;
    border-radius: 15px 15px 0px 0px;
    background: ${(props) => props.theme.black};
    h2 {
        font-size: 36px;
        color: ${(props) => props.theme.blue};
    }
`;

const Spotlight = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    background: ${(props) => props.theme.lightBlue};
    p {
        font-weight: 500;
    }
`;

const CardList = styled.ul`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    margin: 30px 0;
    width: 100%;
`;

const NoResults = styled.p``;
