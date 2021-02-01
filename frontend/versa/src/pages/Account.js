import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Reusable/Button";
import theme from "../components/Reusable/Colors";
import { AddIcon} from "../images/icons";

const Account = () => {
    return (
        <div>
          
            <Link to="/products/create"><Button secondary><AddIcon stroke={theme.primary}/>Create a new product</Button></Link>
            <Link to="/artists/create-account"><Button secondary><AddIcon stroke={theme.primary}/>Create a new account</Button></Link>
            <Link to="/artists/log-in"><Button secondary><AddIcon stroke={theme.primary}/>Log In</Button></Link>

        </div>
    );
};

export default Account;
