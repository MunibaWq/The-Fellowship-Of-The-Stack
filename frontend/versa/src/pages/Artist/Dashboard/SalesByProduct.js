import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getSalesByProduct } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";
import { Label } from "../../../components/Reusable/Input";
import { DateRangeSearch } from "../../../components/Redesign/Reusable/DateRangeSearch";
import TopBar from "../../../components/Redesign/Reusable/TopBar";
import TableTopBar from "../../../components/Redesign/Reusable/TableTopBar";
import { Pie } from "./PieContainer";
import AnalyticsTableSBP from "./AnalyticsTableSBP";
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
        return +two.sum - +one.sum;
    },
};
const SalesByProduct = () => {
    const [productData, setProductData] = useState();
    const [pieData, setPieData] = useState();
    const [term, setTerm] = useState("");
    const [start, setStart] = useState(new Date("01-01-1998"));
    const [end, setEnd] = useState(new Date("2999"));
    const [sortBy, setSortBy] = useState("# Sold");
    useEffect(() => {
        const fetchData = async (query) => {
            const data = await getSalesByProduct(query);
            console.log("got data", data);
            setProductData(data);
            setPieData(data.sort(sorters["Total Sales"]));
        };
        let query = `${term.toUpperCase()}&${start.toUTCString()}&${end.toUTCString()}`;
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
    console.log("rerender", productData);
    return (
        <SBPContainer>
            <SearchBarDiv>
                <br />
                <br />
                <Label>Search by Product Title</Label>
                <SearchBar
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search by Product Title"
                    type="text"
                />
                <br />
                <br />
                <DateRangeSearch
                    setDate1={setStart}
                    setDate2={setEnd}></DateRangeSearch>
            </SearchBarDiv>

            {!productData || !pieData ? (
                <Loading />
            ) : (
                <Data>
                    <Left>
                        <Card>
                            <TopBar title="Top Selling Products" />
                            <Pie sorters={sorters} pieData={pieData} />
                        </Card>
                    </Left>
                    <Right>
                        <Card>
                            <TableTopBar
                                setSortBy={setSortBy}
                                littleTitles={headers}
                            />
                            <AnalyticsTableSBP
                                sorters={sorters}
                                tableData={productData}
                                sortBy={sortBy}
                            />
                        </Card>
                    </Right>
                </Data>
            )}
        </SBPContainer>
    );
};

export default SalesByProduct;

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
    place-self: flex-start;
    width: 100%;
`;

const Card = styled.div`
    border-radius: 16px 16px 0 0;
    margin: 24px;

    h4 {
        color: ${(props) => props.theme.lightBlue};
        margin: 20px 40px;
    }
`;

const Data = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    width: 100%;
`;

const Left = styled.div`
    display: grid;
    grid-template-rows: fit-content;
`;

const Right = styled.div`
    display: grid;
    grid-template-rows: fit-content;
`;
