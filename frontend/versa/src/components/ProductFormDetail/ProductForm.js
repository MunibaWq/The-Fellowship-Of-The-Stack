import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TextField } from "../Reusable/Input";
import Button from "../Reusable/Button";
import Icon from "../Reusable/Icons";
import { ColorInput, Input } from "../../components/Reusable/Input";
import { Modal, ModalTitle } from "../../components/Reusable/Modal";
import axios from "axios";
import { addImage } from "../../axios/posts";
import { useParams } from "react-router";
import { getProductByID } from "../../axios/gets";
import theme from "../Reusable/Colors";
import { AddIcon, LineCloseIcon } from "../../images/icons";
let host = process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
function deleteItem(index, arr, set) {
    let newArray = [...arr];
    newArray.splice(index, 1);
    set(newArray);
}
const ProductForm = (props) => {
    const [thumbImg, setThumbImg] = useState("");
    const [colorModalVisible, setColorModalVisible] = useState(false);
    const [sizeModalVisible, setSizeModalVisible] = useState(false);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [images, setImages] = useState([]);
    const [inputName, setInputName] = useState();
    const [inputPrice, setInputPrice] = useState();
    const [inputDesc, setInputDesc] = useState();
    const [inputMaterials, setInputMaterials] = useState();
    const [formError, setFormError] = useState(false);
    const params = useParams();
    const id = params.id;
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
        setInputMaterials("");
    }
    useEffect(() => {
        const getProductData = async () => {
            let data = await getProductByID(id);
            setInputName(data.title);
            setColors(data.colours);
            setSizes(data.sizes);
            setInputPrice(data.price);
            setInputDesc(data.description);
            setInputMaterials(data.materials);
        };
        if (props.type === "Edit") {
            getProductData();
        }
    }, [id, props.type]);

    useEffect(() => {
        localStorage.setItem(
            "data",
            JSON.stringify({
                inputName: inputName,
                inputPrice: inputPrice,
                inputDesc: inputDesc,
                inputMaterials: inputMaterials,
                colors: colors,
                sizes: sizes,
            })
        );
    }, [inputName, inputPrice, inputDesc, inputMaterials, colors, sizes]);

    function setColorLabelAndValue() {
        let colorToAdd = document.querySelector("#colorToAdd").value;
        let colorLabelToAdd = document.querySelector("#colorLabelToAdd").value;

        if (colors.length < 6) {
            let temp = {
                label: colorLabelToAdd,
                value: colorToAdd,
            };
            setColors([...colors, temp]);
        }
    }
    function setSizeValue() {
        let sizeLabelToAdd = document.querySelector("#sizeLabelToAdd").value;
        let priceToAdd = document.querySelector("#priceToAdd").value;

        if (sizes.length < 25) {
            let temp = {
                label: sizeLabelToAdd,
                price: priceToAdd,
            };
            setSizes([...sizes, temp]);
        }
    }

    const submitData = (e) => {
        e.preventDefault();
        const productInfo = {
            title: inputName,
            price: inputPrice,
            description: inputDesc,
            colours: colors,
            artist_id: "1",
            sizes: sizes,
            materials: inputMaterials,
        };

        const sendData = async () => {
            let productID;
            if (props.type === "Add") {
                let res = await axios.post(host + "/products/create", {
                    data: productInfo,
                });
                productID = +res.data.id;
                console.log(productID);
            } else {
                axios.put(host + "/products/edit/" + id, {
                    data: productInfo,
                });
                productID = +id;
            }
            //adding thumbnail
            images.forEach(async (image) => {
                let { imageFile, label, size } = image;
                console.log(imageFile);
                console.log(thumbImg);

                if (imageFile === thumbImg) {
                    size = "thumb";
                    console.log(imageFile);
                }

                let res = await addImage(imageFile, label, size, productID);

                if (!res)
                    alert(
                        JSON.stringify(imageFile) +
                            " failed to upload, go to edit product to try to add picture again"
                    );
            });
            // alert(productID);
            clearField();
            if (props.type === "Edit") {
                window.location.href = window.location.href.replace(
                    "products/edit",
                    "product-item"
                );
            } else {
                // let productID = 1;

                window.location.href = window.location.href.replace(
                    "products/create",
                    "product-item/" + productID
                );
            }
        };
        let error = document.getElementById("error");
        if (!error) {
            sendData();
        } else {
            setFormError(true);
        }
    };

    return (
        <Form onSubmit={submitData}>
            <Instruction1>Add your products name and price!</Instruction1>
            <RowContainer1>
                <h2>Product Details</h2>
                <TextField
                    multi={false}
                    tests={[
                        {
                            test: (input) => input.length < 1,
                            error: "Required",
                        },
                        {
                            test: (input) => input.length < 3,
                            error: "Minimum 3 characters.",
                        },
                        {
                            test: (input) => input.length > 45,
                            error: "Title too long",
                        },
                    ]}
                    label="Product Name"
                    value={inputName}
                    setValue={setInputName}
                ></TextField>
                <TextField
                    multi={false}
                    tests={[
                        {
                            test: (input) => isNaN(input),
                            error: "Numerical values only",
                        },
                        {
                            test: (input) => input.length < 1,
                            error: "Required",
                        },
                        {
                            test: (input) => input && +input <= 0,
                            error: "Minimum 0.01",
                        },
                    ]}
                    label="Price"
                    value={inputPrice}
                    setValue={setInputPrice}
                ></TextField>
            </RowContainer1>
            <Instruction2>
                Add the description of your product, keep it simple!! <br /> Add
                the materials list of your products!{" "}
            </Instruction2>
            <RowContainer2>
                <TextField
                    multi={true}
                    tests={[
                        {
                            test: (input) => input.length < 10,
                            error: "Minimum 10 characters",
                        },
                    ]}
                    label="Description"
                    value={inputDesc}
                    setValue={setInputDesc}
                ></TextField>
                <TextField
                    multi={true}
                    tests={[
                        {
                            test: (input) => input.length < 10,
                            error: "Minimum 10 characters",
                        },
                    ]}
                    label="Materials"
                    value={inputMaterials}
                    setValue={setInputMaterials}
                ></TextField>
            </RowContainer2>
            <Instruction3>
                Choose the colour of your product and size
            </Instruction3>
            <RowContainer3>
                <ColorDiv
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <h2>Colours</h2>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            width: "75%",
                            justifyContent: "space-between",
                        }}
                    >
                        {colors &&
                            colors.map((color, index) => {
                                return (
                                    <ColorOption>
                                        <ColorPreview color={color.value} />
                                        {color.label}
                                        <RemoveIcon
                                            onClick={() => {
                                                deleteItem(
                                                    index,
                                                    colors,
                                                    setColors
                                                );
                                            }}
                                        >
                                            <LineCloseIcon stroke="black" />
                                        </RemoveIcon>
                                    </ColorOption>
                                );
                            })}
                    </div>

                    {colorModalVisible && (
                        <Modal width="fit-content">
                            <ModalTitle>Add A Color Option</ModalTitle>
                            <label htmlFor="colorToAdd">
                                Click To Choose Color
                            </label>
                            <ColorInput id="colorToAdd" />
                            <label>Color Name</label>
                            <Input label="Color Name" id="colorLabelToAdd" />
                            <Button
                                primary
                                onClick={() => {
                                    setColorLabelAndValue();
                                    setColorModalVisible(false);
                                }}
                            >
                                Add Option
                            </Button>
                        </Modal>
                    )}
                    <Button
                        secondary
                        onClick={() => {
                            setColorModalVisible(true);
                        }}
                    >
                        Add
                        <AddIcon />
                    </Button>
                </ColorDiv>
                <SizeDiv
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <h2>Sizes</h2>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            width: "75%",
                            justifyContent: "space-between",
                        }}
                    >
                        {sizes.length > 0 &&
                            sizes.map((size, index) => {
                                return (
                                    <NewSize>
                                        <p>{size.label}</p>

                                        <NewSizePrice>
                                            $ {size.price}
                                        </NewSizePrice>
                                        <RemoveIcon
                                            onClick={() => {
                                                deleteItem(
                                                    index,
                                                    sizes,
                                                    setSizes
                                                );
                                            }}
                                        >
                                            <LineCloseIcon stroke="black" />
                                        </RemoveIcon>
                                    </NewSize>
                                );
                            })}
                    </div>
                    {sizeModalVisible && (
                        <Modal width="fit-content">
                            <ModalTitle>Add A Size Option</ModalTitle>

                            <label>Size Label</label>
                            <Input label="Size Label" id="sizeLabelToAdd" />
                            <label>Additional cost for size</label>
                            <Input label="Size Label" id="priceToAdd" />
                            <Button
                                primary
                                onClick={() => {
                                    setSizeValue();
                                    setSizeModalVisible(false);
                                }}
                            >
                                Add Option
                            </Button>
                        </Modal>
                    )}
                    <Button
                        secondary
                        onClick={() => {
                            setSizeModalVisible(true);
                        }}
                    >
                        Add
                        <AddIcon />
                    </Button>
                </SizeDiv>
            </RowContainer3>
            <Instruction4>Choose your images</Instruction4>
            <RowContainer4>
                <ImagesDiv>
                    <h2>Images</h2>
                    <ImageUpload>
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
                            accept={"image/jpeg"}
                        ></input>
                    </ImageUpload>
                    <ImageList>
                        {images.map((image, index) => {
                            return (
                                <>
                                    <UploadedImage
                                        key={index}
                                        alt="product"
                                        src={image.image}
                                    />
                                    <Radio>
                                        <label htmlFor={"thumb" + index}>
                                            <input
                                                type="radio"
                                                id={"thumb" + index}
                                                name="chosenOne"
                                                onClick={() => {
                                                    setThumbImg(
                                                        image.imageFile
                                                    );
                                                    console.log(image.image);
                                                }}
                                            />
                                            Choose your thumbnail
                                        </label>
                                    </Radio>
                                </>
                            );
                        })}
                    </ImageList>
                </ImagesDiv>
            </RowContainer4>
            <Instruction5>Submit or Cancel your new product!</Instruction5>
            <RowContainer5>
                <Container>
                    <Button onClick={clearField}>
                        Cancel
                        <Icon type="lineClose" />
                    </Button>
                    <Button primary onClick={submitData}>
                        Submit
                    </Button>
                </Container>
                {formError && <Error>Please check all input is valid</Error>}
            </RowContainer5>
        </Form>
    );
};

