import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Reusable/Button";
import theme from "../components/Reusable/Colors";
import { AddIcon, EditIcon } from "../images/icons";
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
            {user && (
                <Container>
                    <LeftContainer>
                        <StyledLink
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
                        JOIN USSS..
                        <StyledLink secondary to="/create-account">
                            {/* <AddIcon stroke={theme.primary} /> */}
                            Create a new account
                        </StyledLink>
                    </LeftContainer>
                    <RightContainer>
                        Welcome BACK!
                        <StyledLink secondary to="/log-in">
                            {/* <AddIcon stroke={theme.primary} /> */}
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
`;

const Container = styled.div`
    min-height: 70vh;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;
