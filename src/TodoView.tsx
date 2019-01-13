import React, { Component, SFC } from 'react';
import {Todo} from './types.d';
import {observer} from 'mobx-react';

type Props = {
  todo: Todo,
  index: number,
  cancelTodo: (index: number) => void
}

const TodoView: SFC<Props> = ({index, todo, cancelTodo}) => {
  let classValue = todo.isComplete ? 'done' : 'active';
  return (
    <div className={classValue + ' todoItem'}>
      <label>
        <input 
            type="checkbox"
            checked={todo.isComplete}
            onChange={() => todo.toggleDone()}
          />
        <span>{todo.task}</span>
      </label>
      <button className="btn-cancel" onClick={() => cancelTodo(index)}>Cancel</button>
        
    </div>
  );
}

export default observer(TodoView);