import React, { Component, SFC } from 'react';
import './App.css';
import TodoView from './TodoView'
import {observer} from 'mobx-react';
import {AppState, TodosShown} from './types.d';
import { Store } from './models';

type Props = {
  store: typeof Store.Type
}

class App extends Component <Props, AppState> {
  constructor(props: Props){
    super(props);

    this.state = {
      todoValue: ''
    };

    this.addTodo = this.addTodo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render() {
    return (
      <div className="App">
        <h1>TodoList - MST version</h1>
        <p>This is what you have left to do:</p>
        
        <div className="todoList">
          <form onSubmit={this.addTodo}>
            <input 
              type="text" 
              placeholder="new todo" 
              value={this.state.todoValue} 
              onChange={this.handleInputChange} />
            <button type="submit">Create</button>
          </form>

          { this.renderTodos() }
        </div>

        <div className="todoButtons buttonGroup">
          <button 
            className={this.props.store.show === TodosShown.All ? 'active' : ''}
            onClick={() => this.handleTodosShown(TodosShown.All)}>
            Show all
          </button>
          <button
            className={this.props.store.show === TodosShown.Todo ? 'active' : ''}
            onClick={() => this.handleTodosShown(TodosShown.Todo)}>
            Show todo
          </button>
          <button
            className={this.props.store.show === TodosShown.Done ? 'active' : ''}
            onClick={() => this.handleTodosShown(TodosShown.Done)}>
            Show done
          </button>
        </div>
      
      </div>
    );
  }

  renderTodos(){
    const todosFiltered = this.props.store.show === TodosShown.All ?
      this.props.store.todos : 
      this.props.store.todos.filter(todo => 
        todo.isComplete === (this.props.store.show === TodosShown.Done)
      );

    return todosFiltered.map((todo, idx) => 
      <TodoView 
        key={idx} 
        index={this.props.store.todos.indexOf(todo)}
        todo={todo} 
        cancelTodo={this.props.store.cancelTodo}
       />
     )
  }

  handleInputChange(e: React.FormEvent<HTMLInputElement>){
    this.setState({todoValue: e.currentTarget.value});
  }

  handleTodosShown(selected: TodosShown){
    this.props.store.setShown(selected);
  }

  addTodo(e: React.FormEvent){
    e.preventDefault();
    if(!this.state.todoValue) return;
    this.props.store.addTodo(this.state.todoValue);
    this.setState({todoValue: ''});
  }
}

export default observer(App);
