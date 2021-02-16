import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Reusable/Button";
import theme from "./Reusable/Colors";
import { StyledLink } from "./Reusable/Link";
import { addToNewsletterList } from "../axios/posts";

const Footer = () => {
    const [email, setEmail] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        addToNewsletterList(email);
    };
    return (
        <Container>
            <Newsletter>
                <h6>Stay connected with us</h6>
                <Input>
                    <NewsletterInput
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <NewsletterSubmit primary onClick={handleSubmit}>
                        Subscribe
                    </NewsletterSubmit>
                </Input>
            </Newsletter>

            <Links>
                <LinkGroup>
                    <h6>Main Menu</h6>
                    <LinkItem to="/">Homepage</LinkItem>
                    <LinkItem to="/shop">Shop</LinkItem>
                    <LinkItem to="/events">Events</LinkItem>
                    <LinkItem to="/account">Account</LinkItem>
                    <LinkItem to="/wishlist">Wishlist</LinkItem>
                    <LinkItem to="/cart">Cart</LinkItem>
                </LinkGroup>
                <LinkGroup>
                    <h6>Versa</h6>
                    <LinkItem>About</LinkItem>
                    <LinkItem>Careers</LinkItem>
                    <LinkItem>Contact Us</LinkItem>
                    <LinkItem>Terms & Conditions</LinkItem>
                    <LinkItem>Cookies</LinkItem>
                </LinkGroup>
                <LinkGroup>
                    <h6>Support</h6>
                    <LinkItem>Help Centre</LinkItem>
                    <LinkItem>Business Education</LinkItem>
                    <LinkItem>Lifestyle Tips</LinkItem>
                </LinkGroup>
                <LinkGroup>
                    <h6>Community</h6>
                    <LinkItem>For Artists</LinkItem>
                    <LinkItem>For Drivers</LinkItem>
                    <LinkItem>For Locals</LinkItem>
                </LinkGroup>
            </Links>
        </Container>
    );
};

export default Footer;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${theme.primary};
    padding: 2em 4em 1em 4em;
    h6 {
        font-weight: 700;
        margin: 5px 5px 12px 5px;
        color: ${theme.secondary};
    }
`;

const Newsletter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5em;
    h6 {
        margin: 0 0 1em 0;
    }
`;

const Input = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
`;

const NewsletterInput = styled.input`
    padding: 8px;
    outline: none;
    min-width: 600px;
    margin-right: 0.5em;
    border: ${(props) =>
        props.border === true
            ? `2px solid ${theme.primaryHover}`
            : `2px solid ${theme.primary}`};
    :active,
    :hover,
    :focus {
        border: ${(props) =>
            props.border === true
                ? `2px solid #77dd77`
                : `2px solid ${theme.primaryHover}`};
    }
    @media screen and (max-width: 768px) {
        min-width: 400px;
    }
    @media screen and (max-width: 420px) {
        width: 150px;
    }
`;

const NewsletterSubmit = styled(Button)`
    background: ${theme.primaryHover};
    border: 4px solid ${theme.primaryHover};
    :active,
    :hover,
    :focus {
        background: ${theme.secondary};
    border: 4px solid ${theme.secondary};
color: ${theme.primaryHover}
`;

const LinkGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 1em;
    min-width: 200px;
    :first-of-type {
        margin: 0 1em 0 0;
    }
    :last-of-type {
        margin: 0;
        min-width: 80px;
    }
`;

const Links = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
`;

const LinkItem = styled(StyledLink)`
    font-size: 16px;
    color: ${theme.secondary};
    font-weight: 500;
    :hover,
    :active:active,
    :focus {
        color: ${theme.primaryHover};
    }
`;
