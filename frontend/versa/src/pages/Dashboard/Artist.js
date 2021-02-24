import React from "react";
import Cookies from "universal-cookie";
import styled from "styled-components";
import PageContainer from "../../components/Redesign/Reusable/PageContainer";
import Loading from "../../components/Redesign/Reusable/Loading";
import Header from "../../components/Redesign/Reusable/Header";
import GraphCard from "../../components/Redesign/Reusable/GraphCard";

const Artist = () => {
    const cookies = new Cookies();
    return (
        <PageContainer>
            <Header
                title={`Hello, ${cookies.get("name")}`}
                sub="Here is your summary for today."
            />
            <CardList>
                <GraphCard title="Total Orders This Month" />
                <GraphCard title="Total Sales This Month" />
                <GraphCard title="Recent Orders" />
                <GraphCard title="Inventory" />
                <GraphCard title="Events" />
                <GraphCard title="Sales by Product" />
            </CardList>
        </PageContainer>
    );
};

export default Artist;

const CardList = styled.div`
 display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
`;
