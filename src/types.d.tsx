export type Todo = {
  task: string
  isComplete: boolean,
  toggleDone: () => void
}

export enum TodosShown {
  All = 1,
  Todo,
  Done
}

export type AppGlobalState = {
  todos: Array<Todo>,
  show: TodosShown,
  addTodo: (task: string) => void,
  setShown: (index: number) => void,
  cancelTodo: (index: number) => void
}

export type AppState = {
  todoValue: string
}