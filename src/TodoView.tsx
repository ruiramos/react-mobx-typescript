import React, { Component, SFC } from 'react';
import { Todo } from './types.d';

type Props = {
  task: string,
  isComplete: boolean,
  index: number,
  toggleDone: (index: number) => void,
  cancelTodo: (index: number) => void
}

const TodoView: SFC<Props> = ({index, task, isComplete, toggleDone, cancelTodo}) => {
  let classValue = isComplete ? 'done' : 'active';
  return (
    <div className={classValue + ' todoItem'}>
      <label>
        <input 
            type="checkbox"
            checked={isComplete}
            onChange={() => toggleDone(index)}
          />
        <span>{task}</span>
      </label>
      <button className="btn-cancel" onClick={() => cancelTodo(index)}>Cancel</button>
        
    </div>
  );
}

export default TodoView;