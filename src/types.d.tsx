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

export type AppState = {
  todoValue: string
}