import React, { Component, createContext } from "react";
import logo from "./logo.svg";
import "./App.css";

const BatteryContext = createContext();
const OnlineContext = createContext(false);

class Middle extends Component {
  static contextType = OnlineContext;

  render() {
    const online = this.context;
    return (
      <div>
        <BatteryContext.Consumer>
          {battery => <h1>battery:{battery}</h1>}
        </BatteryContext.Consumer>
        <h1>online:{String(online)}</h1>
      </div>
    );
  }
}

class App extends Component {
  state = {
    battery: 60,
    online: false
  };

  render() {
    return (
      <div className="App">
        <BatteryContext.Provider value={this.state.battery}>
          <OnlineContext.Provider value={this.state.online}>
            <button
              type="button"
              onClick={() => {
                this.setState({
                  battery: this.state.battery - 1,
                  online: !this.state.online
                });
              }}
            >
              operate
            </button>
            <Middle />
          </OnlineContext.Provider>
        </BatteryContext.Provider>
      </div>
    );
  }
}

export default App;
