import React from "react";
import styled from "styled-components";
import { SearchIcon } from "../../../images/icons";
import Button from "./Button";

//          USE
// <Search placeholder="Your desired placeholder" />

const Search = ({ placeholder, onClick, type, onChange, onKeyPress }) => {
    return (
        <SearchContainer>
            <SearchIcon />
            <SearchBox
                placeholder={placeholder}
                type="text"
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
            <Button onClick={onClick} secondarySmall>
                Search
            </Button>
        </SearchContainer>
    );
};

export default Search;

const SearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0px;
    margin: 30px 0px;
    svg {
        position: absolute;
        transform: translateX(50%);
        z-index: 3;
        width: 24px;
        height: 24px;

        path {
            fill: ${(props) => props.theme.purple};
        }
    }
`;

const SearchBox = styled.input`
    background: url({SearchIcon}) no-repeat scroll 24px 24px;
    padding-left: 32px;
    margin-right: 16px;
    padding: 8px 8px 8px 38px;
    outline: none;
    width: 100%;
    border-radius: 8px;
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
