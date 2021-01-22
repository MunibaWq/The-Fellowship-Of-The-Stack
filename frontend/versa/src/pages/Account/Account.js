import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Reusable/Button";
import colors from "../../components/Reusable/Colors";
import { AddIcon, VersaIcon } from "../../images/icons";

const Account = () => {
    return (
        <div>
          
            <Link to="/products/create"><Button secondary>Create a new product<AddIcon stroke={colors.primary}/></Button></Link>
        </div>
    );
};

export default Account;
