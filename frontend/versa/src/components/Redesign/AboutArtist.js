import React, { useEffect } from "react";
import styled from "styled-components";
import TopBar from "./Reusable/TopBar";
import imageTest from "../../images/imageTest.png";
import { SendIcon } from "../../images/icons";
import { sendMessage } from "../../axios/posts";
import { getUserByToken } from "../../axios/gets";
import Button from "./Reusable/Button";
import { useState } from "react";
const AboutArtist = ({ item, type }) => {
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
            <TopBar
                title={`Meet the Artist: ${
                    type === "product" ? item?.artist : item?.username
                }`}
            />
            <div>
                <ArtistBlurb>
                    <Image
                        src={
                            "https://source.unsplash.com/350x300/?portrait, man"
                        }
                        alt={"image"}
                    />
                    <p>
                        Andy Rementer is a creative person based in Calgary. He
                        grew up in a Victorian beach town which later informed
                        his interest in nostalgia and color.
                    </p>
                </ArtistBlurb>
                <Messaging>
                    {user && (
                        <Question>
                            <h2>Connect with Brain Slush</h2>

                            <p>
                                Got any questions about this{" "}
                                {type === "product" ? "product?" : "event?"} Get
                                in touch!
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
                                                    type === "product"
                                                        ? `Product: ${item?.title}`
                                                        : `Event: ${item?.title}`,
                                                    type === "product"
                                                        ? item?.artist_id
                                                        : item?.host,
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
            </div>
        </Container>
    );
};

export default AboutArtist;

const Container = styled.div`
    width: 100%;
    :first-child {
        z-index: 3;
    }
    :nth-child(2) {
        padding: 2em 1em;
        display: flex;
        flex-direction: row;
        height: fit-content;
        justify-content: center;
        align-items: center;
        background: ${(props) => props.theme.lightBlue};

        @media (max-width: 768px) {
            justify-content: flex-start;
        }
    }
`;

const ArtistBlurb = styled.div`
    margin: 2em 0.5em;
    /* width: 40%; */
    justify-content: flex-start;
    flex-direction: column;
    background: ${(props) => props.theme.lightBlue};

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
    /* width: 100%; */
    padding: 10px;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    background: ${(props) => props.theme.lightBlue};

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
    /* width: 60%; */
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
