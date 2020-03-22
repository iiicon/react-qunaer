import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";

function App(props) {
  const [count, setCount] = useState(0);
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  };

  useEffect(() => {
    console.log("render title");
    document.title = count + "";
  }, [count]); // 没有第二个参数默认是每次都会执行，有参数会在参数变化的时候执行，空数组代表不会有变化，只执行一次

  useEffect(() => {
    window.addEventListener("resize", onResize, false);

    return () => {
      window.removeEventListener("resize", onResize, false);
    };
  }, []);

  return (
    <div className="App">
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +1
      </button>
      {size.width + "*" + size.height}
    </div>
  );
}

export default App;
