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
const validInput = {title:false,price:false, description:false}
const ProductForm = (props) => {
    console.log("props", props);
    const [colorModalVisible, setColorModalVisible] = useState(false);
    const [sizeModalVisible, setSizeModalVisible] = useState(false);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [images, setImages] = useState([]);
    const [inputName, setInputName] = useState();
    const [inputPrice, setInputPrice] = useState();
    const [inputDesc, setInputDesc] = useState();
    const [inputMaterials, setInputMaterials] = useState();
    const [formError, setFormError]=useState(false)
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
        console.log("colorLabelToAdd", colorLabelToAdd);

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
        console.log("sizeLabelToAdd", sizeLabelToAdd);
        console.log("priceToAdd", priceToAdd);

        if (sizes.length < 25) {
            let temp = {
                label: sizeLabelToAdd,
                price: priceToAdd,
            };
            setSizes([...sizes, temp]);
        }
    }

    const submitData = () => {
        const productInfo = {
            title: inputName,
            price: inputPrice,
            description: inputDesc,
            colours: colors,
            artist_id: "1",
            sizes: sizes,
            materials: inputMaterials,
        };
        const sendData = () => {
            if (props.type === "Add") {
                axios.post(host + "/products/create", {
                    data: productInfo,
                });
            } else {
                axios.put(host + "/products/edit/" + id, {
                    data: productInfo,
                });
            }

            clearField();
            if (props.type === "Edit") {
                window.location.href = window.location.href.replace('products/edit', 'product-item')
            } else {
                let productID = 1
                window.location.href = window.location.href.replace('products/create', 'product-item/'+productID)

            }
        };
        let error = document.getElementById('error')
        console.log(error)
        if (!error) {
           
            sendData();
        } else {
            setFormError(true)
        }
    };

    return (
        <Form onSubmit={submitData}>
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
                        error: "Title too long"
                    }
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
                                            console.log("clicked");
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

                                    <NewSizePrice>$ {size.price}</NewSizePrice>
                                    <RemoveIcon
                                        onClick={() => {
                                            deleteItem(index, sizes, setSizes);
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
            <ImagesDiv>
                <h2>Images</h2>
                <Button secondary>
                    Add <AddIcon />
                </Button>
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
            </ImagesDiv>
            <Container>
                <Button onClick={clearField}>
                    Cancel
                    <Icon type="lineClose" />
                </Button>
                <Button primary onClick={submitData}>
                    Submit
                </Button>
            </Container>
            {formError && <Error >Please check all input is valid</Error>}
        </Form>
    );
};

export default ProductForm;
const RemoveIcon = styled.div`
    display: flex;
    cursor: pointer;
`;
const Form = styled.form`
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    @media only screen and (min-width: 800px) {
        height: 95%;
    }
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
    @media only screen and (min-width: 800px) {
        position: absolute;
        bottom: 0px;
    }
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
