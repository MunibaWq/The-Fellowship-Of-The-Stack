import React from "react";
import styled from "styled-components";
import Search from "../Reusable/Search";

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
}) => {
    return (
        <HeaderContainer>
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
    flex-direction: column;
    align-items: flex-start;
    align-self: flex-start;
`;

const Subheading = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    margin-top: 20px;
`;
