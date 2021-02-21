import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "./Reusable/Colors";
import Button from "./Redesign/Reusable/Button";
import Input from "./Redesign/Reusable/Input";
import { addToNewsletterList } from "../axios/posts";
import { Email, Facebook, Instagram, Twitter } from "../images/icons";

const Footer = () => {
    const [email, setEmail] = useState();
    const [success, setSuccess] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        addToNewsletterList(email);
        setSuccess(true);
    };
    return (
        <Container>
            <Newsletter>
                <h6>Stay connected</h6>
                {!success && (
                    <InputGroup>
                        <Input
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button primarySmall onClick={handleSubmit}>
                            Subscribe
                        </Button>
                    </InputGroup>
                )}
                {success && (
                    <p>
                        Success! You have been added to our newsletter list.
                        Check your email!
                    </p>
                )}
                <SocialIcons>
                    <Instagram />
                    <Twitter />
                    <Facebook />
                    <Email />
                </SocialIcons>
            </Newsletter>

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
                <h6>Support</h6>
                <LinkItem to="/coming-soon">Help Centre</LinkItem>
                <LinkItem to="/coming-soon">Business Education</LinkItem>
                <LinkItem to="/coming-soon">Blog</LinkItem>
            </LinkGroup>
            <LinkGroup>
                <h6>Versa</h6>
                <LinkItem to="/coming-soon">Contact Us</LinkItem>
                <LinkItem to="/coming-soon">About</LinkItem>
                <LinkItem to="/coming-soon">Careers</LinkItem>
                <LinkItem to="/coming-soon">Terms & Conditions</LinkItem>
                <LinkItem to="/coming-soon">Cookies</LinkItem>
            </LinkGroup>
        </Container>
    );
};

export default Footer;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    flex: 0 0 50%;
    background-color: ${(props) => props.theme.black};
    padding: clamp(1em, 1em, 3em);
    width: 100%;
    h6 {
        text-transform: uppercase;
        font-size: 1.2em;
        font-weight: 700;
        letter-spacing: 0.03em;
        color: ${(props) => props.theme.blue};
        margin-bottom: 1em;
    }
    @media screen and (max-width: 420px) {
        justify-content: flex-start;
    }
    @media screen and (max-width: 768px) {
        justify-content: flex-start;
    }
`;

const Newsletter = styled.div`
    display: flex;
    height: fit-content;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: clamp(20px, 1em, 2em);
`;

const SocialIcons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    margin-top: 1em;
    svg {
        margin-right: 16px;
        path {
            transition: all 0.3s ease;
        }
        :hover {
            cursor: pointer;
            path {
                stroke: ${(props) => props.theme.lightPurple};
            }
        }
    }
`;

const InputGroup = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1em;
`;

const LinkGroup = styled.div`
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: clamp(20px, 1em, 2em);
    width: clamp(200px, 5vw, 350px);
`;

const LinkItem = styled(Link)`
    font-size: 18px;
    text-transform: capitalize;
    color: ${(props) => props.theme.blue};
    background: none;
    border-bottom: none;
    margin-bottom: 8px;
    font-weight: 500;
    :hover,
    :active:active,
    :focus {
        color: ${(props) => props.theme.lightPurple};
    }

    :last-of-type {
        margin-bottom: 0;
    }
`;
