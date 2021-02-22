import React from "react";
import Input from "./Input";
import { Label } from "../../Reusable/Input";
import styled from "styled-components";
export const DateRangeSearch = ({ setDate1, setDate2 }) => {
    return (
        <SearchBarDiv>
            <DateContainer>
                <Label>From:</Label>

                <Input
                    onChange={(e) => {
                        let toDate = new Date(e.target.value);
                        let date1Set = toDate.setDate(toDate.getDate());
                        setDate1(new Date(date1Set));
                    }}
                    type="date"
                />
            </DateContainer>
            <DateContainer>
                <Label style={{ paddingLeft: "3%" }}>To:</Label>
                <Input
                    onChange={(e) => {
                        let toDate = new Date(e.target.value);
                        let date2Set = toDate.setDate(toDate.getDate() + 1);
                        setDate2(new Date(date2Set));
                    }}
                    type="date"
                />
            </DateContainer>
        </SearchBarDiv>
    );
};
const DateContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
export const SearchBarDiv = styled.div`
    display: flex;
`;
