import React, { useRef, useState } from 'react'
import styled from "styled-components"
import { useForm } from 'react-hook-form'
import RenderSize from '../../components/Product/RenderSize'
import { DeleteIcon } from "../../images/icons";
import imageTest from "../../images/imageTest.png"

const AddProduct = () => {
    const { register, handleSubmit, errors } = useForm()
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])
    const [image, setImage] = useState(null)

    const colorValue = useRef()
    const colorPick = useRef()
    const sizeLabel = useRef()
    const sizePrice = useRef()

    function onSubmit(data) {
        console.log(data)
    }
    function setColorLabelAndValue() {
        let temp = {
            label: colorPick.current.value,
            value: colorValue.current.value
        }
        let appendedColors = colors.concat([temp])
        setColors(appendedColors)
    }
    function setSizeLabelAndPrice() {
        let temp = {
            label: sizeLabel.current.value,
            price: sizePrice.current.value
        }
        let appendedSizes = sizes.concat([temp])
        setSizes(appendedSizes)
    }
    function imageHandler(e) {
        const reader = new FileReader()
        reader.onload = () =>{
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    return (
        <div>
        <Title>Create a new product</Title>
        <CreateProductForm onSubmit={handleSubmit(onSubmit)}>
        <section>
        <StyledFieldSet>
        <h2>Product Details</h2>
        <label htmlFor="product-name">Name:</label>
            <input name="product-name" type="text" ref={register}/>
            <label htmlFor="product-price">Price:</label>
            <input name="product-price" type="number" ref={register}/>
            <label htmlFor="product-description">Description:</label>
            <input name="product-description" type="text" ref={register}/>
            <label htmlFor="product-sizes&fit">Sizes and fit:</label>
            <input name="product-sizes&fit" type="text" ref={register}/>
            <label htmlFor="product-materials">Materials:</label>
            <input name="product-materials" type="text" ref={register}/>
        </StyledFieldSet>
        </section>
            <section>
             <StyledFieldSet>
             <h2>Colors</h2>
             <label htmlFor="product-color-label">Color Label:</label>
                <input name="product-color-label" type="text" ref={ register, colorPick }/>
                <label htmlFor="product-color">Color:</label>
                <input name="product-color" type="color" ref={register, colorValue}/>
                <NewColourContainer>
                {colors.length > 0 ? colors.map(label=>{
                    return (
                        <CurrentColour>
                        {label.label}{label.value}
                        <ColourPreview />
                        <Delete src={DeleteIcon}/> 
                        </CurrentColour>)
                }):""}
                </NewColourContainer>
                
                <button type="button" onClick={setColorLabelAndValue}>Add</button>
             </StyledFieldSet>   
             <StyledFieldSet>
             <h2>Sizes</h2>
             <label htmlFor="product-size">Size:</label>
                <select name="product-size" ref={register, sizeLabel}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="x-large">X-Large</option>
                </select>
                <label htmlFor="product-size-price">New Size Price:</label>
                <input name="product-size-price" defaultValue="0" type="number" ref={register, sizePrice}/>
                <NewSizeContainer>
                {sizes.length > 0 ? sizes.map(size=>{
                    return (
                        <NewSize>
                        {size.label}{size.price}
                        <NewSizePrice />
                        <Delete src={DeleteIcon}/> 
                        </NewSize>
                    )
                }): ""}</NewSizeContainer>
                
                <button type="button" onClick={setSizeLabelAndPrice}>Add</button>
             </StyledFieldSet>   
             </section>  
                <section>
                <StyledFieldSet>
                <h2>Images</h2>
                <label htmlFor="product-image">Product Image:</label>
                <input name="product-image" type="file" ref={register}
                    onChange={imageHandler} accept="image/*"
                    />
                <img src={image} width="300px" height="160px"/>
                <ImageCardsContainer>
                <ImageCard>
                <UploadedImage src={imageTest} />
                <File><ImgFileName>1234.jpg</ImgFileName><Delete src={DeleteIcon}/> </File>
                <ChooseAsThumbnail>
                <input type="radio" id="assdd" name="ChooseThumbnail" value="{FileName}"/>
                <label for="{FileName}">Choose as thumbnail</label>
                </ChooseAsThumbnail>
                </ImageCard>
                </ImageCardsContainer>
                <button>Add</button>
                </StyledFieldSet>
                </section>
                <SubmitButton type="submit">Submit</SubmitButton>
            </CreateProductForm>
        </div>
    )
}

export default AddProduct

const Title = styled.h1`
font-size:  48px;

`;

const CreateProductForm = styled.form`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
padding: 100px;
margin: 30px 0;
input{
    label{
        font-size: 18px;
    }
}
`;

const StyledFieldSet = styled.section`
background-color: inherit;
border: none;
margin: 30px 0;
h2{
    margin-bottom: 10px;
    font-size: 24px;
}
button{
    background: #FFB649;
    border-radius: 50px;
    padding: 5px 10px;
    border: none;
}

input{
    padding: 5px;
    margin-bottom: 10px;
    border: none;
}
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    background: #038d82;
    border-radius: 50px;
`;

const NewColourContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
`;

const CurrentColour = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;
`;

const ColourPreview = styled.div`
    border-radius: 100;
    background-color: #C5C3FF;
`;

const Delete = styled.img`
    width: 16px;
`;

const NewSizeContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
`;

const NewSize = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    background: #C5C3FF;
`;

const NewSizePrice = styled.p``;

const ImageCardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
`;

const ImageCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #C5C3FF;
    margin: 10px 0px;
`;

const UploadedImage = styled.img`
    width: 200px;
    height: 250px;
`;

const ImgFileName = styled.p`
font-size: 18px;
`;

const File = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
`;

const ChooseAsThumbnail = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
`;