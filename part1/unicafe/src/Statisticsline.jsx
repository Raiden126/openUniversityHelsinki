import React from 'react'

const Statisticsline = ({text, number}) => {
  return (
        <>
            <tr>
                <td>{text}</td>
                <td>{number}</td>
            </tr>
        </>
    )
}

export default Statisticsline