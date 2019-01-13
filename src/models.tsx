import { types } from "mobx-state-tree"
import { TodosShown} from './types.d';

export const Todo = types
.model("Todo", {
  id: types.number,
  task: types.string,
  isComplete: false
})
.actions(self => ({
  toggleDone(){
    self.isComplete = !self.isComplete;
  }
}));

export const Store = types.model("Store", {
  todos: types.array(Todo),
  show: types.number
})
.actions(self => {
  return {
    addTodo(task: string) {
      self.todos.push({
        id: Math.random(),
        task,
        isComplete: false
      })
    },
    setShown(selected: TodosShown){
      self.show = selected;
    },
    cancelTodo(index: number){
      self.todos.splice(index, 1);
    }
  }
});