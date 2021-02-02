import styled from "styled-components";
import DashboardMain from "./DashboardMain";
import SideNav from "./SideNav";

const Dashboard = () => {
    return (
        <Container>
            <SideNavDiv>
                <SideNav />
            </SideNavDiv>
            <DashboardMainDiv>
                <DashboardMain />
            </DashboardMainDiv>
        </Container>
    );
};

export default Dashboard;
const Container = styled.div`
    display: grid;
    grid-template-columns: 300px auto;
`;
const DashboardMainDiv = styled.div`
    grid-column: 2;
`;

const SideNavDiv = styled.div`
    grid-column: 1;
`;
