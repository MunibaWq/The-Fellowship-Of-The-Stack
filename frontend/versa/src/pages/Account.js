import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import theme from "../components/Reusable/Colors";
import { AddIcon, EditIcon, ShapesLogo } from "../images/icons";
import Cookies from "universal-cookie";
import { login, logout } from "../redux/actions/actions";
import { axiosLogout } from "../axios/posts";
import styled from "styled-components";
import { StyledLink } from "../components/Reusable/Link";

const cookies = new Cookies();

const Account = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        const userToken = cookies.get("token");
        if (userToken) {
            dispatch(login());
        }
    }, [dispatch, user]);
    return (
        <>
            <Logo>
                <ShapesLogo
                    width="170"
                    height="170"
                    circle={theme.logoCircle}
                    rectangle={theme.logoRect}
                    triangle={theme.logoTriangle}
                    alt="Versa Logo"
                />
            </Logo>
            {user && (
                <Container>
                    <LeftContainer>
                        <StyledLink
                            style={{ width: "10rem" }}
                            onClick={() => {
                                axiosLogout();
                                dispatch(logout());
                                cookies.remove("token");
                            }}
                            secondary>
                            <AddIcon stroke={theme.primary} />
                            Sign Out
                        </StyledLink>
                    </LeftContainer>
                    <RightContainer>
                        <StyledLink secondary to="/edit-account">
                            <EditIcon stroke={theme.primary} />
                            Edit your account
                        </StyledLink>
                    </RightContainer>
                </Container>
            )}
            {!user && (
                <Container>
                    <LeftContainer>
                        <TextLine>Join the Community</TextLine>
                        <StyledLink secondary to="/create-account">
                            <AddIcon stroke={theme.primary} />
                            Create a new account
                        </StyledLink>
                    </LeftContainer>
                    <RightContainer>
                        <TextLine>Welcome Back!</TextLine>
                        <StyledLink secondary to="/log-in">
                            <AddIcon stroke={theme.primary} />
                            Log In
                        </StyledLink>
                    </RightContainer>
                </Container>
            )}
        </>
    );
};

export default Account;

const LeftContainer = styled.div`
    width: 50vw;
    background-color: #dfdeff;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const RightContainer = styled.div`
    width: 50vw;
    background-color: #fefefe;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: hidden;
`;

const Container = styled.div`
    height: 70vh;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const TextLine = styled.h1`
    font-weight: 700;
    padding: 5px;
`;

const Logo = styled.svg`
    position: absolute;

    top: 30%;
    left: 43.5%;

    @media (max-width: 600px) {
        top: 50%;
        left: 30%;
    }

    @media (max-width: 800px) {
        top: 47%;
        left: 37%;
    }
`;
