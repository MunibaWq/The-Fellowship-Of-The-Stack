import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import DeleteIcon from "../../images/deleteIcon.png";
import { TextField } from "../../components/Reusable/Input";
import Button from "../../components/Reusable/Button";
import axios from "axios";
import { addImage } from "../../axios/posts";
import { Modal } from "../../components/Reusable/Modal";
let host = process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
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

    const { register, handleSubmit, errors } = useForm();
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
    // const addColor = useRef();

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
            const response = await axios.post(host + "/products/create", {
                data: productInfo,
            });
            productID = response.data.id;
            images.forEach(async (image) => {
                let res = await addImage(
                    image.imageFile,
                    "",
                    image.size,
                    productID
                );

                if (!res)
                    alert(
                        JSON.stringify(image.imageFile) +
                            " failed to upload, go to edit product to try to add picture again"
                    );
            });
            clearField();
        };
        sendData();
        //this will send the images to AWS S3
    }
    function setColorLabelAndValue(e) {
        if (!colorPick.current.value) {
            return;
        }
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
    const [checkDelete, setCheckDelete] = useState(false);
    function deleteItem(index, arr) {
        arr.splice(index, 1);
        localStorage.setItem(`product${arr}`, JSON.stringify(arr));
        setCheckDelete(!checkDelete);
    }

    return (
        <FormContainer>
            <Title>Create a new product</Title>
            <CreateProductForm onSubmit={handleSubmit(onSubmit)}>
                <h2>Product Details</h2>
                <section>
                    <TextField
                        multi={true}
                        tests={[
                            {
                                test: (input) => isNaN(input),
                                error: "Only numbers",
                            },
                            {
                                test: (input) => input.length < 1,
                                error: "Required",
                            },
                        ]}
                        label="Label"
                    ></TextField>
                </section>
                <section>
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
                    <Error>
                        {errors.product_name?.type === "required" &&
                            "Input is required."}
                    </Error>
                    <Error>
                        {errors.product_name?.type === "minLength" &&
                            "Must be at least 2 characters."}
                    </Error>
                </section>
                <br />
                <section>
                    <label htmlFor="product_price">Price $</label>
                    <input
                        name="product_price"
                        type="number"
                        min="0.20"
                        step="0.01"
                        ref={register({
                            required: true,
                            valueAsNumber: true,
                        })}
                        value={inputPrice}
                        onWheel={(e) => {
                            e.preventDefault();
                        }}
                        onChange={(e) => {
                            setInputPrice(e.target.value);
                        }}
                    />
                    <Error>
                        {errors.product_price?.type === "required" &&
                            "Input is required."}
                    </Error>
                </section>
                <br />
                <section>
                    <label htmlFor="product_description">Description</label>
                    <textarea
                        name="product_description"
                        type="text"
                        ref={register({ required: true, minLength: 2 })}
                        value={inputDesc}
                        onChange={(e) => {
                            setInputDesc(e.target.value);
                        }}
                    />
                    <Error>
                        {errors.product_description?.type === "required" &&
                            "Input is required."}
                    </Error>
                    <Error>
                        {errors.product_description?.type === "minLength" &&
                            "Must be at least 2 characters."}
                    </Error>
                </section>
                <br />
                <section>
                    <label htmlFor="product_sizes_fit">Sizes and fit</label>
                    <textarea
                        name="product_sizes_fit"
                        type="text"
                        ref={register}
                        value={inputFit}
                        onChange={(e) => {
                            setInputFit(e.target.value);
                        }}
                    />
                </section>
                <br />
                <section>
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
                    <Error>
                        {errors.product_materials?.type === "required" &&
                            "Input is required."}
                    </Error>

                    <Error>
                        {errors.product_materials?.type === "minLength" &&
                            "Must be at least 2 characters."}
                    </Error>
                </section>
                <br />

                <h2>Colors</h2>
                <section>
                    <Modal>
                        <h5>Hello</h5>
                        <TextField label="Hello"></TextField>
                    </Modal>
                    <label htmlFor="product_color_label">Color Name</label>
                    <input
                        name="product_color_label"
                        type="text"
                        // ref={register} cant have 2 refs, this is only reading the second ref
                        ref={colorPick}
                        onChange={(e) => {
                            if (e.target.value) {
                                addColor.current.disabled = false;
                            } else {
                                addColor.current.disabled = true;
                            }
                        }}
                    />
                </section>
                <section>
                    <label htmlFor="product_color">Color</label>
                    <input
                        name="product_color"
                        type="color"
                        ref={register}
                        ref={colorValue}
                    />
                </section>

                <FormButton
                    type="button"
                    onClick={setColorLabelAndValue}
                    ref={addColor}
                >
                    Add
                </FormButton>

                <h2>Sizes</h2>
                <section>
                    <label htmlFor="product_size">Size</label>
                    <select name="product_size" ref={register} ref={sizeLabel}>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="x-large">X-Large</option>
                    </select>
                </section>
                <section>
                    <label htmlFor="product_size_price">Additional Price</label>
                    <input
                        name="product_size_price"
                        defaultValue="0"
                        step="0.01"
                        min="0"
                        type="number"
                        ref={register({ min: 0, valueAsNumber: true })}
                        ref={sizePrice}
                    />

                    <Error>
                        {errors.product_size_price?.type === "min" &&
                            "Value must be greater than "}
                    </Error>
                </section>
                <NewSizeContainer>
                    {sizes.length > 0 &&
                        sizes.map((size, index) => {
                            return (
                                <NewSize>
                                    <p>{size.label}</p>

                                    <NewSizePrice>$ {size.price}</NewSizePrice>
                                    <div
                                        onClick={() => deleteItem(index, sizes)}
                                    >
                                        <Delete
                                            src={DeleteIcon}
                                            alt="delete-icon"
                                        />
                                    </div>
                                </NewSize>
                            );
                        })}
                </NewSizeContainer>

                <FormButton type="button" onClick={setSizeLabelAndPrice}>
                    Add
                </FormButton>

                <h2>Images</h2>
                <section>
                    <label htmlFor="product-image">Upload Images</label>
                    <input
                        onChange={(e) => {
                            let image = URL.createObjectURL(e.target.files[0]);
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
                </section>
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
                {/* <FormButton type="button">Add</FormButton> */}

                <ButtonContainer>
                    {/* I added func to clear whole form when cancel pressed */}
                    <CancelButton onClick={clearField} type="button">
                        Cancel
                    </CancelButton>
                    <SubmitButton type="submit">Submit</SubmitButton>
                </ButtonContainer>
            </CreateProductForm>
        </FormContainer>
    );
};

export default AddProduct;

const FormContainer = styled.div`
    display: grid;
    grid-template-columns: auto;
`;

const Title = styled.h1`
    margin-top: 30px;
    font-size: 72px;
    text-align: center;

    @media (max-width: 760px) {
        font-size: 50px;
    }
    @media (max-width: 380px) {
        font-size: 40px;
    }
`;
const SubmitButton = styled(Button)`
    background: #038db2;
    color: white;
    border: 3px solid #038db2;
    padding: 10px 20px;
    transform: scale(1.2);
`;

const CreateProductForm = styled.form`
    display: flex;
    flex-direction: column;

    section {
        display: grid;
        grid-template-columns: auto auto;
        padding: 20px;

        @media (max-width: 360px) {
            grid-template-columns: auto;
        }
    }

    h2 {
        place-self: center;
        margin-top: 30px;
        font-size: 48px;
        @media (max-width: 760px) {
            font-size: 30px;
        }
        @media (max-width: 380px) {
            font-size: 24px;
        }
    }

    label {
        font: inherit;
        font-size: 24px;
        margin-right: 30px;
        @media (max-width: 760px) {
            font-size: 18px;
        }
        @media (max-width: 380px) {
            font-size: 16px;
        }
    }

    input {
        font: inherit;
        border: none;
    }

    input[type="color" i] {
        font: inherit;
        border: none;
    }
    textarea {
        font: inherit;
        border: none;
    }
`;

const FormButton = styled(Button)`
    background: #ffb649;
    border: none;
    padding: 10px 20px;
    max-width: 100px;
    align-self: end;
    margin: 20px;
`;

const Error = styled.p`
    grid-area: error;
    font: inherit;
    color: red;
    position: absolute;
    transform: translateY(-100%);
`;

const Delete = styled.img`
    width: 15px;
    height: 15px;
    color: #ffffff;
    transition: 0.2s ease-in-out;

    &:hover {
        transform: scale(1.15);
        cursor: pointer;
    }
`;

const NewSizeContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0px;
`;

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
    align-items: center;
    justify-content: center;
    padding: 0px;
    margin: 60px 30px 30px 30px;
`;

const CancelButton = styled(Button)`
    background: #ffb649;
    border: 3px solid #ffb649;
    transform: scale(1.2);
    margin-right: 30px;
`;

const NewSize = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    background: #c5c3ff;
    margin: 8px;

    p {
        margin-right: 10px;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 0.05em;
    }
`;

const NewSizePrice = styled.p`
    margin-right: 10px;
`;

const UploadedImage = styled.img`
    width: 200px;
    height: 200px;
`;