export default ProductForm;

const Radio = styled.div`
    padding-top: 10px;
`;

const ImageUpload = styled.section`
    @media only screen and (min-width: 800px) {
        width: 220px;
    }
`;
const ImageList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    height: 50vh;
`;

const RemoveIcon = styled.div`
    display: flex;
    cursor: pointer;
`;
const Form = styled.form`
    grid-template-columns: 30% 70%;
    grid-template-rows: auto;
    display: grid;

    /* @media only screen and (min-width: 800px) {
        height: 95%; 
     } */
`;

const RowContainer1 = styled.div`
    margin-bottom: 25px;
    border-bottom: 2px dashed #ccc;
    grid-row: 1;
    grid-column: 2;
`;

const Instruction1 = styled.div`
    margin-bottom: 25px;
    grid-row: 1;
    grid-column: 1;
    border-bottom: 2px dashed #ccc;
`;

const RowContainer2 = styled.div`
    margin-bottom: 25px;
    border-bottom: 2px dashed #ccc;
    grid-row: 2;
    grid-column: 2;
`;
const Instruction2 = styled.div`
    margin-bottom: 25px;
    border-bottom: 2px dashed #ccc;
    grid-row: 2;
    grid-column: 1;
`;
const RowContainer3 = styled.div`
    margin-bottom: 25px;
    border-bottom: 2px dashed #ccc;
    grid-row: 3;
    grid-column: 2;
