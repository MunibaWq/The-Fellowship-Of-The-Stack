import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as V from "victory";
import { getSalesByProduct } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";
import Button from "../../../components/Reusable/Button";

const SalesByProduct = () => {
    const [productData, setProductData] = useState();
    const currentUser = 1;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSalesByProduct(currentUser);

            setProductData(data);
        };

        fetchData();
    }, []);
    let headers = [
        "Product Name",
        "Color",
        "Size",
        "Price",
        "# Sold",
        "Total Sales",
    ];
    return (
        <SBPContainer>
            <Button to="/dashboard/artist">Back to Dashboard</Button>
            <h1>Sales By Product</h1>
            {!productData ? (
                <Loading />
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}>
                    <PieContainer>
                        <V.VictoryPie
                            height={250}
                            width={350}
                            //padding={{
                            //    top: 0,
                            //    left: 0,
                            //    right: 0,
                            //    bottom: 0,
                            //}}
                            padAngle={2}
                            innerRadius={25}
                            style={{ labels: { fontSize: 15 } }}
                            labels={({ datum }) => `${datum.x}: $${+datum.y}`}
                            colorScale={[
                                theme.primaryHover,
                                theme.primaryHover + "cc",
                                theme.primaryHover + "99",
                                theme.primaryHover + "66",
                                theme.primaryHover + "33",
                                theme.primaryHover + "18",
                            ]}
                            data={productData
                                .reduce((array, product, index) => {
                                    if (index < 4) {
                                        array.push(product);
                                    } else {
                                        array[3].title = "Other";
                                        array[3].sum =
                                            +array[3].sum + +product.sum;
                                    }

                                    return array;
                                }, [])
                                .map(product => {
                                    console.log(product);
                                    return {
                                        x:
                                            product.title
                                                .split(" ")
                                                .join(`\n`) +
                                            `\n${
                                                product.size !== "O"
                                                    ? product.size + " "
                                                    : ""
                                            }${
                                                product.color !== "O"
                                                    ? product.color
                                                    : ""
                                            }`,
                                        y: +product.sum,
                                    };
                                })}
                        />
                    </PieContainer>
                    <SBPTable>
                        <thead>
                            {headers.map((header, index) => (
                                <th key={header + index}>{header}</th>
                            ))}
                        </thead>
                        <tbody>
                            {productData.map((product, index) => (
                                <tr key={product.title + index}>
                                    <td>{product.title}</td>
                                    <td>
                                        {product.color === "O"
                                            ? "One Size"
                                            : product.color}
                                    </td>
                                    <td>
                                        {product.size === "O"
                                            ? "One Size"
                                            : product.size}
                                    </td>
                                    <td>{(+product.sale_price).toFixed(2)}</td>
                                    <td>{product.quantity}</td>
                                    <td>{(+product.sum).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </SBPTable>
                </div>
            )}
        </SBPContainer>
    );
};

export default SalesByProduct;

const SBPContainer = styled.div`
    width: 100vw;
    padding: 5em 2em;

    h1 {
        margin: 0 1em 2em 1em;
    }
`;

const SBPTable = styled.table`
    margin: 5px;
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    padding-top: 5px;
    td {
        font-weight: 500;
        padding: 6px;
        font-size: 18px;
    }
    table,
    th,
    thead {
        padding: 6px;
        border-collapse: collapse;
    }
    thead {
        border-bottom: 2px solid #9a9a9a;
        td {
            font-weight: 700;
        }
        text-align: left;
    }
`;

const PieContainer = styled.div`
    width: 500px;
    svg {
        width: fit-content;
        height: fit-content;
    }
`;
