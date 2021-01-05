import React from "react"
import { MdDone } from "react-icons/md"
import { RiDeleteBin5Line } from "react-icons/ri"

export default function TodoRender({ todo, deleteOnClick, markAsDone }) {
  return (
    <div className={`todo-row ${todo.isCompleted ? "completed" : ""}`}>
      <div className="row mt-3 ">
        <div className={`col-md-12 col-xl-12 col-l-6  clearfix `}>
          <p
            onClick={() => markAsDone(todo.id)}
            className={`mr-5 ml-3 float-left todo-text ${
              todo.isCompleted ? "completed" : ""
            }`}
          >
            {todo.text}
          </p>

          <RiDeleteBin5Line
            onClick={() => deleteOnClick(todo.id)}
            className=" ml-3 float-right icons"
          />

          <MdDone
            onClick={() => markAsDone(todo.id)}
            className=" ml-5 float-right icons"
          />
        </div>
      </div>
    </div>
  )
}
