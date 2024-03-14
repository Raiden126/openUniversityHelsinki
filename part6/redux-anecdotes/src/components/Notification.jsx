/* eslint-disable react/prop-types */
import { connect } from 'react-redux'


const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    props.notification.content &&
    <div style={style}>
      <div>
        <b> {props.notification.message} </b>
        <i> {props.notification.content} </i>
      </div>
    </div >

  )
}


const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, null)(Notification)