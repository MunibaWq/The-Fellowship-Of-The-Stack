import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { DeleteIcon } from "../../images/icons";
import Button from "../../components/Reusable/Button";
import imageTest from "../../images/imageTest.png";
import axios from "axios";
import { addImage } from "../../axios/posts";

const AddProduct = () => {
    const setDefault = (fieldName) => {
        if (localStorage.getItem(`${fieldName}`)) {
            return localStorage.getItem(`${fieldName}`);
        } else {
            return "";
        }
    };
    const setDefault2 = (arrName) => {
        if (localStorage.getItem(`${arrName}`)) {
            return JSON.parse(localStorage.getItem(`${arrName}`));
        } else {
            return [];
        }
    };

    const { register, handleSubmit, errors, reset } = useForm();
    const [colors, setColors] = useState(setDefault2("productColors"));
    const [sizes, setSizes] = useState(setDefault2("productSizes"));
    const [images, setImages] = useState([]);
    const [inputName, setInputName] = useState(setDefault("productName"));
    const [inputPrice, setInputPrice] = useState(setDefault("productPrice"));
    const [inputDesc, setInputDesc] = useState(setDefault("productDesc"));
    const [inputFit, setInputFit] = useState(setDefault("productFit"));
    const [inputMaterials, setInputMaterials] = useState(
        setDefault("productMaterials")
    );

    function clearField() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        setColors([]);
        setSizes([]);
        setImages([]);
        setInputName("");
        setInputPrice("");
        setInputDesc("");
        setInputFit("");
        setInputMaterials("");
        colorPick.current.value = "";
        colorValue.current.value = "#000000";
        sizePrice.current.value = "";
    }

    useEffect(() => {
        localStorage.setItem("productName", inputName);
        localStorage.setItem("productPrice", inputPrice);
        localStorage.setItem("productDesc", inputDesc);
        localStorage.setItem("productFit", inputFit);
        localStorage.setItem("productMaterials", inputMaterials);
        localStorage.setItem("productColors", JSON.stringify(colors));
        localStorage.setItem("productSizes", JSON.stringify(sizes));
    }, [
        inputName,
        inputPrice,
        inputDesc,
        inputFit,
        inputMaterials,
        colors,
        sizes,
    ]);

    const colorValue = useRef();
    const colorPick = useRef();
    const sizeLabel = useRef();
    const sizePrice = useRef();

    function onSubmit(data) {
        const productInfo = {
            title: data.product_name,
            price: data.product_price,
            description: data.product_description,
            colours: colors,
            artist_id: "1",
            sizes: sizes,
            size_and_fit: data.product_size_fit,
            materials: data.product_materials,
        };
        let productID;
        const sendData = async () => {
            const response = await axios.post(
                "http://localhost:5000/products/create",
                {
                    data: productInfo,
                }
            );
            productID = response.data;
            clearField();
        };
        sendData();
        console.log(data);

        //this will send the images to AWS S3
        images.forEach(async (image) => {
            let res = await addImage(
                image.imageFile,
                "",
                image.size,
                productID
            );
            console.log(res);
            if (!res)
                alert(
                    JSON.stringify(image.imageFile) +
                        " failed to upload, go to edit product to try to add picture again"
                );
        });
    }
    function setColorLabelAndValue() {
        if (colors.length < 3) {
            let temp = {
                label: colorPick.current.value,
                value: colorValue.current.value,
            };
            let appendedColors = colors.concat([temp]);
            setColors(appendedColors);
        }
    }
    function setSizeLabelAndPrice() {
        let temp = {
            label: sizeLabel.current.value,
            price: sizePrice.current.value,
        };
        let appendedSizes = sizes.concat([temp]);
        setSizes(appendedSizes);
    }
    return (
        <AddProductContainer>
            <FormContainer>
                <Title>Create a new product</Title>
                <CreateProductForm onSubmit={handleSubmit(onSubmit)}>
                    <section>
                        <StyledFieldSet>
                            <h2>Product Details</h2>
                            <label htmlFor="product_name">Name</label>
                            <input
                                name="product_name"
                                type="text"
                                ref={register({ required: true, minLength: 2 })}
                                value={inputName}
                                onChange={(e) => {
                                    setInputName(e.target.value);
                                }}
                            />
                            {errors.product_name?.type === "required" &&
                                "Input is required."}
                            {errors.product_name?.type === "minLength" &&
                                "Must be at least 2 characters."}
                            <br />
                            <label htmlFor="product_price">Price $</label>
                            <input
                                name="product_price"
                                type="number"
                                step="0.01"
                                ref={register({
                                    required: true,
                                    valueAsNumber: true,
                                })}
                                value={inputPrice}
                                onChange={(e) => {
                                    setInputPrice(e.target.value);
                                }}
                            />
                            {errors.product_price?.type === "required" &&
                                "Input is required."}
                            <br />
                            <label htmlFor="product_description">
                                Description
                            </label>
                            <textarea
                                name="product_description"
                                type="text"
                                ref={register({ required: true, minLength: 2 })}
                                value={inputDesc}
                                onChange={(e) => {
                                    setInputDesc(e.target.value);
                                }}
                            />
                            {errors.product_description?.type === "required" &&
                                "Input is required."}
                            {errors.product_description?.type === "minLength" &&
                                "Must be at least 2 characters."}
                            <br />
                            <label htmlFor="product_sizes_fit">
                                Sizes and fit
                            </label>
                            <textarea
                                name="product_sizes_fit"
                                type="text"
                                ref={register}
                                value={inputFit}
                                onChange={(e) => {
                                    setInputFit(e.target.value);
                                }}
                            />
                            <br />
                            <label htmlFor="product_materials">Materials</label>
                            <textarea
                                name="product_materials"
                                type="text"
                                ref={register({ required: true, minLength: 2 })}
                                value={inputMaterials}
                                onChange={(e) => {
                                    setInputMaterials(e.target.value);
                                }}
                            />
                            {errors.product_materials?.type === "required" && (
                                <error>Input is required.</error>
                            )}
                            {errors.product_materials?.type === "minLength" &&
                                "Must be at least 2 characters."}
                            <br />
                        </StyledFieldSet>
                    </section>
                    <section>
                        <StyledFieldSet>
                            <h2>Colors</h2>
                            <label htmlFor="product_color_label">
                                Color Name
                            </label>
                            <input
                                name="product_color_label"
                                type="text"
                                ref={register}
                                ref={colorPick}
                            />
                            <label htmlFor="product_color">Color</label>
                            <input
                                name="product_color"
                                type="color"
                                ref={register}
                                ref={colorValue}
                            />
                            <NewColourContainer>
                                {colors.length > 0
                                    ? colors.map((label) => {
                                          return (
                                              <CurrentColour>
                                                  {label.label}
                                                  {label.value}
                                                  <ColourPreview
                                                      colour={
                                                          label.value === ""
                                                              ? "#ffffff"
                                                              : label.value
                                                      }
                                                  />
                                                  <Delete
                                                      src={DeleteIcon}
                                                      alt="delete-icon"
                                                  />
                                              </CurrentColour>
                                          );
                                      })
                                    : ""}
                            </NewColourContainer>

                            <button
                                type="button"
                                onClick={setColorLabelAndValue}
                            >
                                Add
                            </button>
                        </StyledFieldSet>
                        <StyledFieldSet>
                            <h2>Sizes</h2>
                            <label htmlFor="product_size">Size</label>
                            <select
                                name="product_size"
                                ref={register}
                                ref={sizeLabel}
                            >
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                                <option value="x-large">X-Large</option>
                            </select>
                            <label htmlFor="product_size_price">
                                Additional Price
                            </label>
                            <input
                                name="product_size_price"
                                defaultValue="0"
                                step="0.01"
                                type="number"
                                ref={register({ min: 0, valueAsNumber: true })}
                                ref={sizePrice}
                            />
                            {errors.product_size_price?.type === "min" &&
                                "Value must be greater than "}
                            <NewSizeContainer>
                                {sizes.length > 0
                                    ? sizes.map((size) => {
                                          return (
                                              <NewSize>
                                                  {size.label}
                                                  {size.price}
                                                  <NewSizePrice />
                                                  <Delete
                                                      src={DeleteIcon}
                                                      alt="delete-icon"
                                                  />
                                              </NewSize>
                                          );
                                      })
                                    : ""}
                            </NewSizeContainer>

                            <button
                                type="button"
                                onClick={setSizeLabelAndPrice}
                            >
                                Add
                            </button>
                        </StyledFieldSet>
                    </section>
                    <section>
                        <StyledFieldSet>
                            <h2>Images</h2>
                            <label htmlFor="product-image">
                                Product Images:
                            </label>
                            <input
                                onChange={(e) => {
                                    let image = URL.createObjectURL(
                                        e.target.files[0]
                                    );
                                    setImages([
                                        ...images,
                                        {
                                            image: image,
                                            imageFile: e.target.files[0],
                                            size: "full",
                                        },
                                    ]);
                                }}
                                type={"file"}
                                accept={"image/png, image/jpeg"}
                            ></input>

                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                {images.map((image, index) => {
                                    return (
                                        <>
                                            <UploadedImage
                                                key={index}
                                                alt="product"
                                                src={image.image}
                                            />
                                        </>
                                    );
                                })}
                            </div>
                            {/* going to refactor this code */}
                            {/* <ImageCardsContainer>
                            <ImageCard>
                                <UploadedImage src={imageTest} />
                                <File>
                                    <ImgFileName>1234.jpg</ImgFileName>
                                    <Delete src={DeleteIcon} />{" "}
                                </File>
                                <ChooseAsThumbnail>
                                    <input
                                        type="radio"
                                        id="assdd"
                                        name="ChooseThumbnail"
                                        value="{FileName}"
                                    />
                                    <label for="{FileName}">
                                        Choose as thumbnail
                                    </label>
                                </ChooseAsThumbnail>
                            </ImageCard>
                        </ImageCardsContainer> */}
                            <button>Add</button>
                        </StyledFieldSet>
                    </section>
                    <ButtonContainer>
                        {/* I added func to clear whole form when cancel pressed */}
                        <CancelButton onClick={clearField} type="button">
                            Cancel
                        </CancelButton>
                        <SubmitButton type="submit">Submit</SubmitButton>
                    </ButtonContainer>
                </CreateProductForm>
            </FormContainer>
        </AddProductContainer>
    );
};

