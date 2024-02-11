import React from 'react'
import Statisticsline from './Statisticsline'

const Feedback = ({ good, neutral, bad }) => {

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
      <table>
        <tbody>
          <Statisticsline text='good' number={good} />
          <Statisticsline text="neutral" number={neutral} />
          <Statisticsline text="bad" number={bad} />
          <Statisticsline text="all" number={good + neutral + bad} />
          <Statisticsline text="average" number={good * 1 + bad * (-1) / 3} />
          <Statisticsline text="positive" number={(good / (good + neutral + bad)) * 100} />
        </tbody>
      </table>
  )
}

export default Feedback