import React from 'react'
import styled from "styled-components";


const CategoriesModal = () => {
    return (
        <Modal>
            <a href="#">Furniture</a><br />
            <a href="#">Decorations</a><br />
            <a href="#">Artwork</a><br />
            <a href="#">Gardening</a><br />
            <a href="#">Games and hobbies</a><br />
        </Modal>
    )
}
const Modal = styled.div`
    position: absolute;
    left: 0;
    z-index: 99;
    width: 80%;
    background: white;
    height: auto;
    padding: 10px 20px;
`
export default CategoriesModal