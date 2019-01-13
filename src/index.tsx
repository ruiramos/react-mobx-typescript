import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { observable } from 'mobx';

import {AppGlobalState, TodosShown} from './types.d';

var appState:AppGlobalState = observable({
  todos: [],
  show: TodosShown.All
});

ReactDOM.render(<App 
  state = {appState} 
  addTodo = {(todo: string) => {
    appState.todos.push({task: todo, isComplete: false})
  }}
  setShown = {(selected: TodosShown) => {
    appState.show = selected;
  }}
  toggleDone = {(i: number) => {
    appState.todos[i].isComplete = !appState.todos[i].isComplete
  }}
  cancelTodo = {(i: number) => {
    appState.todos.splice(i, 1);
  }}
/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();