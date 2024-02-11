import React from 'react'

const PersonsForm = ({ value, onChange, onClick, number, phoneOnChange }) => {
    return (
        <>
            <div>
                name: <input value={value} onChange={onChange} />
            </div>
            <div>
                number: <input type='text' value={number} onChange={phoneOnChange} />
            </div>
            <div>
                <button type="submit" onClick={onClick}>add</button>
            </div>
            
        </>

    )
}

export default PersonsForm