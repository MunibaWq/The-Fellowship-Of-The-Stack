import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { loginAction } from "../../redux/actions";
import { TextField } from "../../components/Reusable/Input";
import { axiosLogin } from "../../axios/posts";
// import { setEmail, setPassword } from "../../redux/actions/LoginPage";
import Button from "../../components/Reusable/Button";
import { useState } from "react";

const Login = (props) => {
    
    const loggedInUser = useSelector(state=>state.user)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loginFail, setLoginFail] = useState(false)
    const dispatch = useDispatch()
    const sendLogin = async () => {
        setLoginFail('')
        let error = document.getElementById("error");
        if (!error) {
           
            
        
            try {
                const user = await axiosLogin(email, password);
                console.log('Login', user)
                dispatch(loginAction(user));
            } catch (e) {
                setLoginFail('Login Failed, please check that your email and password are correct')
            }
        } else {
            setLoginFail('Please check that your have entered a valid email and password');
        }
        
    };
    
    // const email = useSelector((state) => state.loginEmail);
    // const password = useSelector((state) => state.loginPassword);
    console.log(email,password)
    return (
        <Container>
            {loggedInUser && loggedInUser.username && <Redirect to={"/dashboard/" + loggedInUser.id} />}
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
                value={email}
                setValue={setEmail}
              
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
                value={password}
                setValue={setPassword}
            ></TextField>
            <Button primary onClick={sendLogin}>
                Log In
            </Button>
            {loginFail && <LoginFailMessage >{loginFail}</LoginFailMessage>}
            {props.buyer && 
                <Link to="/artists/log-in">
                <Button>Are you an artist?</Button>
                </Link>
            }
        </Container>
    );
};

export default Login;
const LoginFailMessage = styled.p`color:red;`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2em;
    h2{
        margin-bottom: 2em;
        margin-left: 3px;
    }
`;
