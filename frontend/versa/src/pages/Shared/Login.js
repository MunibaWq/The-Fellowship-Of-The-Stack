import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { loginAction } from "../../redux/actions";
import { TextField } from "../../components/Reusable/Input";
import { axiosLogin } from "../../axios/posts";
// import { setEmail, setPassword } from "../../redux/actions/LoginPage";
import Button from "../../components/Reusable/Button";
import { setFormErrors } from "../../redux/actions/Errors";

const Login = (props) => {
    const loggedInUser = useSelector((state) => state.user);
    const input = useSelector((state) => state.formInputs.login);
    const formError = useSelector((state) => state.formErrors.login);

    const dispatch = useDispatch();
    const sendLogin = async () => {
        dispatch(setFormErrors('login',''))
        let error = document.getElementById("error");
        if (!error) {
            try {
                const user = await axiosLogin(input.email, input.password);
                dispatch(loginAction(user));
            } catch (e) {
                dispatch(
                    setFormErrors(
                        "login",
                        "Login Failed, please check that your email and password are correct"
                    )
                );
            }
        } else {
            dispatch(
                setFormErrors(
                    "login",
                    "Please check that you have entered a valid email address"
                )
            );
        }
    };

    // const email = useSelector((state) => state.loginEmail);
    // const password = useSelector((state) => state.loginPassword);
    return (
        <Container>
            {loggedInUser && loggedInUser.username && (
                <Redirect to={"/dashboard/" + loggedInUser.id} />
            )}
            <h2>Log In</h2>
            <TextField
                multi={false}
                tests={[
                    {
                        test: (input) => input.length < 6,
                        error:
                            "This email address does not exist in our system.",
                    },
                    {
                        test: (input) =>
                            input.search(/^[\w\d]+@[\w\d]+\.\w\w+$/) === -1,
                        error: "Enter a valid email address.",
                    },
                ]}
                label="Email"
                form="login"
                name="email"
            ></TextField>
            <TextField
                multi={false}
                password={true}
                tests={[
                    {
                        test: (input) => input.length < 0,
                        error: "Password is required",
                    },
                    // {
                    //     test: (input) =>
                    //         input.length >
                    //         input.search(/[A-Z]/) === -1 ||
                    //         input.search(/\d/) === -1,
                    //     error: "Please enter a valid password.",
                    // },
                ]}
                label="Password"
                form="login"
                name="password"
            ></TextField>
            <Button primary onClick={sendLogin}>
                Log In
            </Button>
            {formError && <LoginFailMessage>{formError.form}</LoginFailMessage>}
            {props.buyer && (
                <Link to="/artists/log-in">
                    <Button>Are you an artist?</Button>
                </Link>
            )}
        </Container>
    );
};

export default Login;
const LoginFailMessage = styled.p`
    color: red;
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2em;
    h2 {
        margin-bottom: 2em;
        margin-left: 3px;
    }
`;
