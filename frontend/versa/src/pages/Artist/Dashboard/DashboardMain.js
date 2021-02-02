import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DashCard from "./DashCard";
const DashboardMain = () => {
  const dispatch = useDispatch();

    return (
     
    <DashboardContainer>
    <Greeting>Hello, Danielle</Greeting>
      <StoreDash>
      <History>They can toggle the date to go to past day version of dashbord. eg to see yesterdays orders, sales etc</History>
              <DashCard table={true} total="123" totalLabel="orders" title="Orders">Total Orders</DashCard> 
        <Inventory title="Inventory">table Showing 5 lowest inv products</Inventory>
        <Profit>Small Card with number of total profit</Profit>
        <MonthlySales>
          graph showing this months sales, with sales goals line over top, in the future they can click to change it to Day / Year
        </MonthlySales>
        <Events>card showing 5 cards inside of upcoming events</Events>
      </StoreDash>
    </DashboardContainer>
  );
};
export default DashboardMain;
const DashboardContainer = styled.div`
    padding: 2em;
    background-color:#EFF3FE;
    height: calc(100vh - 60px);
  

`;

const Card = styled.div`
        
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
transition: 0.3s;
hover {
    box - shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
`
const UserDash = styled.div``;
const Orders = styled(DashCard)``;
const Inventory = styled(DashCard)``
   
const Events = styled(DashCard)``;
const MonthlySales = styled(DashCard)``
const Profit = styled(DashCard)``
const History = styled(DashCard)``
const Wishlist = styled(DashCard)``
const StoreDash = styled.div`
display: grid;
margin: 2em;
    grid-row-gap: 30px;
    grid-column-gap: 50px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 250px));`
const Greeting = styled.h1`

margin: 2em;`


























