import React from 'react'

const Persons = ({ persons, search, onDelete }) => {
    return (
        <>
            {
                persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
                    .map((item) => {
                        return (
                            <div key={item.id}>
                            <h4>{item.name} &nbsp;{item.number}<button onClick={() => onDelete(item.id, item.name)}>delete</button></h4>
                            
                            </div>
                        )
                    })
            }
        </>

    )
}

export default Persons