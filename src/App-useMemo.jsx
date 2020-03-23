import React, {
  useState,
  useContext,
  createContext,
  Component,
  useMemo,
  memo,
  useCallback
} from "react";
// import logo from "./logo.svg";
import "./App.css";

// function Counter(props) { // 即使counter没有变化，也会每次都渲染（执行函数）
//   console.log('counter render')
//   return <h2>{JSON.stringify(props)}</h2>;
// }

const Counter = memo(function Counter(props) {
  // memo 就是优化渲染的作用, 但是有click监听函数的时候，又导致每次都渲染了，需要给监听的函数加useMemo
  console.log("counter render");
  return (
    <h2
      onClick={() => {props.click()}}
      style={{ width: "100px", height: "100px", border: "1px solid red" }}
    >
      {JSON.stringify(props)}
    </h2>
  );
});

function App(props) {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(1);

  const double = useMemo(() => {
    return count * 2;
  }, [count === 3]);

  // const onclick = useMemo(() => {
  //   console.log("click");
  // }, []);

  // useMemo(()=>fn) 就是 useCallback(fn)

  const onclick = useCallback(() => {
    alert("click");
    setValue(count + 2);
    setValue(value => value + 1);
  }, []);

  return (
    <div className="App">
      <button
        onClick={() => {
          setCount(count + 1);
          setValue(value + 1);
        }}
      >
        +1
      </button>
      double:{double}
      <Counter count={double} click={onclick} value={value} />
    </div>
  );
}

export default App;
