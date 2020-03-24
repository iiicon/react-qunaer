import React, { useState, PureComponent, useCallback, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";

// 自定义hook函数 use开头 抽离组件逻辑
function useCount(defaultProps) {
  const [count, setCount] = useState(defaultProps);
  return [count, setCount];
}

// 返回 jsx, 用hooks参数代替props传递参数
function useCounter(count) {
  const  size = useSize()
  return (
    <h2 style={{ width: "100px", height: "100px", border: "1px solid red" }}>
      {JSON.stringify(count)} {JSON.stringify(size)}
    </h2>
  );
}

function useSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  const onResize = useCallback(() => { // 如果不加 useCallback 会多次执行
    console.log('render')
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  }, [])

  useEffect(() => {
    window.addEventListener("resize", onResize, false);

    return () => {
      window.removeEventListener("resize", onResize, false);
    };
  }, []);

  return size
}

// class Counter extends PureComponent {
//   speak() {
//     console.log("speak");
//   }
//   render() {
//     const { props } = this;
//     return (
//       <h2
//         style={{ width: "100px", height: "100px", border: "1px solid red" }}
//       >
//         {JSON.stringify(props)}
//       </h2>
//     );
//   }
// }

function App(props) {
  const [count, setCount] = useCount(0); // 普通hooks
  const Counter = useCounter(count); // 返回jsx
  const size = useSize() // 逻辑复用

  return (
    <div className="App">
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +1
      </button>
      count:{count}
      {Counter} {size.width} {size.height}
      {/*<Counter count={count} />*/}
    </div>
  );
}

export default App;