`;
const Instruction3 = styled.div`
    margin-bottom: 25px;
    border-bottom: 2px dashed #ccc;
    grid-row: 3;
    grid-column: 1;
`;
const RowContainer4 = styled.div`
    margin-bottom: 25px;
    border-bottom: 2px dashed #ccc;
    grid-row: 4;
    grid-column: 2;
    align-items: center;
`;
const Instruction4 = styled.div`
    margin-bottom: 25px;
    border-bottom: 2px dashed #ccc;
    grid-row: 4;
    grid-column: 1;
`;
const RowContainer5 = styled.div`
    margin-bottom: 25px;
    border-bottom: 2px dashed #ccc;
    grid-row: 5;
    grid-column: 2;
    align-items: center;
`;
const Instruction5 = styled.div`
    margin-bottom: 25px;
    border-bottom: 2px dashed #ccc;
    grid-row: 5;
    grid-column: 1;
`;

const ColorDiv = styled.div`
    @media only screen and (max-width: 800px) {
        position: relative;
    }
`;
const SizeDiv = styled.div`
    @media only screen and (max-width: 800px) {
        position: relative;
    }
`;
const Container = styled.div`
    display: flex;
`;

const Error = styled.p`
    color: red;
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
const ImagesDiv = styled.div`
    @media only screen and (min-width: 800px) {
        height: 75%;
    }
`;
const ColorOption = styled.div`
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

const ColorPreview = styled.div`
    width: 20px;
    height: 20px;
    margin-right: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;
