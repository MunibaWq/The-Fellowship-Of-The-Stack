import React from "react";
import styled from "styled-components";
import Search from "../../Reusable/Search";

//              USE
//  add 'search' prop if you want it to include search bar
// Header with search bar included
// <Header
//      title="Shop"
//      sub ="Support your favourite talented artists and buy presents for loved ones."
//       search />
// Header without search bar
//  <Header
//      title="Shop"
//      sub ="Support your favourite talented artists and buy presents for loved ones."
//       />

const Header = ({ sub, title, search }) => {
    return (
        <HeaderContainer>
            <h1>{title}</h1>
            <Subheading>{sub}</Subheading>
            {search && (
                <Search placeholder="Try searching for plant pots, or sweatshirts" />
            )}
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.header`
    flex-direction: column;
    align-items: flex-start;
`;

const Subheading = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    margin-top: 60px;
`;
