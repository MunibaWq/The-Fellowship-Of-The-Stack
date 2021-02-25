import React, { useEffect, useState } from "react";

import PageContainer from "../../components/Redesign/Reusable/PageContainer";
import { LeftIcon } from "../../images/icons";
import BackLink from "../../components/Redesign/Reusable/BackLink";
import {
    getImagesByPID,
    getProductByID,
    getUserByToken,
} from "../../axios/gets";
import { setRedirect } from "../../redux/actions/Redirects";
import { clearChoices } from "../../redux/actions/ProductPage";
import { useDispatch } from "react-redux";
import Item from "../../components/Redesign/Reusable/Item";
import { useParams } from "react-router";
import AboutArtist from "../../components/Redesign/AboutArtist";
const ProductPage = () => {
    const params = useParams();
    const currentProduct = params.id;
    const [productDataState, setProductDataState] = useState([]);
    const [images, setImages] = useState([]);
    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductByID(currentProduct);

            setProductDataState(data);
        };
        const fetchImages = async () => {
            let response = await getImagesByPID(currentProduct);
            setImages(response);
        };
        window.scrollTo({
            top: 0,
            left: 0,
        });
        fetchProduct();
        fetchImages();
    }, [currentProduct]);
    const [user, setUser] = useState();
    let dispatch = useDispatch();
    useEffect(() => {
        const getUser = async () => {
            const res = await getUserByToken();
            setUser(res);
        };
        dispatch(setRedirect("productForm", ""));
        getUser();
        return () => {
            dispatch(clearChoices());
        };
    }, [dispatch]);
    console.log("p", productDataState);
    return (
        <PageContainer>
            <BackLink to="/shop">
                <LeftIcon />
                Shop
            </BackLink>
            <Item product={productDataState} images={images} />
            <AboutArtist item={productDataState} type="product" />
        </PageContainer>
    );
};

export default ProductPage;
