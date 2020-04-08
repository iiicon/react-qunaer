import { createStore, combineReducers, applyMiddleware } from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result;
};
export default createStore(
    combineReducers(reducers),
    {
        from: '北京',
        to: '上海',
        isCitySelectorVisible: false,
        currentSelectingLeftCity: false,
        cityData: null,
        isLoadingCityData: false,
        isDateSelectorVisible: false,
        departDate: Date.now(),
        highSpeed: false,
    },
    applyMiddleware(thunk, logger)
);

// function applyMiddleware(store, middlewares) { // 用来替换原来的dispatch
//   middlewares = middlewares.slice()
//   middlewares.reverse()
//
//   let dispatch = store.dispatch
//   middlewares.forEach(middleware =>
//     dispatch = middleware(store)(dispatch)
//   )
//
//   return Object.assign({}, store, { dispatch })
// }
