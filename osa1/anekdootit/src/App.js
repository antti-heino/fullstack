import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const maxVotesIndex = votes.indexOf(Math.max(...votes))
  const randomAnecdote= () => Math.floor(anecdotes.length * Math.random())
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(randomAnecdote())
  const handleNewAnecdote = () => setSelected(randomAnecdote())

  const handleVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  };

  return (
    <div>
      <Anecdotes
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
        handleVote={handleVote}
        handleNewAnecdote={handleNewAnecdote}/>
      <br />
      <MostVotedAnecdote
        anecdote={anecdotes[maxVotesIndex]}
        votes={votes[maxVotesIndex]}/>
    </div>
  );
}
const Anecdote = ({ anecdote, votes }) => (
  <>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </>
)

const Anecdotes = ({ anecdote, votes, handleVote, handleNewAnecdote }) => (
  <>
    <h2>Anecdote of the day</h2>
    <Anecdote anecdote={anecdote} votes={votes} />
    <button onClick={handleVote}>vote</button>
    <button onClick={handleNewAnecdote}>new anecdote</button>
  </>
)

const MostVotedAnecdote = ({ anecdote, votes }) => (
  <>
    <h2>Anecdote with most votes:</h2>
    <Anecdote anecdote={anecdote} votes={votes} />
  </>
)

export default App