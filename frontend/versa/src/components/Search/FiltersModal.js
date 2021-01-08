import React from 'react'
import styled from 'styled-components'


const FilterModal = () => {
    return(
        <Modal>
            <label>Delivery speed</label><br />
            <label>Colour</label><br />
            <label>Item type</label><br />
            <label>Category</label><br />
            <label>Price</label><br />
            <label>Rating</label><br />
        </Modal>
    )
}

const Modal = styled.div`

    right: 0;
    position: absolute;
    width: 80%;
    height: auto;
    z-index: 98;
    background: white;
    padding: 10px 20px;
`;

export default FilterModal