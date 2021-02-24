import React from "react";
import styled from "styled-components";
import { LeftIcon } from "../../../images/icons";
import Search from "../Reusable/Search";
import { StyledLink } from "./Link";

//              USE
//  add 'search' prop if you want it to include search bar
// HEADER WITH SEARCH
// <Header
//      title="Shop"
//      sub ="Support your favourite talented artists and buy presents for loved ones."
//       search />
// HEADER NO SEARCH
//  <Header
//      title="Shop"
//      sub ="Support your favourite talented artists and buy presents for loved ones."
//       />
// add onClick prop for the specific function you want the search button to do,
// add onChange prop for the specific function you want the input box to do

const Header = ({
    sub,
    title,
    search,
    onClick,
    onChange,
    onKeyPress,
    placeholder,
    link,
    linkText,
}) => {
    return (
        <HeaderContainer>
            {link && (
                <StyledLink to={link} tertiary>
                    <LeftIcon />
                    {linkText}
                </StyledLink>
            )}
            <h1>{title}</h1>
            <Subheading>{sub}</Subheading>
            {search && (
                <Search
                    placeholder={placeholder}
                    onClick={onClick}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                />
            )}
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.header`
    align-self: flex-start;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 1em;
`;

const Subheading = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    margin-top: 20px;
`;
