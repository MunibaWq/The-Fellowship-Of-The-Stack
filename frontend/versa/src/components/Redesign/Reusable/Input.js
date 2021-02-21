import styled from "styled-components";

const Input = styled.input`
    padding: 8px;
    outline: none;
    width: clamp(250px, 10vw, 350px);
    margin-bottom: 1em;
    border-radius: 8px;
    border: 2px solid ${(props) => props.theme.blue};
    :active,
    :hover,
    :focus {
        border: 2px solid ${(props) => props.theme.purple};
    }
    ]
`;

export default Input;
