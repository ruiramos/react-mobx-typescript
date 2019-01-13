import React, { Component } from 'react';
import './App.css';
import TodoView from './TodoView'
import {observer} from 'mobx-react';
import {AppProps, AppState, TodosShown} from './types.d';

class App extends Component <AppProps, AppState> {
  constructor(props: AppProps){
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
        <h1>TodoList - mobx version</h1>
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
            className={this.props.state.show === TodosShown.All ? 'active' : ''}
            onClick={() => this.handleTodosShown(TodosShown.All)}>
            Show all
          </button>
          <button
            className={this.props.state.show === TodosShown.Todo ? 'active' : ''}
            onClick={() => this.handleTodosShown(TodosShown.Todo)}>
            Show todo
          </button>
          <button
            className={this.props.state.show === TodosShown.Done ? 'active' : ''}
            onClick={() => this.handleTodosShown(TodosShown.Done)}>
            Show done
          </button>
        </div>
      
      </div>
    );
  }

  renderTodos(){
    const todosFiltered = this.props.state.show === TodosShown.All ?
      this.props.state.todos : 
      this.props.state.todos.filter(todo => 
        todo.isComplete === (this.props.state.show === TodosShown.Done)
      );

    return todosFiltered.map((todo, idx) => 
      <TodoView 
        key={idx} 
        index={this.props.state.todos.indexOf(todo)}
        toggleDone={this.props.toggleDone}
        cancelTodo={this.props.cancelTodo}
        {...todo} 
       />
     )
  }

  handleInputChange(e: React.FormEvent<HTMLInputElement>){
    this.setState({todoValue: e.currentTarget.value});
  }

  handleTodosShown(selected: TodosShown){
    this.props.setShown(selected);
  }

  addTodo(e: React.FormEvent){
    e.preventDefault();
    if(!this.state.todoValue) return;
    this.props.addTodo(this.state.todoValue);
    this.setState({todoValue: ''});
  }
}

export default observer(App);
