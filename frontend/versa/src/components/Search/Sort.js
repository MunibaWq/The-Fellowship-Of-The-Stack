import React from 'react'
let sortOptions = ['price','rating', 'date']
const Sort = () => {
    return(
        <div>
            <select>
                {sortOptions.map((option)=>{
                    return <option value={option}>{option}</option>
                })}
            </select>
        </div>
    )
}

export default Sort