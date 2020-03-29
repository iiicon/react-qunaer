function combineReducers(reducers) {
  return function reducer(state, action) {
    const changed = {};
    for (let key in reducers) {
      changed[key] = reducers[key](state[key], action);
    }
    return { ...state, ...changed };
  };
}

const reducers = {
  todos: (todos, action) => {
    const { type, payload } = action;

    switch (type) {
      case "add":
        return [...todos, payload];
      case "remove":
        return todos.filter(item => item.id !== payload);
      case "set":
        return payload;
      case "toggle":
        return todos.map(item =>
          item.id === payload ? { ...item, complete: !item.complete } : item
        );
      default:
        // code
        break;
    }
    return todos;
  },
  incrementCount: (state, action) => {
    const { type } = action;
    switch (type) {
      case "add":
      case "set":
        return state + 1;
    }
    return state;
  }
};

export default combineReducers(reducers);
