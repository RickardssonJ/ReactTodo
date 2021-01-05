import React, { useRef, useState, useEffect } from "react"

import TodoRender from "../components/TodoRender"

export default function Todo() {
  //------------------------
  const inputText = useRef() //Referens till inputfältet
  //------------------------
  const [todo, setTodo] = useState([]) //En tom array så att man kan lägga till nya todos och mappa över dom
  //------------------------
  const [id, setId] = useState(Math.floor(Math.random() * 10000)) //Ger id värdet 1 vid första renderingen
  //------------------------
  const searchRef = useRef()
  //------------------------

  useEffect(() => {
    let fromLocalStorage = JSON.parse(localStorage.getItem("todos"))
    if (fromLocalStorage) {
      setTodo(fromLocalStorage)
    }
  }, [])

  const handleOnClick = () => {
    if (!inputText.current.value || /^\s*$/.test(inputText.current.value)) {
      return
    }
    setId(Math.floor(Math.random() * 10000))
    const input = {
      text: inputText.current.value,
      id: `${id}`,
      isCompleted: false,
    } //Texten som användaren fyller i och ett unikt id
    setTodo([input, ...todo]) //Skriv ut den nya Todon och resten av arryen
    inputText.current.value = "" //Nollställer inputfältet

    let inputSerialized = JSON.stringify([input, ...todo])
    localStorage.setItem(`todos`, inputSerialized)
  }
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

  //--------------------

  return (
    <div className="container">
      <div>
        <input
          className="mt-3 input-field"
          ref={inputText} //SKapar en referens till inputfältet
          type="text"
          placeholder="Add ToDo"
        />
        <button onClick={handleOnClick} className="btnn--primary">
          Add
        </button>
      </div>

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
