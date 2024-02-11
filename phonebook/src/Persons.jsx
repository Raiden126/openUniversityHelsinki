import React from 'react'

const Persons = (props) => {
    console.log(props)
    const { persons, search, onClick } = props
    const handleDelete = (id, name) => {
        const confirmed = window.confirm(`delete ${name} ?`);
        if (confirmed) {
          onClick(id);
        }
    }
    return (
        <div>
            {persons && persons.map((item, index) => {
                const itemLowerCase = item.name.toLowerCase();
                const searchLowerCase = search.toLowerCase();
                if (itemLowerCase.includes(searchLowerCase)) {
                    return (
                        <div key={index}>
                            <h4>
                                {item.name} {item.number}
                            </h4>
                                <button onClick={() => handleDelete(item.id, item.name)}>delete</button>
                        </div>
                    )
                }
            })}
        </div>

    )
}

export default Persons