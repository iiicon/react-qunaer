import React, {useState, useCallback, useEffect, useRef, memo} from "react";
import {createAdd, createRemove, createSet, createToggle} from "./actions";
import reducer from "./reducers";
// import logo from "./logo.svg";
import "./App.css";

let store = { // 全局存储 state
  todos: [],
  incrementCount: 0
};

/**
 * 遍历actionCreators对象 生成action 触发dispatch
 * @param actionsCreators  {{add: createAdd}}
 * @param dispatch
 * @returns {{add: addTodo}}
 */
function bindActionCreators(actionsCreators, dispatch) {
  const result = {};

  for (let key in actionsCreators) {
    result[key] = function (...args) {
      dispatch(actionsCreators[key](...args));
    };
  }

  return result;
}

const Control = memo(function Control(props) {
  const {addTodo} = props;
  const inputRef = useRef();
  const onSubmit = e => {
    e.preventDefault();
    const newText = inputRef.current.value.trim();
    if (newText.length === 0) return;
    // dispatch(createAdd({ id: ++isId, text: newText, complete: false }));
    // 改写
    addTodo(newText);
    inputRef.current.value = "";
  };
  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          ref={inputRef}
          className="new-todo"
          placeholder="what needs to be done!"
        />
      </form>
    </div>
  );
});

const TodoItem = memo(function TodoItem(props) {
  const {
    todo: {id, text, complete},
    removeTodo,
    toggleTodo
  } = props;
  const onChange = () => {
    toggleTodo(id);
  };
  const onRemove = () => {
    removeTodo(id);
  };

  return (
    <li className="todo-item">
      <input type="checkbox" onChange={onChange} checked={complete}/>
      <label htmlFor="" className={complete ? "complete" : ""}>
        {text}
      </label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  );
});

const Todos = memo(function Todos(props) {
  const {todos, removeTodo, toggleTodo} = props;

  return (
    <div>
      <ul>
        {todos.map(item => {
          return (
            <TodoItem
              key={item.id}
              todo={item}
              removeTodo={removeTodo}
              toggleTodo={toggleTodo}
            />
          );
        })}
      </ul>
    </div>
  );
});

function App(props) {
  const [todos, setTodos] = useState([]);
  const [incrementCount, setIncrementCount] = useState(0);

  useEffect(() => {
    Object.assign(store, {todos, incrementCount});
  }, [todos, incrementCount]);

  const dispatch = action => {
    const setter = {todos: setTodos, incrementCount: setIncrementCount};

    if (typeof action === "function") {
      action(dispatch, () => store);
      return
    }
    const newState = reducer(store, action);
    for (let key in newState) {
      setter[key](newState[key]);
    }
  };

  useEffect(() => {
    const payload = JSON.parse(localStorage.getItem("__todos__")) || [];
    dispatch(createSet(payload));
  }, []);

  useEffect(() => {
    localStorage.setItem("__todos__", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-list">
      <Control {...bindActionCreators({addTodo: createAdd}, dispatch)} />
      <Todos
        todos={todos}
        {...bindActionCreators(
          {removeTodo: createRemove, toggleTodo: createToggle},
          dispatch
        )}
      />
    </div>
  );
}

export default App;
