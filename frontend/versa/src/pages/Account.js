import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../components/Reusable/Button";
import theme from "../components/Reusable/Colors";
import { AddIcon } from "../images/icons";

const Account = () => {
    const user = useSelector((state) => state.user);
    return (
        <div>
            {user && (
                <Link to="/artists/log-out">
                    <Button secondary>
                        <AddIcon stroke={theme.primary} />
                        Clicking me TOTALLY logs you out
                    </Button>
                </Link>
            )}
            {!user && (
                <div>
                    <Link to="/artists/create-account">
                        <Button secondary>
                            <AddIcon stroke={theme.primary} />
                            Create a new account
                        </Button>
                    </Link>
                    <Link to="/artists/log-in">
                        <Button secondary>
                            <AddIcon stroke={theme.primary} />
                            Log In
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Account;
