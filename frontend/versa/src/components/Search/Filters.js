import React, { useState } from 'react'
import FiltersModal from './FiltersModal'
import styled from 'styled-components'

const Filters = () => {
    const [filterModal, setFilterModal] = useState(false)

    return(
        <div>
            <button onClick={()=>{setFilterModal(!filterModal)}}>
                Filters
            </button>
            {filterModal ? <FiltersModal /> : <></>}
        </div>
    )
}

export default Filters