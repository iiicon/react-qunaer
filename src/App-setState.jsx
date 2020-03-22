import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";

function App(props) {
  const [value, setValue] = useState(0); // setState 会在和state相同的时候渲染一次
  const [name, setName] = useState(() => {
    return props.name || "GerritV";
  });
  console.log(value);

  return (
    <div className="App">
      <button
        onClick={() => {
          setValue(value + 1);
        }}
      >
        +1
      </button>
      <button
        onClick={() => {
          setValue(value - 1);
        }}
      >
        -1
      </button>
      <button
        onClick={() => {
          setValue(0);
        }}
      >
        归零
      </button>
      <h2>{value}</h2>
      <h3>{name}</h3>
    </div>
  );
}

export default App;
