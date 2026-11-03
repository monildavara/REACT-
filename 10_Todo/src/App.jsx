import { useEffect, useState } from 'react'
import './App.css'
// import { TodoProvider } from './Contexts/TodoContext'
import TodoItem from './Componets/TodoItem'
// import TodoForm from './Componets/TodoFrom'
// import { useTodo } from './Contexts/TodoContext'
import { TodoProvider } from './Contexts/TodoContext'   // App.jsx
import { useTodo } from "./Contexts/todoContext";       // TodoForm (small "t")
import TodoForm from './Componets/TodoFrom'              // "TodoFrom" (typo?)


function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (Todo) => {
    setTodos((prev) => [{id: Date.now(), ...Todo}, ...prev] )
  }

  const updateTodo = (id, Todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? Todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((Todo) => Todo.id !== id))
  }

  const ToggelComplet = (id) => {
    setTodos((prev) => 
      prev.map((prevTodo) => 
        prevTodo.id === id ? {...prevTodo, 
          completed: !prevTodo.completed} : prevTodo))
  }


  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem("todos"))

    if(localTodos && localTodos.length > 0){
      setTodos(localTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos" , JSON.stringify(todos))
  }, [todos])



  return (
    <TodoProvider value={{
        todos,addTodo,updateTodo,deleteTodo,ToggelComplet
    }}>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your todos</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key = {todo.id} className='w-full'>
                            <TodoItem todo={todo} />
                            
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
