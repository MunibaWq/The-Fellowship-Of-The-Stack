import React from "react";
import Cookies from "universal-cookie";
import PageContainer from "../../components/Redesign/Reusable/PageContainer";
import Loading from "../../components/Redesign/Reusable/Loading";
import Header from "../../components/Redesign/Reusable/Header";

const Artist = () => {
    const cookies = new Cookies();
    return (
        <PageContainer>
            <Header title={`Hello, ${cookies.get("name")}`} />
        </PageContainer>
    );
};

export default Artist;
