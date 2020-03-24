import React, {
  useState,
  useContext,
  createContext,
  Component,
  PureComponent,
  useRef,
  useMemo,
  memo,
  useCallback,
  useEffect
} from "react";
// import logo from "./logo.svg";
import "./App.css";

// function Counter(props) { // 即使counter没有变化，也会每次都渲染（执行函数）
//   console.log('counter render')
//   return <h2>{JSON.stringify(props)}</h2>;
// }

// const Counter = memo(function Counter(props) {
//   // memo 就是优化渲染的作用, 但是有click监听函数的时候，又导致每次都渲染了，需要给监听的函数加useMemo
//   console.log("counter render");
//   return (
//     <h2
//       onClick={() => {
//         props.click();
//       }}
//       style={{ width: "100px", height: "100px", border: "1px solid red" }}
//     >
//       {JSON.stringify(props)}
//     </h2>
//   );
// });

class Counter extends PureComponent {
  speak() {
    console.log("speak");
  }
  render() {
    const { props } = this;
    return (
      <h2
        onClick={props.click}
        style={{ width: "100px", height: "100px", border: "1px solid red" }}
      >
        {JSON.stringify(props)}
      </h2>
    );
  }
}

function App(props) {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(1);
  const counterRef = useRef();
  let it = useRef();

  const double = useMemo(() => {
    return count * 2;
  }, [count === 3]);

  // const onclick = useMemo(() => {
  //   console.log("click");
  // }, []);

  // useMemo(()=>fn) 就是 useCallback(fn)

  const onclick = useCallback(() => {
    setValue(count + 2);
    setValue(value => value + 1);

    counterRef.current.speak();
  }, [counterRef]);

  useEffect(() => {
    it.current = setInterval(() => { // 不用ref的话app每次渲染都会执行赋值，it就是一个新的值
      setCount(count => count + 1);
    }, 100);
  }, []);

  useEffect(() => {
    if (count > 10) {
      clearInterval(it.current);
    }
  });

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
      double:{count}
      <Counter count={count} ref={counterRef} click={onclick} value={value} />
    </div>
  );
}

export default App;
