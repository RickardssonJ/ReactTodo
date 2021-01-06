import React, { useState, useEffect } from "react"
import AddTodos from "../components/AddTodos"
import Filterd from "../components/Filterd"

import TodoRender from "../components/TodoRender"

export default function Todo() {
  const [todo, setTodo] = useState([]) //En tom array så att man kan lägga till nya todos och mappa över dom
  //------------------------

  useEffect(() => {
    let fromLocalStorage = JSON.parse(localStorage.getItem("todos"))
    if (fromLocalStorage) {
      setTodo(fromLocalStorage)
    }
  }, [])

  //----------------
  const deleteOnClick = (id) => {
    let remainingTasks = todo.filter((todo) => id !== todo.id)
    localStorage.clear()

    let remainingTasksToLocalStorage = JSON.stringify(remainingTasks)
    localStorage.setItem(`todos`, remainingTasksToLocalStorage)

    setTodo(remainingTasks)
  }
  //-------------------

  //Funktionen mappar igenom todos och kollar om todon man klickade p stämmer överns med id som skickas med. Om det gör det så sätter den isCompleted till true.
  const markAsDone = (id) => {
    let marktAsDoneTodos = todo.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted //Ändrar isCompleted till motsatsen av vad den var innan (true/false)
      }
      return todo
    })

    setTodo(marktAsDoneTodos)
  }
  //--------------------

  return (
    <div className="container">
      <AddTodos setTodo={setTodo} todo={todo} />
      <div>
        {todo.map((todo, index, array) => {
          return (
            <TodoRender
              todoArray={array}
              todo={todo}
              key={index}
              deleteOnClick={deleteOnClick}
              markAsDone={markAsDone}
            />
          )
        })}
      </div>
      <Filterd setTodo={setTodo} todo={todo} />
    </div>
  )
}
