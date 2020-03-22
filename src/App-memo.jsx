import React, { Component, lazy, Suspense, PureComponent, memo } from "react";
// import logo from "./logo.svg";
import "./App.css";

// class Foo extends PureComponent {
//   render() {
//     console.log("foo render");
//     return <div style={{ color: "red" }}>{this.props.person.age}</div>; // 在这里就不会渲染
//   }
// }

const Foo = memo(function(props) {
  console.log("foo render");
  return <div style={{ color: "red" }}>{props.person.age}</div>;
});

class App extends Component {
  state = {
    value: 1,
    person: {
      age: 12
    }
  };
  callback = () => {};
  render() {
    const person = this.state.person;
    return (
      <div className="App">
        <button
          onClick={() => {
            person.age += 1;
            this.setState({
              value: this.state.value + 1,
              person
            });
          }}
        >
          +1
        </button>
        <h1>
          {this.state.value} - {this.state.person.age}
        </h1>
        <Foo person={person} cb={this.callback} />
      </div>
    );
  }
}

export default App;