export default AddProduct;

const AddProductContainer = styled.div`
    padding: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

const FormContainer = styled.div`
    align-items: flex-start;
`;

const Title = styled.h1`
    font-size: 48px;
    @media (max-width: 768px) {
        font-size: 30px;
    }
`;

const CreateProductForm = styled.form`
    input {
        font: inherit;
        border: none;
        height: 30px;
        min-width: 650px;
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
    }

    label {
        font-size: 18px;
        margin-bottom: 10px;
    }

    textarea {
        font: inherit;
        margin-top: 10px;
        border: none;
        height: 90px;
        min-width: 650px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    @media (max-width: 768px) {
        margin: 15px 0;
    }
`;

const StyledFieldSet = styled.section`
background-color: inherit;
border: none;
margin: 30px 0;
h2{
    margin-bottom: 20px;
    font-size: 24px;
}
button{
    background: #FFB649;
    border-radius: 50px;
    padding: 5px 10px;
    border: none;
    margin: 30px 0;
    h2 {
        margin-bottom: 10px;
        font-size: 24px;
    }
    button {
        background: #ffb649;
        border-radius: 50px;
        padding: 5px 10px;
        border: none;
    }




@media (max-width: 768px) {
    h2{
        font-size: 20px;
    }
}
`;

const error = styled.p`
    font: inherit;
    color: red;
`;

const PreviewImg = styled.img`
    width: 200px;
    height: 250px;
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
    background-color: #c5c3ff;
`;

const ColourPreview = styled.div`
    border-radius: 100;
    background-color: #c5c3ff;
`;

const Delete = styled.svg`
    width: 16px;
    color: #444444;
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
    background: #c5c3ff;
`;

const NewSizePrice = styled.p``;

const ChooseImage = styled.div`
    display: flex;
    flex-direction: column;
`;

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
    background: #c5c3ff;
    margin: 10px 0px;
`;

const UploadedImage = styled.img`
    width: 200px;
    /* height: 250px; */
    height: 200px;
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

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
`;

const CancelButton = styled(Button)`
    background: #ffb649;
    border: 3px solid #ffb649;
`;

const SaveButton = styled(Button)`
    border: 3px solid #038d82;
    color: #038d82;
`;

const SubmitButton = styled(Button)`
    padding: 10px 40px;
    background: #038d82;
    border: 3px solid #038d82;
    color: white;
`;
