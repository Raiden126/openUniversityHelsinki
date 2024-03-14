/* eslint-disable react/prop-types */
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const Anecdotes = (props) => {

  const style = {
    marginBottom: 10
  }

  const voteAndNotify = (anecdote) => {
    vote(anecdote)
    notify(anecdote.content)
  }

  const vote = (anecdote) => {
    props.addVote(anecdote)
  }

  const notify = (content) => {
    const message = 'You voted for: '
    props.setNotification(message, content, 3)
  }

  return (
    <div>

      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id} style={style}>

          <div>
            <i> {anecdote.content} </i>
          </div>

          <div>
            has {anecdote.votes} votes {' '}
            <button onClick={() => voteAndNotify(anecdote)}>
              vote
            </button>
          </div>

        </div>
      )}

    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
      .filter(anecdote =>
        (anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      )
      .sort((a, b) =>
        b.votes - a.votes || a.content.localeCompare(b.content)
      )
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Anecdotes)