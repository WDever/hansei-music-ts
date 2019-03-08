import { createStore, compose } from "redux";
import { reducer } from './reducers';

const composeEnhancers =
  typeof window === 'object' && ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as any)
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers();

const configureStore = createStore(reducer, enhancer);

export { configureStore };
