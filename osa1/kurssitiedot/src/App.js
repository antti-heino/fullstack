const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ]
  }

  const Part = ({ name, exercises }) => (
    <p>
      {name}: {exercises}
    </p>
  );

  const Content = ({ parts }) => {
  const [part1, part2, part3] = parts;
  return (
    <div>
      <Part name={part1.name} exercises={part1.exercises} />
      <Part name={part2.name} exercises={part2.exercises} />
      <Part name={part3.name} exercises={part3.exercises} />
    </div>
  );
};

  const Total = 'Total stuff'

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total Total={total} />
    </div>
  )
}

export default App