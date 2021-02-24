import React from "react";
import styled from "styled-components";
import Card from "./Card";

const Box = ({
    awsFolder,
    link,
    dataToMap,
    boxTitle,
    boxDescription,
    type,
    action,
    featured,
}) => {
    return (
        <Container featured={featured}>
            {boxTitle && (
                <Title>
                    <h2>{boxTitle}</h2>
                </Title>
            )}
            <Spotlight featured={featured}>
                {boxDescription && <p>{boxDescription}</p>}

                {dataToMap.length > 0 ? (
                    <CardList>
                        {dataToMap.map((item, index) => (
                            <Card
                                link={link}
                                shop
                                key={index}
                                item={item}
                                type={type}
                                awsFolder={awsFolder}
                                action={action}
                                featured={featured}
                            />
                        ))}
                    </CardList>
                ) : (
                    <NoResults>No results found 😢</NoResults>
                )}
            </Spotlight>
        </Container>
    );
};

export default Box;

const Container = styled.article`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 1em;
    border-radius: 15px 15px 0px 0px;
    background: ${(props) =>
        props.featured ? props.theme.lightBlue : "transparent"};
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
    padding: 40px 20px 40px 20px;
    background: ${(props) =>
        props.featured ? props.theme.lightBlue : "transparent"};
    p {
        font-weight: 500;
    }
`;

const CardList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;
    margin: 30px 0;
    width: 100%;
`;

const NoResults = styled.p``;
