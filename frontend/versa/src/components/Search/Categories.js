import React from "react";
import { useState } from 'react'
import CategoriesModal from './CategoriesModal'

const Categories = () => {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <div>
            <button onClick={() => { setModalVisible(!modalVisible) }}>Categories</button>
            {modalVisible?<CategoriesModal />:<></>} 
        </div>
    );
};

export default Categories;
