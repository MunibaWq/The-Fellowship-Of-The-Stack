import React, { useEffect } from "react";
import styled from "styled-components";
import TopBar from "./Reusable/TopBar";
import imageTest from "../../images/imageTest.png";
import { SendIcon } from "../../images/icons";
import { sendMessage } from "../../axios/posts";
import { getUserByToken } from "../../axios/gets";
import Button from "./Reusable/Button";
import { useState } from "react";
const AboutArtist = ({ product }) => {
    const [question, setQuestion] = useState();
    const [sent, setSent] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        const getUser = async () => {
            const res = await getUserByToken();
            setUser(res);
        };

        getUser();
    }, []);

    return (
        <Container>
            <TopBar title={`Meet the Artist: ${product?.artist}`} />
            <ArtistBlurb>
                <Image
                    src={"https://source.unsplash.com/350x300/?portrait, man"}
                    alt={"image"}
                />
                <p>
                    Andy Rementer is a creative person based in Calgary. He grew
                    up in a Victorian beach town which later informed his
                    interest in nostalgia and color.
                </p>
            </ArtistBlurb>
            <Messaging>
                {user && (
                    <Question>
                        <h2>Connect with Brain Slush</h2>
                        <p>
                            Got any questions about this product? Get in touch!
                        </p>
                        <Send>
                            {!sent ? (
                                <>
                                    <Message
                                        value={question}
                                        placeholder="Message"
                                        onChange={(e) => {
                                            setQuestion(e.target.value);
                                        }}
                                    />
                                    <Button
                                        onClick={() => {
                                            sendMessage(
                                                `Product: ${product?.title}`,
                                                product?.artist_id,
                                                "B2A",
                                                question,
                                                new Date()
                                            );
                                            setSent(true);
                                        }}
                                        secondarySmall>
                                        <SendIcon />
                                        Send
                                    </Button>
                                </>
                            ) : (
                                "Message Sent, check dashboard for responses"
                            )}
                        </Send>
                    </Question>
                )}
            </Messaging>
        </Container>
    );
};

export default AboutArtist;

const Container = styled.div`
    padding: 2em 1em;
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
    justify-content: center;

    @media (max-width: 768px) {
        justify-content: flex-start;
    }
`;

const ArtistBlurb = styled.div`
    margin: 2em 0.5em;
    width: 40%;
    justify-content: flex-start;
    flex-direction: column;

    p {
        width: 350px;
        padding: 8px;
    }
`;

const Image = styled.img`
    padding: 10px;
    background: ${(props) => props.theme.lightBlue};
`;

const Messaging = styled.div`
    margin: 2em 16px;
    padding: 10px;
    height: 100%;
    display: flex;
    justify-content: flex-start;

    p {
        margin-bottom: 1em;
    }
    button {
        svg {
            path {
                :hover {
                    fill: ${(props) => props.theme.lightBlue};
                }
            }
        }
    }
`;

const Message = styled.textarea`
    resize: none;
    width: 100%;
    height: 200px;
    padding: 8px;
    outline: none;
    border-radius: 8px;
    font-family: inherit;
    margin-bottom: 1em;
    ::placeholder {
        color: ${(props) => props.theme.lightBlack};
    }
    border: ${(props) =>
        props.border === true
            ? `2px solid ${props.theme.green}`
            : `2px solid ${props.theme.black}`};
    :active,
    :hover,
    :focus {
        border: ${(props) =>
            props.border === true
                ? `2px solid ${props.theme.green}`
                : `2px solid ${props.theme.purple}`};
    }
`;
const Send = styled.div``;
const Question = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;
