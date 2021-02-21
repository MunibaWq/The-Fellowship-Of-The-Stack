import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as V from "victory";
import { getSalesByProduct } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";
import Button from "../../../components/Reusable/Button";
import { Input, Label } from "../../../components/Reusable/Input";
const sorters = {
    "Product Name": (one, two) => {
        return one.title.localeCompare(two.title);
    },
    "Color": (one, two) => {
        return one.color.localeCompare(two.color);
    },
    "Size": (one, two) => {
        return one.size.localeCompare(two.size);
    },
    "Price": (one, two) => {
        return +one.sale_price - +two.sale_price;
    },
    "# Sold": (one, two) => {
        if (one && two) {
            return +one.quantity - +two.quantity;
        }
    },
    "Total Sales": (one, two) => {
        return +one.sum - +two.sum;
    },
};
const SalesByProduct = () => {
    const [productData, setProductData] = useState();
    const [term, setTerm] = useState("");
    const [start, setStart] = useState("01-01-1900");
    const [end, setEnd] = useState(new Date().toUTCString());
    const [sortBy, setSortBy] = useState('# Sold')
    useEffect(() => {
        const fetchData = async (query) => {
            const data = await getSalesByProduct(query);

            setProductData(data);
        };
        let query = `${term.toUpperCase()}&${start}&${end}`;
        fetchData(query);
    }, [term, start, end]);
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
            <SearchBarDiv>
                <Label>Search by Product Title</Label>
                <SearchBar
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search"
                    type="text"
                />
                <br />
                <br />
                <Label>Date Range</Label>
                <br />
                <br />
                <Label>From:</Label>

                <Input
                    style={{ width: "20%" }}
                    onChange={(e) => {
                        let toDate = new Date(e.target.value);
                        let date1Set = toDate.setDate(toDate.getDate());
                        setStart(new Date(date1Set).toUTCString());
                    }}
                    type="date"
                />

                <Label style={{ paddingLeft: "3%" }}>To:</Label>
                <Input
                    style={{ width: "20%" }}
                    onChange={(e) => {
                        let toDate = new Date(e.target.value);
                        let date2Set = toDate.setDate(toDate.getDate() + 1);
                        setEnd(new Date(date2Set).toUTCString());
                    }}
                    type="date"
                />
            </SearchBarDiv>

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
                            innerRadius={125}
                            labelRadius={150}
                            labelComponent={<CustomLabel />}
                            labels={({ datum }) => `${datum.x}: $${+datum.y}`}
                            colorScale={[
                                theme.primaryHover,
                                theme.primaryHover + "cc",
                                theme.primaryHover + "99",
                                theme.primaryHover + "66",
                                theme.primaryHover + "33",
                                theme.primaryHover + "18",
                            ]}
                            data={productData.sort(sorters['# Sold'])
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
                                .map((product) => {
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
                            <tr>
                                {headers.map((header, index) => (
                                    <th
                                        onClick={() => {
                                            setSortBy(header);
                                        }}
                                        key={header + index}>
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                                {productData && productData.sort(sorters[sortBy]).map((product, index) => {
                                    return (
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
                                    )
                                })}
                        </tbody>
                    </SBPTable>
                </div>
            )}
        </SBPContainer>
    );
};

export default SalesByProduct;
class CustomLabel extends React.Component {
    render() {
        return (
            <g>
                <V.VictoryTooltip
                    {...this.props}
                    x={175}
                    y={175}
                    orientation="top"
                    pointerLength={0}
                    cornerRadius={50}
                    flyoutWidth={100}
                    flyoutHeight={100}
                    flyoutStyle={{ fill: theme.primary }}
                />
            </g>
        );
    }
}


CustomLabel.defaultEvents = V.VictoryTooltip.defaultEvents;

//class App extends React.Component {
//    render() {
//        return (
//            <VictoryPie
//                style={{ labels: { fill: "white" } }}
//                innerRadius={100}
//                labelRadius={120}
//                labels={({ datum }) => `# ${datum.y}`}
//                labelComponent={<CustomLabel />}
//                data={[
//                    { x: 1, y: 5 },
//                    { x: 2, y: 4 },
//                    { x: 3, y: 2 },
//                    { x: 4, y: 3 },
//                    { x: 5, y: 1 },
//                ]}
//            />
//        );
//    }
//}

const MagnifyIcon = styled.div`
    position: absolute;
    margin-top: 20px;
    right: 10px;
`;
const SearchBarDiv = styled.div`
    position: relative;
    margin-bottom: 40px;
`;
const SearchBar = styled.input`
    padding: 5px;
    font-size: 26px;
    width: 100%;
    height: 50px;
    margin: 10px 0;
    border: 3px solid rgba(68, 68, 68, 0.1);
    border-radius: 10px;
    :focus,
    ::active,
    :hover {
        border: 3px solid ${theme.primary};
    }
    ::-webkit-input-placeholder {
        color: rgba(68, 68, 68, 0.3);
        letter-spacing: 0.05em;
        margin: 30px 0 0 8px;
        font-size: 0.8em;
        font-weight: 700;
    }

    ::-moz-placeholder {
        /* Firefox 19+ */
        color: rgba(68, 68, 68, 0.3);
        margin: 30px 0 0 8px;
        letter-spacing: 0.05em;
        font-size: 0.8em;
        font-weight: 700;
    }
    :-ms-input-placeholder {
        /* IE 10+ */
        color: rgba(68, 68, 68, 0.3);
        letter-spacing: 0.05em;
        margin: 30px 0 0 8px;
        font-size: 0.8em;
        font-weight: 700;
    }
    :-moz-placeholder {
        /* Firefox 18- */
        color: rgba(68, 68, 68, 0.3);
        letter-spacing: 0.05em;
        margin: 30px 0 0 8px;
        font-size: 0.8em;
        font-weight: 700;
    }
`;

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
        th {
            cursor:pointer;
            text-decoration: underline;
        }
    }
`;

const PieContainer = styled.div`
    width: 500px;
    svg {
        width: fit-content;
        height: fit-content;
    }
`;
