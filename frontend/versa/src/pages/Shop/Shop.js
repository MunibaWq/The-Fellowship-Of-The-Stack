import React, { useEffect, useState } from "react";
import { getAllProducts, searchProducts } from "../../axios/gets";
import Box from "../../components/Redesign/Reusable/Box";
import PageContainer from "../../components/Redesign/Reusable/PageContainer";
import Header from "../../components/Redesign/Reusable/Header";
import Loading from "../../components/Redesign/Reusable/Loading";

const Shop = () => {
    const [products, setProducts] = useState();
    const [query, setQuery] = useState();
    const calcTotalStock = (product1) => {
        return product1.stock.reduce((total, curr) => {
            total += curr.quantity;
            return total;
        }, 0);
    };

    useEffect(() => {
        const getProducts = async () => {
            let data = await getAllProducts();
            data = data.sort((product1, product2) => {
                if (calcTotalStock(product1) === 0) {
                    return 1;
                }
                return -1;
            });

            setProducts(data);
        };
        getProducts();
    }, []);
    const search = async () => {
        let data = await searchProducts(query);
        setProducts(data);
    };
    return (
        <PageContainer>
            <Header
                title="Shop"
                sub="Support your favourite talented artists and buy presents for loved ones."
                search
                type="shop"
                placeholder="Search for products"
                onClick={() => {
                    if (query) {
                        search();
                    }
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        search();
                    }
                }}
                onChange={(e) => setQuery(e.target.value.replace(/[.?]/g, ""))}
            />
            {!products ? (
                <Loading />
            ) : (
                <Box
                    dataToMap={products}
                    boxTitle="Artist Spotlight: Wonderland"
                    boxDescription="Shop the creations of this month’s featured local artist."
                        type="shop"
                        link="product-item"
                        awsFolder="images"
                />
            )}
        </PageContainer>
    );
};

export default Shop;
