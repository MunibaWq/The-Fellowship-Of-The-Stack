import React from "react";
import { useState } from 'react'
import CategoriesModal from './CategoriesModal'
import { ModalButton, IconDiv}  from './styledComponents'
import { CategoriesIcon } from '../../images/icons'
// import colors from '../Reusable/Colors'

const Categories = () => {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <>
            
            <ModalButton onClick={() => { setModalVisible(!modalVisible) }}>Categories<IconDiv><CategoriesIcon /></IconDiv></ModalButton>
            {modalVisible?<CategoriesModal />:<></>} 
        </>
    );
};

      



export default Categories;
