import React, { useState } from 'react'


const StatisticLine = ({text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Button  = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}


const Statistics = ({ good, neutral, bad }) => {
  return (
  <div>
    <h1>Statistics</h1>
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={good + neutral + bad} />
        <StatisticLine text="Average" value={(good + neutral + bad)/3} />
        <StatisticLine text="Positive" value={parseFloat((good / (good + bad + neutral)) * 100).toFixed(2) + "%"} />
      </tbody>
    </table>
  </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodPlus = () => { setGood(good + 1) }
  const neutralPlus = () => { setNeutral(neutral + 1) }
  const badPlus = () => { setBad(bad + 1) }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={goodPlus} text={"Good"} />
      <Button handleClick={neutralPlus} text={"Neutral"} />
      <Button handleClick={badPlus} text={"Bad"} />
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App