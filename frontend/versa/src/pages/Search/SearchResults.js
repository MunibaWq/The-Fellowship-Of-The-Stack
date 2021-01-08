import React, {useState, useEffect} from 'react'
import Categories from '../../components/Search/Categories'
import Sort from '../../components/Search/Sort'
import Filters from '../../components/Search/Filters'
import ProductCard from '../../components/Search/ProductCard.js'
import axios from 'axios'
import styled from "styled-components";

const SearchResults = () => {
    
    const [products,setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => { 
        let res = await axios.get('http://localhost:5000/allProducts')
        setProducts(res.data)
        }
    getProducts()
    },[])
    
    
    return(
        <SearchPage>
            <SearchBar>
                <input type="text" />
            </SearchBar>
            <div>
                <SearchCriteria>
                    <Categories />
                    <Sort />
                    <Filters />
                </SearchCriteria>
            </div>
            <Products>
                {products.map((product) => <ProductCard product={product} />)}
            </Products>
        </SearchPage>
    )
}

const SearchBar = styled.div`
    input {
        width: 100%;
        margin: 10px 0;
    }
`;

const SearchCriteria = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
`;

const SearchPage = styled.div`
    padding: 20px
`

const Products = styled.div`
    {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
    }
`
export default SearchResults