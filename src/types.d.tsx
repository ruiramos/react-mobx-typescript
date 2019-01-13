export type Todo = {
  task: string
  isComplete: boolean
}

export enum TodosShown {
  All = 1,
  Todo,
  Done
}

export type AppGlobalState = {
  todos: Array<Todo>,
  show: TodosShown
}

export type AppProps = {
  state: AppGlobalState,
  addTodo: (todo:string) => void,
  setShown: (selected: TodosShown) => void,
  toggleDone: (i: number) => void,
  cancelTodo: (i: number) => void
}

export type AppState = {
  todoValue: string
}