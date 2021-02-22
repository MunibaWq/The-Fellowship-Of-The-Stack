import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../../components/Redesign/Reusable/Button";
import PageContainer from "../../components/Redesign/Reusable/PageContainer";
import { LeftIcon } from "../../images/icons";
import BackLink from "../../components/Redesign/Reusable/BackLink";
const ProductPage = () => {
    return (
        <PageContainer>
            <BackLink to="/shop">
                <LeftIcon />
                Shop
            </BackLink>
        </PageContainer>
    );
};

export default ProductPage;
