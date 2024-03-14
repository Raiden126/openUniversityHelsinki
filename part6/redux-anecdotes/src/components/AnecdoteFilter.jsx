/* eslint-disable react/prop-types */
import { changeFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const AnecdoteFilter = (props) => {

  const handleFilterChange = (event) => {
    props.changeFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div>
      <div style={style}>
        <h2> filter {' '}
          <input onChange={handleFilterChange} />
        </h2>
      </div>

    </div>
  )
}

const mapDispatchToProps = {
  changeFilter
}

export default connect(null, mapDispatchToProps)(AnecdoteFilter)