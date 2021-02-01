import styled from "styled-components";
import theme from "../Reusable/Colors";

export const Radio = styled.div`
    padding-top: 10px;
`;
export const ImageUpload = styled.section``;
export const ImageList = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-y: auto;
    height: 50vh;
    margin-top: 20px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
`;
export const RemoveIcon = styled.div`
    display: flex;
    cursor: pointer;
`;
export const Form = styled.form`
    margin-top: 40px;
    grid-template-columns: 30% 65%;
    grid-template-rows: auto;
    display: grid;
    grid-column-gap: 5%;
    /* @media only screen and (min-width: 800px) {
        height: 95%; 
     } */
`;
export const RowContainer1 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 1;
    grid-column: 2;
`;
export const Instruction1 = styled.div`
    padding: 20px 20px 20px 0;
    grid-row: 1;
    grid-column: 1;
    border-bottom: 2px dashed #ccc;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
export const RowContainer2 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 2;
    grid-column: 2;
`;
export const Instruction2 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 2;
    grid-column: 1;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
export const RowContainer3 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 3;
    grid-column: 2;
`;
export const Instruction3 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 3;
    grid-column: 1;
    text-align: left;

    display: flex;
    flex-direction: column;
    justify-content: center;
`;
export const RowContainer4 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 4;
    grid-column: 2;
    align-items: center;
`;
export const Instruction4 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 4;
    grid-column: 1;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
export const RowContainer5 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 5;
    grid-column: 2;
    align-items: center;
`;
export const Instruction5 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 5;
    grid-column: 1;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
export const ColorDiv = styled.div`
    position: relative;
    margin: 20px 0;
`;
export const SizeDiv = styled.div`
    position: relative;
    margin: 20px 0;
`;
export const Container = styled.div`
    display: flex;
    justify-content: center;
`;
export const Error = styled.p`
    color: red;
`;
export const NewSize = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 7px 15px;
    background: ${theme.primary};
    color: ${theme.secondary};
    margin: 8px;
    border-radius: 20px;

    p {
        margin-right: 10px;
        color: ${theme.secondary};
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 0.05em;
        margin-bottom: unset;
    }
`;
export const NewSizePrice = styled.p`
    margin-right: 10px;
`;
export const UploadedImage = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin: 0 20px;
`;
export const ImagesDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const ColorOption = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    border: 2px solid ${theme.primary};
    border-radius: 20px;
    margin: 8px;
    p {
        margin-right: 10px;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 0.05em;
    }
`;
export const ColorPreview = styled.div`
    width: 20px;
    height: 20px;
    margin-right: 20px;
    border-radius: 50%;
    border: 1px solid black;
    background-color: ${(props) => props.color};
`;
