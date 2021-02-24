import React from "react";
import styled from "styled-components";

const Contact = () => {
    return (
        <Container>
            <h1>Contact Us</h1>
            <p>For any inquiries, please contact us at versayyc@gmail.com</p>
            <p>Please include any helpful details, eg. Wh</p>
        </Container>
    );
};

export default Contact;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 3em 0;
    h1 {
        margin-bottom: 1em;
    }
    @media screen and (max-width: 768px) {
        p {
            padding: 0 0.8em;
        }
    }
    @media screen and (max-width: 420px) {
        p {
            padding: 0 0.8em;
        }
    }
`;
