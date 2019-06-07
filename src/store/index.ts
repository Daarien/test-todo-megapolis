import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware, ThunkAction } from 'redux-thunk';
import { reducer, State, Action } from './todo';

export interface ThunkDispatch {
  (args?: any): ThunkAction<void, State, undefined, Action>;
}

export interface ThunkDispatcher {
  [key: string]: ThunkDispatch;
}

export type Dispatcher<T extends ThunkDispatcher> = {
  [P in keyof T]: T[P];
};

export default createStore(
  reducer,
  applyMiddleware(thunk as ThunkMiddleware<State>)
);
