import React, { useState } from "react";
import FiltersModal from "./FiltersModal";
import { ModalButton, IconDiv } from "./styledComponents";
import { FilterIcon } from '../../images/icons'
const Filters = () => {
    const [filterModal, setFilterModal] = useState(false);

    return (
        <>
            <ModalButton
                onClick={() => {
                    setFilterModal(!filterModal);
                }}
            >
                Filters <IconDiv><FilterIcon /></IconDiv>
            </ModalButton>
            {filterModal ? <FiltersModal /> : <></>}
        </>
    );
};

export default Filters;
