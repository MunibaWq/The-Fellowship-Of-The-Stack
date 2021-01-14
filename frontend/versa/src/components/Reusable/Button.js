import styled from "styled-components"

const Button = styled.button`
box-sizing: border-box;
border-radius: 50px;
background: #FFF3F3;
border: 3px solid #FF5C00;
padding: 10px 20px;
font-weight: 700;
letter-spacing: 5%;
margin-right: 20px;
transition: 0.5s ease;
cursor: pointer;

&:hover {
    transform: scale(1.1)
}
`;

export default Button;