import styled from "styled-components"
import theme from "./Colors"

const Pill = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 5px;
background-color: ${theme.green};
border-radius: 50px;
/* min-width: 25px;
max-width: 30px; */
p{
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 700;
    color: ${theme.secondary};
    padding:0;
    margin: 0;
}
`
export default Pill;