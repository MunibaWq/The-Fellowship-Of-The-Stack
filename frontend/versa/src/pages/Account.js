import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Reusable/Button";
import theme from "../components/Reusable/Colors";
import { AddIcon, EditIcon } from "../images/icons";
import Cookies from 'universal-cookie'
import { login, logout } from "../redux/actions/actions";
const cookies = new Cookies()
const Account = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);
    useEffect(() => {
        const userToken = cookies.get('token')
        if (userToken) {
            dispatch(login())
        }
    },[dispatch, user])
    return (
        <div>
            {user && (
              <>
                <Button onClick={() => {
                    cookies.remove('token',{ path: '/' })

                    dispatch(logout())
                    }} secondary>
                        <AddIcon stroke={theme.primary} />
                        Clicking me TOTALLY logs you out
                </Button>
                <Link to="/edit-account">
                        <Button secondary>
                            <EditIcon stroke={theme.primary} />
                            Edit your account
                        </Button>
                    </Link></>
          
            )}
            {!user && (
                <div>
                    <Link to="/create-account">
                        <Button secondary>
                            <AddIcon stroke={theme.primary} />
                            Create a new account
                        </Button>
                    </Link>
                    
                    <Link to="/log-in">
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
