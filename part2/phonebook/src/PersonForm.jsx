import React from 'react'

const PersonForm = ({name, nameOnChange, number , numberOnChange, onSubmit}) => {
    return (
        <>
           <form onSubmit={onSubmit}>
        <h1>add a new</h1>
        <div>
          name: <input value={name} onChange={nameOnChange}/>
        </div>
        <div>
          numbers: <input value={number} onChange={numberOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
        </>

    )
}

export default PersonForm