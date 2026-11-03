import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [{ id: 1, todo: "Todo msg", completed: false }],  // lowercase names
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  ToggelComplet: (id) => {},
});

export const useTodo = () => useContext(TodoContext);
export const TodoProvider = TodoContext.Provider;