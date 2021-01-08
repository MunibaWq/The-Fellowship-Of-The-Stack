import React, {useState} from 'react'
import SortModal from './SortModal'
import { ModalButton, IconDiv } from './styledComponents'
import { SortIcon } from '../../images/icons'


 

const Sort = () => {
    const [sortModal, setSortModal] = useState(false)
    return(
        <>
            <ModalButton onClick={()=>{setSortModal(!sortModal)}}>
                Sort <IconDiv><SortIcon /></IconDiv>
            </ModalButton>
            {sortModal ? <SortModal /> : <></>}
        </>
    )
}

export default Sort