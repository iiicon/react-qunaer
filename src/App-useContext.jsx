import React, { useState, useContext, createContext, Component } from "react";
// import logo from "./logo.svg";
import "./App.css";

const CountContext = createContext();

class Foo extends Component {
  render() {
    return (
      <div className="xx">
        <CountContext.Consumer>
          {count => <h2>{count}</h2>}
        </CountContext.Consumer>
      </div>
    );
  }
}

class Bar extends Component {
  static contextType = CountContext;

  render() {
    const count = this.context;
    return <h2>{count}</h2>;
  }
}

function Counter() {
  const count = useContext(CountContext);
  return <h2>{count}</h2>;
}

function App(props) {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +1
      </button>

      <CountContext.Provider value={count}>
        <Foo />
        <Bar />
        <Counter />
      </CountContext.Provider>
    </div>
  );
}

export default App;
