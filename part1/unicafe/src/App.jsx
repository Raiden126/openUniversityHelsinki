import { useState } from 'react'
import Header from './Header'
import Button from './Button'
import Feedback from './Feedback'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text= {"give feedback"} />
      <Button onClick = {() => setGood(good + 1)} text = {'good'} />
      <Button onClick = {() => setNeutral(neutral + 1)} text = {'neutral'} />
      <Button onClick = {() => setBad(bad + 1)} text = {'bad'} />
      <Header text={"statistics"} />
      <Feedback good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App