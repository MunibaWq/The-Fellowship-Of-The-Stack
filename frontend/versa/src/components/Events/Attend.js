import React, { useEffect, useState } from "react";
import { amIGoing, getUserByToken } from "../../axios/gets";
import { deleteUserFromEventByID } from "../../axios/deletes";
import { userGoing } from "../../axios/posts";
import { Going, NotGoing } from "../../images/icons";
import Button from "../Redesign/Reusable/Button";
import { useHistory } from "react-router";
import styled from "styled-components";

const Attend = ({ event, changeAttending }) => {
    const [going, setGoing] = useState();
    const [user, setUser] = useState();
    const history = useHistory();
    useEffect(() => {
        const getAttendance = async () => {
            const goingResponse = await amIGoing(event.id);
            console.log(goingResponse)
            setGoing(goingResponse);
            const userResponse = await getUserByToken();
            console.log(userResponse)
            setUser(userResponse);
        };
        if (event) {
            getAttendance();
        }
    }, [event]);
    return (
        <IconContainer
            onClick={() => {
                if (user) {
                    if (going) {
                        deleteUserFromEventByID(event.id)
                        
                        changeAttending(curr=>curr-1)
                    } else {
                        userGoing(event.id);
                        changeAttending(curr=>curr+1)
                    }
                    setGoing(curr=>!curr)
                } else {
                    history.push("/account");
                }

            }}>
            {going ? <NotGoing /> : <Going />}
        </IconContainer>
    );
};

export default Attend;
 
const IconContainer = styled.div`
    margin: 0;
    width:32px;
    height:32px;
`