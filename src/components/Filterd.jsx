import React, { useRef } from "react"

export default function Filterd({ setTodo, todo }) {
  const searchRef = useRef()

  let filterTodos = (e) => {
    let searchInputText = e.target.value.toLowerCase()
    let fromLocalStorage = JSON.parse(localStorage.getItem("todos"))

    if (searchInputText) {
      setTodo(
        todo.filter((todo) => {
          return todo.text.toLowerCase().includes(searchInputText)
        })
      )
    } else if (searchInputText === "") {
      setTodo(fromLocalStorage)
    }
  }

  return (
    <div>
      <input
        className="mt-3 input-field"
        ref={searchRef}
        placeholder="Filter ToDos"
        type="text"
        onChange={filterTodos}
      />
    </div>
  )
}
