/* eslint-disable react/prop-types */
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

  const createNewAnecdoteAndNotify = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    createNewAnecdote(content)
    notify(content)
    event.target.anecdote.value = ''
  }

  const createNewAnecdote = (content) => {
    props.addAnecdote(content)
  }

  const notify = (content) => {
    const message = 'New anecdote created: '
    props.setNotification(message, content, 3)
  }


  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={createNewAnecdoteAndNotify}>
        <input name="anecdote" />
        <button type="submit">
          create
        </button>
      </form>

    </div>
  )
}

const mapDispatchToProps = {
  addAnecdote,
  setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)