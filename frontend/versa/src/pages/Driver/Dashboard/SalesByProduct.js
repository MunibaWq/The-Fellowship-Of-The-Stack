import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as V from "victory";
import { getSalesByProduct } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";

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
    let headers = ["Product Name", "Price", "# Sold", "Total Sales"];
    return (
        <SBPContainer>
            {/*<Button to="/dashboard">Back to Dashboard</Button>*/}
            <h1>Sales By Product</h1>
            {!productData ? (
                <Loading />
            ) : (
                <div>
                    <PieContainer>
                        <V.VictoryPie
                            padding={{ top: 0, left: 150, right: 150 }}
                            padAngle={2}
                            innerRadius={25}
                            style={{ labels: { fontSize: 5 } }}
                            labels={({ datum }) => `${datum.x}: $${datum.y}`}
                            colorScale={[
                                theme.primaryHover,
                                theme.primaryHover + "cc",
                                theme.primaryHover + "99",
                                theme.primaryHover + "66",
                                theme.primaryHover + "33",
                                theme.primaryHover + "18",
                            ]}
                            data={productData.map((product) => {
                                return {
                                    x: product.title.split(" ").join(`\n`),
                                    y: product.sum,
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
                                    <td>{product.sale_price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.sum}</td>
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
    padding: 2em 2em 2em calc(2em + 66px);

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
    svg {
        width: fit-content;
        height: fit-content;
    }
`;
