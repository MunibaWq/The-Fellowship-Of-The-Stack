import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "./styledComponents";

const CategoriesModal = () => {
    return (
        <Modal>
            <Link to="/">Furniture</Link>
            <br />
            <Link to="/">Decorations</Link>
            <br />
            <Link to="/">Artwork</Link>
            <br />
            <Link to="/">Gardening</Link>
            <br />
            <Link to="/">Games and Hobbies</Link>
            <br />
        </Modal>
    );
};

export default CategoriesModal;
