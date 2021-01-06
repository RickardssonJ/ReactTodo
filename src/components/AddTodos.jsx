import React, { useRef, useState } from "react"

export default function AddTodos({ setTodo, todo }) {
  //------------------------
  const inputText = useRef() //Referens till inputfältet
  const [id, setId] = useState(Math.floor(Math.random() * 10000)) //Ger id värdet 1 vid första renderingen
  //------------------------
  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleOnClick()
    }
  }
  //------------------------

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

  //------------------------
  return (
    <div>
      <div>
        <input
          onKeyDown={(e) => handleEnter(e)}
          className="mt-3 input-field"
          ref={inputText}
          type="text"
          placeholder="Add something to do!"
        />
        <button onClick={handleOnClick} className="btnn--primary">
          Add your Todo!
        </button>
      </div>
    </div>
  )
}
