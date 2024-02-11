import React from 'react'

const Notification = ({message}) => {
  return (
    <div>
        {message === null ? <h1 style={{display: 'none'}}></h1> : <h1 className='msg'>{message}</h1> }
   
    </div>
  )
}

export default Notification